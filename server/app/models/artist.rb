class Artist < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_many :user_artists
  has_many :users, through: :user_artists
end
