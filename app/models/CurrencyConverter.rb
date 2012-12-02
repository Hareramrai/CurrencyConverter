=begin
 @purpose : for CurrencyConversion 
 @created by : Hare Ram Rai 
=end

class CurrencyConverter
  
  attr_reader :result

  # purpose :  for initializing the object of currency converter
  # params : fromCurrecny(unit),toCurrency(unit)
  # return : none
  def initialize(fromCurrency , toCurrency)
            
    # creating a client from the wsdl schema  
    client = Savon::Client.new("http://webservicex.net/currencyconvertor.asmx?wsdl")
    
    # calling the api with fromCurrecny and toCurrency unit
    response = client.request :web, :conversion_rate, body: { "FromCurrency" => fromCurrency , "ToCurrency" => toCurrency }
   
    #checking for success of api call
    if response.success?
      
      data = response.to_array(:conversion_rate_response).first
      if data
        
        @result = data[:conversion_rate_result]
        
      end
      
    end
    
  end
  
end

