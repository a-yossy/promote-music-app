require 'rails_helper'

RSpec.describe Artist, type: :request do
  describe 'current_user_artists_query' do
    let(:query_string) {
      <<-GraphQL
        query ($userName: String!, $offset: Int!, $limit: Int!) {
          currentUserArtists(userName: $userName, offset: $offset, limit: $limit) {
            id
            name
          }
        }
      GraphQL
    }
    let!(:user) { create(:user, name: 'user') }
    let(:result) { ServerSchema.execute(query_string, variables: { userName: 'user' ,offset: 0, limit: 3 }) }
    let(:result_data) { result['data']['currentUserArtists'] }

    context 'when artists exist' do
      5.times do |n|
        let!("artist_#{n + 1}".to_s) { create(:artist, name: "artist#{n + 1}") }
      end
      let!(:user_artist_1) { create(:user_artist, user: user, artist: artist_1) }
      let!(:user_artist_2) { create(:user_artist, user: user, artist: artist_2) }
      let!(:user_artist_3) { create(:user_artist, user: user, artist: artist_3) }

      it 'should return right artists' do
        expect(result_data).to eq 3.times.map { |n| {"id" => "#{n + 1}", "name" => "artist#{n + 1}"}}
      end
    end

    context 'when artist does not exist' do
      it 'should return empty array' do
        expect(result_data).to eq []
      end
    end
  end
end
