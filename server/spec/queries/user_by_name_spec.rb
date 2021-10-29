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
    let(:user) { create(:user) }
    let(:result) { ServerSchema.execute(query_string, variables: { name: user.name }) }
    let(:user_result) { result['data']['userByName'] }

    it 'should return right user' do
      expect(user_result['name']).to eq user.name
    end
  end
end
