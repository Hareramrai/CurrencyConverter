class PublicsController < ApplicationController

  def index

  end

  def create
    currency = CurrencyConverter.new(params[:fromCurrency],params[:toCurrency])
    render :json => currency.result
  end

end

