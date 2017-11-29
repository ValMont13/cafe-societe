class PodcastController < ApplicationController

  def index
    render json: { podcasts: Edition.find(params[:edition_id]).podcasts }, except: :path
  end

  def get
    render json: { podcast: Podcast.find(params[:id]) }, except: :path
  end

  def file
    podcast = Podcast.find(params[:id])
    send_file(podcast.path, content_type: 'audio/mpeg')
  end
end
