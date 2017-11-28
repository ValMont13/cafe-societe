class Quizz < ApplicationRecord
  belongs_to :edition
  has_many :response
end
