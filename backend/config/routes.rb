Rails.application.routes.draw do
  resources :players, only: [:index, :create, :show]
  resources :games, only: [:index, :create, :show, :update]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
