class Api::BusesController < ApplicationController
    before_action :set_bus, only: [:show, :update, :destroy]
    def index
        render json: Bus.all
    end

    def show
        @bus = Bus.find(params[:id])
        render json: @bus
    end

    def create
        @bus = Bus.new(bus_params)
        if(@bus.save)
            render json: @bus
        else
            render json: {errors: @bus.errors}, status: :unprocessable_entity
        end 
    end

    def update
        if(@bus.update(bus_params))
            render json: @bus
        else
            render json: {errors: @bus.errors}, status: :unprocessable_entity
        end 
    end

    def destroy
        @bus.destroy
        render json: @bus
    end

    private

    def set_bus
        @bus = Bus.find(params[:id])
    end 
            
    def bus_params
        params.require(:bus).permit(:id, :name, :route)
    end

end
