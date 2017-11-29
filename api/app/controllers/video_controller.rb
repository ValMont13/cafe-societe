class VideoController < ApplicationController

  def index
    render json: { videos: Edition.find(params[:edition_id]).videos }, except: :path
  end

  def get
    render json: { video: Video.find(params[:id]) }, except: :path
  end

  def file
    video = Video.find(params[:id])
    send_file(video.path, content_type: 'audio/mp4')
  end

end
