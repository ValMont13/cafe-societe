class CreateQuizzAnswers < ActiveRecord::Migration[5.1]
  def change
    create_table :quizz_answers do |t|
      t.belongs_to :quizz, index: true
      t.belongs_to :user, index: true
      t.integer :score
      t.timestamps
    end
  end
end
