require 'rails_helper'

RSpec.describe User, type: :request do
  describe "user_by_name_query" do
    query_string = <<-GRAPHQL
      query($name: String!) {
        userByName(name: $name) {
          id
          name
        }
      }
    GRAPHQL

    let(:user) { create(:user) }

    it 'should return right user' do
      result = ServerSchema.execute(query_string, variables: { name: user.name })
      user_result = result['data']['userByName']
      expect(user_result['name']).to eq user.name
    end
  end
end
