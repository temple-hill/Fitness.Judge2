Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  scope module: :frontend do
    root 'contests#index'
  end

  namespace :backend do
    root to: 'contests#index'
  end
end
