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
    let!(:user) { create(:user, name: 'user') }
    let!(:artist_1) { create(:artist) }
    let!(:artist_2) { create(:artist) }
    let!(:user_artist_1) { create(:user_artist, user: user, artist: artist_1) }
    let!(:user_artist_2) { create(:user_artist, user: user, artist: artist_2) }
    subject { ServerSchema.execute(query_string, variables: { name: name }) }

    context "when user exists" do
      let(:name) { 'user' }

      it 'should user is deleted' do
        expect{ subject }.to change{ User.count }.by(-1) and change{ UserArtist.count }.by(-2)
      end
    end
  end
end
