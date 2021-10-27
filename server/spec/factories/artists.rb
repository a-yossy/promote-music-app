FactoryBot.define do
  factory :artist do
    sequence(:name) { |i| "artist#{i}" }
  end
end
