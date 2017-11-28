class Answer < ApplicationRecord
  belongs_to :response
  belongs_to :quizz_answer
end
