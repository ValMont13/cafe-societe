class CreateQuizzs < ActiveRecord::Migration[5.1]
  def change
    create_table :quizzs do |t|
      t.string 'name'
      t.belongs_to :edition, index: true
      t.timestamps
    end
  end
end
