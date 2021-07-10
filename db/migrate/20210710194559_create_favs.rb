class CreateFavs < ActiveRecord::Migration[6.1]
  def change
    create_table :favs do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :bus, null: false, foreign_key: true

      t.timestamps
    end
  end
end
