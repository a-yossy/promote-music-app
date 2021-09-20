module Mutations
  class CreateUser < BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false

    # TODO: define arguments
    # argument :name, String, required: true

    # TODO: define resolve method
    # def resolve(name:)
    #   { post: ... }
    # end
    field :user, Types::UserType, null: true
    argument :name, String, required: true
    def resolve(name:)
      user = User.new(name: name)
      if user.save
        { user: user }
      else
        raise GraphQL::ExecutionError, "Failed!"
      end
    end
  end
end
