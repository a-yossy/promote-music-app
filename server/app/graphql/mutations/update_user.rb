module Mutations
  class UpdateUser < BaseMutation
    field :user, Types::UserType, null: false
    argument :current_name, String, required: true
    argument :update_name, String, required: true

    def resolve(current_name:, update_name:)
      user = User.find_by(name: current_name)
      if user.update(name: update_name)
        { user: user }
      else
        raise GraphQL::ExecutionError, user.errors.full_messages.join(", ")
      end
    end
  end
end
