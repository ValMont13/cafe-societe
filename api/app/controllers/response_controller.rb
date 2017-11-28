class ResponseController < ApplicationController

  def create
    quizz = Quizz.find_by(edition: params[:edition_id], id: [params[:quizz_id]])
    question = Question.find_by(id: params[:question_id], quizz_id: params[:quizz_id])
    response = Response.new(value: params[:value], solution: params[:solution])
    response.question = question
    if response.save
      render json: response, status: :created
    else
      render nothing: true, status: :bad_request
    end
  end

  private

  def response_parameters
    params.permit(:value, :solution)
  end

end
