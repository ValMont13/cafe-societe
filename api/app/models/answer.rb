class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :response
  belongs_to :quizz_answer
end