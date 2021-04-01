/* Responsible for getting the amount of tweets on a specific day */
$(document).ready(function(){
    $("#byDateBtn").click(function(event){
        event.preventDefault();
        let date = $("#searchDate").val();
        $.ajax({
            url: '/tweets/date/'+date,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                if(typeof response == 'string'){
                    if (date.includes('-',2) == false) {
                        $("#byDateBtn-out").text(date  + " is not a valid date.");
                    }
                    else{$("#byDateBtn-out").text(response);}
                }
                else{
                    $({ countNum: $('#byDateBtn-out').html() }).animate({countNum: response[0].tweetAmount
                    }, {
                        duration: 2000,
                        easing: 'linear',
                        step: function () {
                        $("#byDateBtn-out").html('There were <span id="num">' + Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span> tweets on <span id="term">'+ date + '</span>.');
                    },
                    complete: function () {
                        $("#byDateBtn-out").html('There were <span id="num">' + Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span> tweets on <span id="term">'+ date + '</span>.');
                    }
                    });
                };  
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
    
});   
