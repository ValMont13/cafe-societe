class QuizzAnswer < ApplicationRecord
  belongs_to :user
  belongs_to :quizz
  has_many :quizz_answers
end
