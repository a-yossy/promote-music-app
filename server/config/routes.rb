Rails.application.routes.draw do
  mount GraphqlPlayground::Rails::Engine, at: '/', graphql_path: '/graphql'
  post "/graphql", to: "graphql#execute"
end
