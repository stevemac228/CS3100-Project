$(document).ready(function(){
    $("#bycDateBtn").click(function(event){
        event.preventDefault();
        let date = $("#CsearchDate").val();
        $.ajax({
            url: '/date/'+date,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                $("#bycDateBtn-out").css("display","flex");
                $("#bycDateBtn-out").css("flex-direction","column");
                $("#bycDateBtn-out").css("justify-content","space-around");
                $("#bycDateBtn-out").css("align-items","center");
                if(typeof response == 'string'){
                    if (date.includes('-',2) == false) {
                        $("#bycDateBtn-out").text(date + "is not a valid date.");
                    }
                    else{$("#bycDateBtn-out").text(response);}
                }
                else{
                $("#bycDateBtn-out").html('<span id="fadein">Active: <span id="info">'+ response[0].Active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Cases: <span id="info">'+ response[0].Confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Recovered: <span id="info">'+ response[0].Recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Deaths: <span id="info">'+ response[0].Deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">New cases: <span id="info">'+ response[0].New_cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">New recoveries: <span id="info">'+ response[0].New_recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</span></span>' +
                                          '<span id="fadein">New deaths: <span id="info">'+ response[0].New_deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Deaths/100 Cases: <span id="info">'+ response[0].Deaths_100_Cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Recovered/100 Cases: <span id="info">'+ response[0].Recovered_100_Cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Deaths/100 Recovered: <span id="info">'+ response[0].Deaths_100_Recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>'+
                                          '<span id="fadein">No of countries: <span id="info">'+ response[0].No_of_countries.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>'
                                          );
                 }   
            },                   
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    }); 
});