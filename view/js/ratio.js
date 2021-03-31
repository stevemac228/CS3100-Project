$(document).ready(function(){
    $.ajax({
        url: '/ratio/Cases',
        type: 'GET',
        contentType: 'application/json',                        
        success: function(response){
            $("#ratio").html('Covid Cases to Tweets Ratio: <span id="homepagenum">'+response+ '</span>');
        },                 
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });
});