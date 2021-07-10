class Api::UsersController < ApplicationController
    before_action :set_user, only: [:show, :update, :destroy]
   def index
    render json: User.all
   end

   def show
    @user = User.find(params[:id])
    render json: @user
   end

   def create
   @user = User.new(user_params)
   if(@user.save)
         render json: @user
   else
         render json: {errors: @user.errors}, status: :unprocessable_entity
   end 
   end

   def update
   if(@user.update(user_params))
         render json: @user
   else
         render json: {errors: @user.errors}, status: :unprocessable_entity
   end 
   end

   def destroy
   @user.destroy
   render json: @user
   end

   private

   def set_user
   @user = User.find(params[:id])
   end 
            
   def user_params
   params.require(:user).permit(:id, :name)
   end
end
