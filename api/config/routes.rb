Rails.application.routes.draw do
  scope 'api' do
    scope 'v1' do
      post 'authenticate', to: 'authentication#authenticate'
      post 'register', to: 'authentication#register'

      get 'quizz/:id', to: 'quizz#get'
      get 'quizz', to: 'quizz#index'
      post 'edition/:edition_id/quizz', to: 'quizz#create'

      post 'quizz/:id/answer', to: 'answer#answer'

      post 'edition', to: 'edition#create'

      post 'edition/:edition_id/quizz/:quizz_id/question/:question_id/response', to: 'response#create'

      post 'edition/:edition_id/quizz/:quizz_id/question', to: 'question#create'

      get 'podcast/:id', to: 'podcast#get'
      get 'podcast/:id/file', to: 'podcast#file'

      get 'video/:id', to: 'video#get'
      get 'video/:id/file', to: 'video#file'

      get 'article/:id', to: 'article#get'

      get 'editions', to: 'edition#index'
      get 'edition/:edition_id/podcasts', to: 'podcast#index'
      get 'edition/:edition_id/quizzs', to: 'quizz#index'
      get 'edition/:edition_id/videos', to: 'video#index'
      get 'edition/:edition_id/articles', to: 'article#index'

    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
