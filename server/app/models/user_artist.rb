class UserArtist < ApplicationRecord
  belongs_to :user
  belongs_to :artist
  validates :artist_id, uniqueness:  { scope: :user_id }
end
