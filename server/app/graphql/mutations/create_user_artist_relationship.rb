module Mutations
  class CreateUserArtistRelationship < BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false

    # TODO: define arguments
    # argument :name, String, required: true

    # TODO: define resolve method
    # def resolve(name:)
    #   { post: ... }
    # end
    field :user, Types::UserType, null: true

    argument :user_name, ID, required: true
    argument :artist_name, String, required: true

    def resolve(user_name:, artist_name:)
      user = User.find_by(name: user_name)
      artist = Artist.find_by(name: artist_name)
      follow = UserArtist.new(user: user, artist: artist)
      if !follow.save
        raise GraphQL::ExecutionError, follow.errors.full_messages.join(", ")
      end

    end
  end
end
