require 'rails_helper'

RSpec.describe User, type: :request do
  describe 'delete_user_mutation' do
    let(:query_string) {
      <<-GraphQL
        mutation ($name: String!) {
          deleteUser(input: { name: $name }) {
            user {
              id
              name
            }
          }       
        }
      GraphQL
    }
    let(:artists) { create_list(:artist, 2) }
    before { create(:user, name: 'user', artists: artists) }
    subject { ServerSchema.execute(query_string, variables: { name: name }) }

    context "when user exists" do
      let(:name) { 'user' }

      it 'should delete an user' do
        expect{ subject }.to change{ User.count }.by(-1) and change{ UserArtist.count }.by(-2)
      end
    end
  end
end
