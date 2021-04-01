/* Gets covid cases for a specific country */
$(document).ready(function(){
    $("#bycCountryBtn").click(function(event){
        event.preventDefault();
        let country = $("#CsearchCountry").val(); //only valid if spelt with proper capitalization ei "Canada" not "canada" 
        $.ajax({
            url: '/country/'+country,
            type: 'GET',
            contentType: 'application/json',                        
            success: function(response){
                $("#bycCountryBtn-out").css("display","flex");
                $("#bycCountryBtn-out").css("flex-direction","column");
                $("#bycCountryBtn-out").css("justify-content","space-around");
                $("#bycCountryBtn-out").css("align-items","center");
                if(typeof response == 'string'){
                    $("#bycCountryBtn-out").text(country + " is not a valid country.");
                }
                else{
                $("#bycCountryBtn-out").html('<span id="fadein">Active: <span id="info">'+ response[0].ActiveCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Cases: <span id="info">'+ response[0].TotalCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Recovered: <span id="info">'+ response[0].TotalRecovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Deaths: <span id="info">'+ response[0].TotalDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Tests: <span id="info">'+ response[0].TotalTests.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Population: <span id="info">'+ response[0].Population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +'</span></span>' +
                                          '<span id="fadein">Total Cases/1M pop: <span id="info">'+ response[0].Tot_Cases_1M_pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Total Deaths/1M pop: <span id="info">'+ response[0].Deaths_1M_pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>' + 
                                          '<span id="fadein">Tests /1M pop: <span id="info">'+ response[0].Tests_1M_pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span></span>'
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
