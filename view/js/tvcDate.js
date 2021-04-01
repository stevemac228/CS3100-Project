$(document).ready(function(){
    $("#tvcdayBtn").click(function(event){
        event.preventDefault();
        let date = $("#TvCdaysearch").val();
        $.ajax({
            url: '/tweets/date/'+date,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                $("#tvcdayBtn-out").css("display","flex");
                $("#tvcdayBtn-out").css("flex-direction","column");
                $("#tvcdayBtn-out").css("justify-content","space-around");
                $("#tvcdayBtn-out").css("align-items","center");
                if(typeof response == 'string'){
                    if (date.includes('-',2) == false) {
                        $("#tvcdayBtn-out").text(date  + " is not a valid date.");
                    }
                    else{$("#tvcdayBtn-out").text(response);}
                }
                else{
                    $({ countNum: $('#tvcdayBtn-out').html() }).animate({countNum: response[0].tweetAmount
                    }, {
                        duration: 2000,
                        easing: 'linear',
                        step: function () {
                        $("#tvcdayBtn-out").html('<span>There were <span id="num">' + Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span> tweets on <span id="term">'+ date + '</span>.</span>');
                    },
                    complete: function () {
                        $("#tvcdayBtn-out").html('<span>There were <span id="num">' + Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span> tweets on <span id="term">'+ date + '</span>.</span>');
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
    $("#tvcdayBtn").click(function(event){
        event.preventDefault();
        let date = $("#TvCdaysearch").val();
        $.ajax({
            url: '/date/'+date,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                $("#tvcdayBtn-out2").css("display","flex");
                $("#tvcdayBtn-out2").css("flex-direction","column");
                $("#tvcdayBtn-out2").css("justify-content","space-around");
                $("#tvcdayBtn-out2").css("align-items","center");
                if(typeof response == 'string'){
                    if (date.includes('-',2) == false) {
                        console.log('test2')
                        $("#tvcdayBtn-out2").text(date + "is not a valid date.");
                    }
                    else{$("#tvcdayBtn-out2").text(response);}
                }
                else{
                    $({ countNum: $('#tvcdayBtn-out2').html() }).animate({countNum: response[0].Confirmed
                    }, {
                        duration: 2000,
                        easing: 'linear',
                        step: function () {
                        $("#tvcdayBtn-out2").html('<span>There were <span id="num">' + Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span> cases on <span id="term">'+ date + '</span>.</span>');
                    },
                    complete: function () {
                        $("#tvcdayBtn-out2").html('<span>There were <span id="num">' + Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span> cases on <span id="term">'+ date + '</span>.</span>');
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
