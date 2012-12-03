// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require_tree .

$(document).ready(function(){
    
    var rate = 0.0;
    var fromCurrency = $("#from_currency");
    var toCurrency= $("#to_currency");
    var fromCurrencyError = $("#from_currency_error");
    var toCurrencyError = $("#to_currency_error");
    var fromAmount = $("#from_amount");
    var toAmount = $("#to_amount");
    var increment = $("#increment");
    var flraAmount = $("#flra_amount");
    var flarDiv = $("#flra_div");
    var message = $("#convertion_rate_message");


    /*
     * purpose : for updating error field , flra div
     * params : none
     * return : none
     **/

    var fromCurrencyChanged = function(){
        
        fromCurrencyError.html("&nbsp;");
        flarDiv.hide();
        message.html("&nbsp;")
    };
    
    
    /*
     * purpose : for updating error field , flra div
     * params : none
     * return : none
     **/
    var toCurrencyChanged = function(){
        
        toCurrencyError.html("&nbsp;");
        flarDiv.hide();
        message.html("&nbsp;")
        
    };



    /*
     * purpose : for call controller create action using ajax 
     * params : none
     * return : none
     **/
    var getConversionRate = function(){

        fromCurrencyChanged();
        toCurrencyChanged();
        if(!isBlank(fromCurrency.val())){

            if(isBlank(fromAmount.val()) || !isDecimal(fromAmount.val())){

                fromCurrencyError.html("Please enter appropriate from amount.");
                return;
            }
        }
        else{

            fromCurrencyError.html("Please select from Currency Unit.");
        }

        if(isBlank(toCurrency.val())){

            toCurrencyError.html("Please select to Currency Unit.");
            return;
        }


        $.post('/publics',{
            fromCurrency : fromCurrency.val(),
            toCurrency : toCurrency.val()
        },function(data) {
            rate = data;
            console.log(data);
            toAmount.val(fromAmount.val()*rate);
            if((fromCurrency.val() == "INR" && toCurrency.val() == "USD") ||
                (fromCurrency.val() == "USD" && toCurrency.val() == "INR" )){

                flarDiv.show();
            }
            else{
                flarDiv.hide();
            }
        
            
            message.html("<div class=\"alert alert-success\">"+
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>"+
                "<b>Successfully Calculated Convertion Rate!</b>"+
                "       1  "+fromCurrency.val()+ " = "+rate +"  "+toCurrency.val()+"</div>")
        }
        );

    };
    
    /*
     * purpose : for calculating flra
     * params : none
     * return : none
     **/
    var calculateFLRA = function(){
        
        var dollar;
        
        if(rate > 1){

            dollar= Math.ceil(rate);
            
        }
        else{

            dollar = Math.ceil(1 / rate);
            
        }       
        
        var flr = (dollar - 48)/5 * increment.val();
        
        flraAmount.val(flr);

    };
    
    /*
     * purpose : for initializing the fields and callbacks
     **/
    var initializer = function(){
        $("#get_conversion_rate").click(getConversionRate);
        fromCurrency.change(fromCurrencyChanged);
        toCurrency.change(toCurrencyChanged);
        $("#calculate_flra").live("click",calculateFLRA);
        fromAmount.val("");
        toAmount.val("");
        fromCurrency.val("USD");
        toCurrency.val("INR");
        increment.val("");
        flraAmount.val("");
        flarDiv.hide();
        $('#loading_div')
        .hide()  // hide it initially
        .ajaxStart(function() {
            $(this).show();
        })
        .ajaxStop(function() {
            $(this).hide();
        })
    ;

    };


    initializer();

});


/*
 * purpose : for checking blank 
 * params : string
 * return : boolean
 **/
function isBlank(string){
    
    if (!string || string.length == 0) {
        
        return true;
        
    }
    
    return !/[^\s]+/.test(string);
}

/*
* purpose : for checking decimal
* params : number
* return : boolean
**/

function isDecimal(number)
{
    //var decimal=  /^[0-9]+(\.[0-9]+)+$/;
    
    var integer = /^[0-9]+$/;
    
    if(number.match(integer)) {

        return true;
    }
    else {

        return false;
    }
}

