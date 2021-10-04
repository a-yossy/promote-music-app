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

    argument :user_name, String, required: true
    argument :artist_name, String, required: true

    def resolve(user_name:, artist_name:)
      user = User.find_by(name: user_name)
      artist = Artist.find_by(name: artist_name)
      user_artist_relationship = UserArtist.find_by(user: user, artist: artist)
      if !user_artist_relationship.destroy
        raise GraphQL::ExecutionError, "Not following"
      end
    end
  end
end
