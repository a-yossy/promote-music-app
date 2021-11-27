module Mutations
  class DeleteUser < BaseMutation
    argument :name, String, required: true

    def resolve(name:)
      user = User.find_by(name: name)
      if !user.destroy
        raise GraphQL::ExecutionError, "Failed to delete user"
      end
    end
  end
end
