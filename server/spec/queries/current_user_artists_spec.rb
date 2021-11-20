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
      before do
        create_list(:artist, 3) do |artist, i|
          artist.name = "artist#{i + 1}"
          artist.users = [user]
        end
      end

      it 'should return right artists' do
        expect(result_data).to eq [
                                    {"id" => "1", "name" => "artist1"},
                                    {"id" => "2", "name" => "artist2"},
                                    {"id" => "3", "name" => "artist3"}
                                  ]
      end
    end

    context 'when artist does not exist' do
      it 'should return empty array' do
        expect(result_data).to eq []
      end
    end
  end
end
