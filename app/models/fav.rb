class Fav < ApplicationRecord
  belongs_to :user
  belongs_to :bus

  def self.all_formated
    return self.all.map do |fav|
       {
        id: fav.id, 
        bus_name: fav.bus.name,
        route: fav.bus.route,
        user_name: fav.user.name,
        bus_id: fav.bus.id,
        user_id: fav.user.id,
       }
    end
end
end
