class Api::FavsController < ApplicationController
    before_action :set_fav, only: [:show, :update, :destroy]
    def index
        render json: Fav.all_formated
    end

    def show
        render json: @fav
    end

    def create
        @fav = Fav.new(fav_params)
        if( @fav.save)
            render json: @fav
        else
            render json: {errors: @fav.errors}, status: :unprocessable_entity
        end 
    end

    def update
        if(@fav.update(fav_params))
            render json: @fav
        else
            render json: {errors: @fav.errors}, status: :unprocessable_entity
        end 
    end

    def destroy
        @fav.destroy
        render json: @fav
    end
    

    private 

    def set_fav
        @fav = Fav.find(params[:id])
    end 

    
    def fav_params
        params.require(:fav).permit(:user_id, :bus_id)
    end
end
