class CurrencyConverter
  attr_reader :result

  def initialize(fromCurrency , toCurrency)
    # Gyoku.convert_symbols_to :camelcase
    client = Savon::Client.new("http://webservicex.net/currencyconvertor.asmx?wsdl")
    response = client.request :web, :conversion_rate, body: { "FromCurrency" => fromCurrency , "ToCurrency" => toCurrency }
    if response.success?
      data = response.to_array(:conversion_rate_response).first
      if data
        @result = data[:conversion_rate_result]
      end
    end
  end
end

