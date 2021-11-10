require 'rails_helper'

RSpec.describe User, type: :request do
  describe 'update_user_mutation' do
    let(:query_string) {
      <<-GraphQL
        mutation ($currentName: String!, $updateName: String!) {
          updateUser(input: { currentName: $currentName, updateName: $updateName }) {
            user {
              id
              name      
            }          
          }       
        }
      GraphQL
    }
    let!(:user) { create(:user, name: 'user') }
    subject { ServerSchema.execute(query_string, variables: { currentName: 'user', updateName: name }) }

    context 'when update user name is valid' do
      let(:name) { 'update user' }

      it 'should user name changes' do
        expect{ subject }.to change{ user.reload.name }.from('user').to('update user')
      end
    end

    context 'when update user name already exists' do
      let!(:other_user) { create(:user, name: 'update user') }
      let(:name) { 'update user' }

      it 'should user name does not change' do
        expect{ subject }.not_to change{ user.reload.name }
      end
    end

    context 'when update user name is nil' do
      let(:name) { '' }

      it 'should user name does not change' do
        expect{ subject }.not_to change{ user.reload.name }
      end
    end
  end
end
