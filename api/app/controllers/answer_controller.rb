class AnswerController < ApplicationController

  def answer
    quizz = Quizz.find params[:id]
    answers = []

    params[:answers].each do |client_answer|
      begin
        question = Question.find client_answer[:question]
        response = Response.find client_answer[:answer]
        unless quizz.questions.include? question and question.responses.include? response
          render nothing: true, status: :bad_request
          return
        end
        answer = Answer.new
        answer.response = response
        answer.question = question
        answers.push answer
      rescue
        render nothing: true, status: :bad_request
        return
      end
    end

    quizz_answer = QuizzAnswer.new
    quizz_answer.quizz = quizz
    quizz_answer.score = quizz_answer.compute_score
    quizz_answer.user = @current_user

    quizz_answer.save

    puts quizz_answer.inspect
    answers.each do |answer|
      answer.quizz_answer = quizz_answer
      answer.save
    end
  end
end
