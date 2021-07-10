class Bus < ApplicationRecord
    has_many :favs, dependent: :destroy
    has_many :users, through: :favs
end
