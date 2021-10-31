require 'rails_helper'

RSpec.describe User, type: :request do
  describe "user_by_name_query" do
    let(:query_string) {
      <<-GRAPHQL
        query($name: String!) {
          userByName(name: $name) {
            id
            name
          }
        }
      GRAPHQL
    }
    let!(:user) { create(:user, name: 'user1') }
    let(:result) { ServerSchema.execute(query_string, variables: { name: name }) }
    let(:result_data) { result['data'] }

    context 'when user exists' do
      let(:name) { 'user1' }

      it 'should return right user' do
        expect(result_data['userByName']['name']).to eq 'user1'
      end
    end

    context 'when user does not exist' do
      let(:name) { 'sarueru' }

      it 'should return nil' do
        expect(result_data).to eq nil
      end
    end
  end
end
