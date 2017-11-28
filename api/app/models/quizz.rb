class Quizz < ApplicationRecord
  belongs_to :edition
  has_many :questions
end
