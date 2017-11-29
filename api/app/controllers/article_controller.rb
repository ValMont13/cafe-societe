class ArticleController < ApplicationController
  def index
    render json: { articles: Edition.find(params[:edition_id]).articles }, except: :content
  end

  def get
    render json: { articles: Article.find(params[:id]) }
  end
end
