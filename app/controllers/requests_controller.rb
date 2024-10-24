class RequestsController < ApplicationController
  STATUSES = {
    pending: 'pending',
    accepted: 'accepted'
  }.freeze

  def create
    Request.create!(sending_user_id: current_user.id, receiving_user_id: request_params[:user_id])
  end

  def accept
    request = Request.find(request_params[:request_id])
    other_user = request.sending_user
    request.update!(status: STATUSES[:accepted])
    Buddy.create!(user_id: current_user.id, buddy_id: other_user.id)
    Buddy.create!(user_id: other_user.id, buddy_id: current_user.id)
    head :ok
  end

  def reject
    request = Request.find(request_params[:request_id])
    request.delete
    head :ok
  end

  def pending_request
    is_there_a_pending_request = current_user.open_request_with_user?(request_params[:user_id])
    render json: is_there_a_pending_request
  end

  def pending_received_requests
    pending_received_requests = current_user.pending_received_requests
    pending_requests_noncurrent_users_and_ids = Request.ids_and_noncurrent_usernames(pending_received_requests, current_user.id)
    render json: pending_requests_noncurrent_users_and_ids
  end

  private

  def request_params
    params.require(:request).permit(:user_id, :request_id)
  end
end
