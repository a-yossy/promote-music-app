module Mutations
  class DeleteUser < BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false

    # TODO: define arguments
    # argument :name, String, required: true

    # TODO: define resolve method
    # def resolve(name:)
    #   { post: ... }
    # end
    field :user, Types::UserType, null: false
    argument :name, String, required: true

    def resolve(name:)
      user = User.find_by(name: name)
      if !user || !user.destroy
        raise GraphQL::ExecutionError, "Failed to delete user"
      end
    end
  end
end
