class Edition < ApplicationRecord
  has_many :quizz, dependent: :destroy
end
