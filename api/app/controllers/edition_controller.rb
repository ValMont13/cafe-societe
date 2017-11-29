class EditionController < ApplicationController

  def index
    render json: { editions: Edition.all }
  end

  def create
    edition = Edition.new(edtion_parameters)
    if edition.save
      render json: edition, status: :created
    else
      render nothing: true, status: :bad_request
    end
  end

  private

  def edtion_parameters
    params.permit(:name)
  end
end
