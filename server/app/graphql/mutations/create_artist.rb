module Mutations
  class CreateArtist < BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false

    # TODO: define arguments
    # argument :name, String, required: true

    # TODO: define resolve method
    # def resolve(name:)
    #   { post: ... }
    # end
    field :artist, Types::ArtistType, null: false
    argument :name, String, required: true
    def resolve(name:)
      artist = Artist.new(name: name)
      if artist.save
        { artist: artist }
      else
        raise GraphQL::ExecutionError, artist.errors.full_messages.join(", ")
      end
    end
  end
end
