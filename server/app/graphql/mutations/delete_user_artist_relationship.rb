module Mutations
  class DeleteUserArtistRelationship < BaseMutation
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
      if unfollow = UserArtist.find_by(user: user, artist: artist)
        unfollow.destroy
      else
        raise GraphQL::ExecutionError, "Not following"
      end
    end
  end
end
