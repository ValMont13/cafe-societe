class TestController < ApplicationController
  def test
    render json: { test: 'ok' }
  end
end
