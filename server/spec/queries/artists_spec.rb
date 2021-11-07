require 'rails_helper'

RSpec.describe Artist, type: :request do
  describe 'artists_query' do
    let(:query_string) {
      <<-GraphQL
        query ($offset: Int!, $limit: Int!) {
          artists(offset: $offset, limit: $limit) {
            id
            name
          }
        }
      GraphQL
    }
    let(:result) { ServerSchema.execute(query_string, variables: { offset: 0, limit: 5 }) }
    let(:result_data) { result['data']['artists'] }

    context 'when artists exist' do
      5.times do |n|
        let!("artist_#{n + 1}".to_s) { create(:artist, name: "artist#{n + 1}") }
      end
      it 'should return right artist' do
        expect(result_data).to eq 5.times.map { |n| {"id" => "#{n + 1}", "name" => "artist#{n + 1}"}}
      end
    end

    context 'when artist does not exist' do
      it 'should return empty array' do
        expect(result_data).to eq []
      end
    end
  end
end
