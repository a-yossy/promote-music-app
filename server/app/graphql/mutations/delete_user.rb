module Mutations
  class DeleteUser < BaseMutation
    field :user, Types::UserType, null: false
    argument :name, String, required: true

    def resolve(name:)
      user = User.find_by(name: name)
      if !user || !user.destroy
        raise GraphQL::ExecutionError, "Failed to delete user"
      else
        { user: user }
      end
    end
  end
end
