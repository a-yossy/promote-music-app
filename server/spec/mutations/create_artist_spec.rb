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

      it 'should create an artist' do
        expect(result_data['artist']['name']).to eq 'artist' and change(Artist, :count).by(1)
      end
    end

    context 'when same artist name already exists' do
      before do
        create(:artist, name: 'artist')
      end
      let(:name) { 'artist' }

      it 'should not create an artist' do
        expect(result_data).to eq nil and change{ Artist.count }.by(0)
      end
    end

    context 'when artist name is nil' do
      let(:name) { '' }

      it 'should not create an artist' do
        expect(result_data).to eq nil and change{ Artist.count }.by(0)
      end
    end
  end
end
