class QuestionController < ApplicationController

  def create
    quizz = Quizz.find_by(edition: params[:edition_id], id: [params[:quizz_id]])
    question = Question.new(question_params)
    question.quizz = quizz
    if question.save
      render json: question, status: :created
    else
      render nothing: true, status: :bad_request
    end
  end

  private

  def question_params
    params.permit(:content)
  end

end
