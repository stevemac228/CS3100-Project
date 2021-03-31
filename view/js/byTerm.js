$(document).ready(function(){
    $("#byTermBtn").click(function(event){
        event.preventDefault();
        let term = $("#searchTerm").val();
        $.ajax({
            url: '/tweets/'+term,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                if(typeof response == 'string'){
                    $("#byTermBtn-out").text(response);
                }
                else{
                    $({ countNum: $('#byTermBtn-out').html() }).animate({countNum: response[0].counts}, {
                        duration: 2000,
                        easing: 'linear',
                        step: function () {
                        $("#byTermBtn-out").html('<span id="term">'+ term + '</span> was tweeted <span id="num">' + Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span> times.');
                    },
                    complete: function () {
                        $("#byTermBtn-out").html('<span id="term">'+ term + '</span> was tweeted <span id="num">' + this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span> times.');
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