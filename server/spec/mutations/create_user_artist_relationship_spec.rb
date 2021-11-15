require 'rails_helper'

RSpec.describe UserArtist, type: :request do
  describe 'create_user_artist_relationship_mutation' do
    let(:query_string) {
      <<-GraphQl
        mutation ($userName: String!, $artistName: String!) {
          createUserArtistRelationship(input: { userName: $userName, artistName: $artistName }) {
            user {
              id
              name
            }
          }
        }
      GraphQl
    }
    let!(:user) { create(:user, name: 'user') }
    let!(:artist) { create(:artist, name: 'artist') }
    subject { ServerSchema.execute(query_string, variables: { userName: 'user', artistName: 'artist' }) }

    context 'when user does not follow artist' do
      it 'should count of UserArtist increases 1' do
        expect { subject }.to change{ UserArtist.count }.by(1)
      end
    end

    context 'when user already follows artist' do
      let!(:user_artist) { create(:user_artist, user: user, artist: artist) }

      it 'should count of UserArtist does not change' do
        expect { subject }.not_to change{ UserArtist.count }
      end
    end
  end
end
