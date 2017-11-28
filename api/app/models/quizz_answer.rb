class QuizzAnswer < ApplicationRecord
  belongs_to :user
  belongs_to :quizz
  has_many :answers

  def compute_score
    score = 0
    answers.each do |answer|
      score += 1 if answer.solution
    end
    score
  end

end
