class CreateAnswers < ActiveRecord::Migration[5.1]
  def change
    create_table :answers do |t|
      t.belongs_to :quizz_answers, index: true
      t.belongs_to :response, index: true
      t.timestamps
    end
  end
end
