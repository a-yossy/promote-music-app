module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end
    def user(id:)
      if user = User.find_by(id: id)
        user
      else
        raise GraphQL::ExecutionError, user.errors.full_messages.join(", ")
      end
    end

    field :users, [Types::UserType], null: false
    def users
      User.all
    end

    field :user_by_name, Types::UserType, null: false do
      argument :name, String, required: true
    end
    def user_by_name(name:)
      if user = User.find_by(name: name)
        user
      else
        raise GraphQL::ExecutionError, "User not found."
      end
    end

    field :artists, [Types::ArtistType], null: false
    def artists
      Artist.all
    end

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end
  end
end
