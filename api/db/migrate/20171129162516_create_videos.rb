class CreateVideos < ActiveRecord::Migration[5.1]
  def change
    create_table :videos do |t|
      t.string 'name'
      t.string 'path'
      t.integer 'duration'
      t.belongs_to :edition, index: true
      t.timestamps
    end
  end
end
