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
    field :user, Types::UserType, null: false

    argument :user_name, ID, required: true
    argument :artist_name, String, required: true

    def resolve(user_name:, artist_name:)
      user = User.find_by(name: user_name)
      artist = Artist.find_by(name: artist_name)
      if !user.artists.include?(artist)
        user.artists << artist
        { user: user }
      else
        raise GraphQL::ExecutionError, "Already following"
      end

    end
  end
end
