=begin
 @purpose : for public controller's action  
 @created by : Hare Ram Rai 
=end


class PublicsController < ApplicationController
  
  #purpose: for showing the home page for the application
  def index

  end
  
  # purpose: for calculating the currency convertion rate 
  # params : params[:fromCurrency],params[:toCurrency]
  # return :  convertion rate
  def create
    
    currency = CurrencyConverter.new(params[:fromCurrency],params[:toCurrency])
    render :json => currency.result
    
  end

end

