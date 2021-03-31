$(document).ready(function(){
    $("#byrangeBtn").click(function(event){
        event.preventDefault();
        let date1 = $("#CsearchRange1").val();
        let date2 = $("#CsearchRange2").val();
        let field = $("#CsearchRange3").val();
        $.ajax({
            url: '/date/'+ date1 + '/' + date2 + '/'+ field,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                
                $("#byrangeBtn-out").css("display","flex");
                $("#byrangeBtn-out").css("flex-direction","column");
                $("#byrangeBtn-out").css("justify-content","space-around");
                $("#byrangeBtn-out").css("align-items","center");
                $({ countNum: $('#byrangeBtn-out').html() }).animate({countNum: response}, {
                    duration: 2000,
                    easing: 'linear',
                    step: function () {
                    $("#byrangeBtn-out").html('There have been <span id="info2">' + Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span>'+ field + ' from <span>'+ date1 + ' to ' + date2 + '</span>');
                },
                complete: function () {
                    $("#byrangeBtn-out").html('There have been <span id="info2">' + this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span>'+ field + ' from <span>'+ date1 + ' to ' + date2 + '</span>');
                }
                });
                  
                },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    }); 
});

