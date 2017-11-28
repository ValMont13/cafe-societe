class CreateEditions < ActiveRecord::Migration[5.1]
  def change
    create_table :editions do |t|
      t.string 'name'
      t.timestamps
    end
  end
end
