class User < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_many :user_artists
  has_many :artists, through: :user_artists
end
