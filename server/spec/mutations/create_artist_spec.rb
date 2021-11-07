require 'rails_helper'

RSpec.describe Artist, type: :request do
  describe 'create_artist_mutation' do
    let(:query_string) {
      <<-GraphQL
        mutation ($name: String!) {
          createArtist(input: { name: $name }) {
            artist {
              id
              name
            }
          }
        }
      GraphQL
    }
    let(:result) { ServerSchema.execute(query_string, variables: { name: name }) }
    let(:result_data) { result['data']['createArtist'] }

    context 'when artist name is valid' do
      let(:name) { 'artist' }

      it 'should return right artist' do
        expect(result_data['artist']['name']).to eq 'artist' and change{ Artist.count }.by(1)
      end
    end

    context 'when same artist name already exists' do
      let!(:other_artist) { create(:artist, name: 'artist') }
      let(:name) { 'artist' }

      it 'should return nil' do
        expect(result_data).to eq nil and change{ Artist.count }.by(0)
      end
    end

    context 'when artist name is nil' do
      let(:name) { '' }

      it 'should return nil' do
        expect(result_data).to eq nil and change{ Artist.count }.by(0)
      end
    end
  end
end
