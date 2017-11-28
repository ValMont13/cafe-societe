class AuthenticationController < ApplicationController

  skip_before_action :authenticate_request

  def authenticate
    command = AuthenticateUser.call(params[:email], params[:password])
    if command.success?
      render json: { auth_token: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end

  def register
    puts register_parameters.inspect
    puts params.inspect
    render nothing: true, status: NotFound unless User.create register_parameters
  end

  private

  def register_parameters
    params.permit(:first_name, :last_name, :email, :password)
  end

end