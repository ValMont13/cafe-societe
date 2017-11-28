class ResponseController < ApplicationController

  def create
    quizz = Quizz.find_by(edition: params[:edition_id], id: [params[:quizz_id]])
    question = Question.find_by(id: params[:question_id], quizz_id: params[:quizz_id])
    response = Response.new(response_parameters)
    response.question = question
    if response.save
      render json: response, status: 201
    else
      render nothing: true, status: 400
    end
  end

  private

  def response_parameters
    params.permit(:value, :solution)
  end

end
