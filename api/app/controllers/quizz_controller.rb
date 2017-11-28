class QuizzController < ApplicationController

  def index
    render json: Quizz.all
  end

  def get
    render json: Quizz.find(params[:id]).to_json(include: {
        questions: {
            include: {
                responses: {
                    except: [:created_at, :updated_at, :question_id]
                }
            },
            except: [:created_at, :updated_at, :quizz_id]
        }
    })
  end

  def create
    edition = Edition.find(params[:edition_id])
    quizz = Quizz.create(name: params[:name], edition: edition)
    if quizz.persisted?
      render json: quizz, status: 201
    else
      render nothing: true, status: 400
    end
  end
end
