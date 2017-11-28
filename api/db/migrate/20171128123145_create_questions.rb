class CreateQuestions < ActiveRecord::Migration[5.1]
  def change
    create_table :questions do |t|
      t.string 'content'
      t.belongs_to :quizz, index: true
      t.timestamps
    end
  end
end
