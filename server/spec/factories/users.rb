FactoryBot.define do
  factory :user do
    sequence(:name) { |i| "user#{i}" }
  end
end
