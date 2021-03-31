$(document).ready(function(){
    $("#bycdandcBtn").click(function(event){
        event.preventDefault();
        let date = $("#CsearchDate2").val();
        let country = $("#CsearchCountry2").val();
        $.ajax({
            url: '/country/'+ country + '/' + date,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                $("#bycdandcBtn-out").css("display","flex");
                $("#bycdandcBtn-out").css("flex-direction","column");
                $("#bycdandcBtn-out").css("justify-content","space-around");
                $("#bycdandcBtn-out").css("align-items","center");
                $("#bycdandcBtn-out").html('<span id="fadein">Active: <span id="info">'+ response[0].Active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Cases: <span id="info">'+ response[0].Confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Recovered: <span id="info">'+ response[0].Recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Deaths: <span id="info">'+ response[0].Deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">New cases: <span id="info">'+ response[0].New_cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">New recoveries: <span id="info">'+ response[0].New_recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</span></span>' +
                                          '<span id="fadein">New deaths: <span id="info">'+ response[0].New_deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>'
                                          );   
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    }); 
});