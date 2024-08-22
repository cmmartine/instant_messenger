class RequestsController < ApplicationController
  def create
    Request.create!(sending_user_id: current_user.id, receiving_user_id: request_params[:user_id])
  end

  def accept
  end

  def reject
  end

  private

  def request_params
    params.require(:request).permit(:user_id)
  end
end
