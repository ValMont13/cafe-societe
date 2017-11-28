Rails.application.routes.draw do
  scope 'api' do
    scope 'v1' do
      post 'authenticate', to: 'authentication#authenticate'

      get 'quizz/:id', to: 'quizz#get'
      get 'quizz', to: 'quizz#index'
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
