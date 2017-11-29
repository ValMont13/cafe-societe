class AddDescriptionToQuestion < ActiveRecord::Migration[5.1]
  def change
    change_table :questions do |t|
      t.text 'description'
    end
  end
end
