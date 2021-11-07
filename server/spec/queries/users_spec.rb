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
      5.times do |n|
        let!("user_#{n + 1}".to_s) { create(:user, name: "user#{n + 1}") }
      end

      it 'should return right users' do
        expect(result_data).to eq 5.times.map { |n| {"id" => "#{n + 1}", "name" => "user#{n + 1}"}}
      end
    end

    context 'when user does not exist' do
      it 'should return empty array' do
        expect(result_data).to eq []
      end
    end
  end
end
