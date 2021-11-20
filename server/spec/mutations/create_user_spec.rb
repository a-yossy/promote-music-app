require 'rails_helper'

RSpec.describe User, type: :request do
  describe 'create_user_mutation' do
    let(:query_string) {
      <<-GraphQL
        mutation ($name: String!) {
          createUser(input: { name: $name }) {
            user {
              id
              name
            }
          }
        }
      GraphQL
    }
    let(:result) { ServerSchema.execute(query_string, variables: { name: name }) }
    let(:result_data) { result['data']['createUser'] }

    context 'when user name is valid' do
      let(:name) { 'user' }

      it 'should create an user' do
        expect(result_data['user']['name']).to eq 'user' and change{ User.count }.by(1)
      end
    end

    context 'when same user name already exists' do
      before { create(:user, name: 'user') }
      let(:name) { 'user' }

      it 'should not create an user' do
        expect(result_data).to eq nil and change{ User.count }.by(0)
      end
    end

    context 'when user name is nil' do
      let(:name) { '' }

      it 'should not create an user' do
        expect(result_data).to eq nil and change{ User.count }.by(0)
      end
    end
  end
end
