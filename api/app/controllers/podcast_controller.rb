class PodcastController < ApplicationController

  def file
    podcast = Podcast.find(params[:id])
    send_file(podcast.path, content_type: 'audio/mpeg')
  end
end
