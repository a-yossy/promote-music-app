module Types
  class MutationType < Types::BaseObject
    field :update_user, mutation: Mutations::UpdateUser
    field :delete_user_artist_relationship, mutation: Mutations::DeleteUserArtistRelationship
    field :create_user_artist_relationship, mutation: Mutations::CreateUserArtistRelationship
    field :create_artist, mutation: Mutations::CreateArtist
    field :create_user, mutation: Mutations::CreateUser
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
