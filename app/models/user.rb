class User < ApplicationRecord
    has_many :favs, dependent: :destroy
    has_many :bus, through: :favs
end
