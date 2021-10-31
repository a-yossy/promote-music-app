FactoryBot.define do
  factory :user_artist do
    association :artist
    association :user
  end
end
