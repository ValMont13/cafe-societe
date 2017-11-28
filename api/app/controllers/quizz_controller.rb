class QuizzController < ApplicationController

  def index
    render json: Quizz.all
  end

  def get()
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
end
