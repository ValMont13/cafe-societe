class Edition < ApplicationRecord
  has_many :quizz, dependent: :destroy
  has_many :podcasts, dependent: :destroy
  has_many :videos, dependent: :destroy
end
