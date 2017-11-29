class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string 'name'
      t.integer 'duration'
      t.text 'content'
      t.belongs_to :edition, index: true
      t.timestamps
    end
  end
end
