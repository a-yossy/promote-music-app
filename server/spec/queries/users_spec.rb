require 'rails_helper'

RSpec.describe User, type: :request do
  describe 'users_query' do
    let(:query_string) {
      <<-GraphQL
        query ($offset: Int!, $limit: Int!) {
          users(offset: $offset, limit: $limit) {
            id
            name
          }
        }
      GraphQL
    }
    let(:result) { ServerSchema.execute(query_string, variables: { offset: 0, limit: 5 }) }
    let(:result_data) { result['data']['users'] }

    context 'when users exist' do
      before do
        create_list(:user, 5) do |user, i|
          user.name = "user#{i + 1}"
        end
      end

      it 'should return right users' do
        expect(result_data).to eq [
                                    {"id" => "1", "name" => "user1"},
                                    {"id" => "2", "name" => "user2"},
                                    {"id" => "3", "name" => "user3"},
                                    {"id" => "4", "name" => "user4"},
                                    {"id" => "5", "name" => "user5"}
                                  ]
      end
    end

    context 'when user does not exist' do
      it 'should return empty array' do
        expect(result_data).to eq []
      end
    end
  end
end
