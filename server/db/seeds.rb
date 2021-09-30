# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

150.times do |i|
  User.create(name: "user#{i + 1}")
end

150.times do |i|
  Artist.create(name: "artist#{i + 1}")
end

140.times do |i|
  130.times do |j|
    UserArtist.create(user_id: j + 1, artist_id: i + 1)
  end
end
