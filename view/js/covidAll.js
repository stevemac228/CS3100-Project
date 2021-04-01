/* Responsible for getting all the data (we have) on covid */
$(document).ready(function(){
    $.ajax({
        url: '/all',
        type: 'GET',
        contentType: 'application/json',                        
        success: function(response){
            var Dates = response.map(function(d){return d.Date});
            var Cases = response.map(function(d){return d.Confirmed / 1000000});
            var Deaths = response.map(function(d){return d.Deaths / 1000});
            var Recoveries = response.map(function(d){return d.Recovered / 1000});
            var totalCases = response.map(function(d){return d.Confirmed});
            var totalDeaths = response.map(function(d){return d.Deaths});
            var totalRecovered = response.map(function(d){return d.Recovered});
            totalCases = totalCases[187];
            totalDeaths = totalDeaths[187];
            totalRecovered = totalRecovered[187];
            for (x in Dates){
                Dates[x] = Dates[x].split("-")[1] + "/" + Dates[x].split("-")[2];
            };
            let chart = new Chart(myChart,{
                type: 'line',
                data: {
                  labels: Dates,
                  datasets: [{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    data: Cases,
                    fill: false,
                    pointRadius:0,
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: true,
                  title: {
                    text: 'Covid Cases over Time (millions)',
                    fontSize: 16,
                    fontStyle: '100',
                    fontColor: '#5fa8d3',
                    padding: 10,
                    display: true
                  },
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [{
                      gridLines: {
                        display: true,
                        color:'rgba(255,255,255,0.4)',
                        zeroLineWidth: 2,
                      },
                      ticks: {
                        fontColor: "white",
                    }
                    }],
                    xAxes: [{
                      gridLines: {
                        display: false,
                        color:'rgba(255,255,255,0.4)',
                        zeroLineWidth: 2,
                      },
                      ticks: {
                        fontColor: "white",
                    }
                    }]
                  }
                }
            });
            let chart2 = new Chart(myChart2,{
                type: 'line',
                data: {
                  labels: Dates,
                  datasets: [{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#FFFFFF',
                    data:Deaths,
                    fill: false,
                    pointRadius:0,
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: true,
                  title: {
                    text: 'Covid Deaths over Time (thousands)',
                    fontSize: 16,
                    fontStyle: '100',
                    fontColor: '#5fa8d3',
                    padding: 10,
                    display: true
                  },
                  legend: {
                    display: false
                  },
                  scales: {
                    yAxes: [{
                      gridLines: {
                        display: true,
                        color:'rgba(255,255,255,0.4)',
                        zeroLineWidth: 2,
                      },
                      ticks: {
                        fontColor: "white",
                    }
                    }],
                    xAxes: [{
                      gridLines: {
                        display: false,
                        color:'rgba(255,255,255,0.4)',
                        zeroLineWidth: 2,
                      },
                      ticks: {
                        fontColor: "white",
                    }
                    }]
                  }
                }
            });
            let chart3 = new Chart(myChart3,{
              type: 'line',
              data: {
                labels: Dates,
                datasets: [{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#FFFFFF',
                  data:Recoveries,
                  fill: false,
                  pointRadius:0,
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: true,
                title: {
                  text: 'Covid Recoveries over Time (thousands)',
                  fontSize: 16,
                  fontStyle: '100',
                  fontColor: '#5fa8d3',
                  padding: 10,
                  display: true
                },
                legend: {
                  display: false
                },
                scales: {
                  yAxes: [{
                    gridLines: {
                      display: true,
                      color:'rgba(255,255,255,0.4)',
                      zeroLineWidth: 2,
                    },
                    ticks: {
                      fontColor: "white",
                  }
                  }],
                  xAxes: [{
                    gridLines: {
                      display: false,
                      color:'rgba(255,255,255,0.4)',
                      zeroLineWidth: 2,
                    },
                    ticks: {
                      fontColor: "white",
                  }
                  }]
                }
              }
            });
            $({ countNum: $('#hometextcases').html() }).animate({countNum: totalCases}, {
                duration: 2000,
                easing: 'linear',
                step: function () {
                $("#hometextcases").html('TOTAL CASES: <span id="homepagenum">'+Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ '</span>');
            },
            complete: function () {
                $("#hometextcases").html('TOTAL CASES: <span id="homepagenum">'+this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ '</span>');
            }
            });
            $({ countNum: $('#hometextdeaths').html() }).animate({countNum: totalDeaths}, {
                duration: 2000,
                easing: 'linear',
                step: function () {
                $("#hometextdeaths").html('TOTAL DEATHS: <span id="homepagenum">'+Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ '</span>');
            },
            complete: function () {
                $("#hometextdeaths").html('TOTAL DEATHS: <span id="homepagenum">'+this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ '</span>');
            }
            });
            $({ countNum: $('#hometextrecovered').html() }).animate({countNum: totalRecovered}, {
                duration: 2000,
                easing: 'linear',
                step: function () {
                $("#hometextrecovered").html('TOTAL RECOVERED: <span id="homepagenum">'+Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ '</span>');
            },
            complete: function () {
                $("#hometextrecovered").html('TOTAL RECOVERED: <span id="homepagenum">'+this.countNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ '</span>');
            }
            });
        },                 
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
        }
    });
    $.ajax({
      url: '/twitter',
      type: 'GET',
      contentType: 'application/json',                        
      success: function(response){
        var sum = 0;
        for(x in response){
          sum +=response[x].tweetAmount;
        }
        $({ countNum: $('#hometexttwitternum').html() }).animate({countNum: sum
        }, {
            duration: 2000,
            easing: 'linear',
            step: function () {
            $("#hometexttwitternum").html(Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        },
        complete: function () {
            $("#hometexttwitternum").html(Math.floor(this.countNum).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
        }); 
      },                   
      error: function(xhr, status, error){
          var errorMessage = xhr.status + ': ' + xhr.statusText
          alert('Error - ' + errorMessage);
      }
  });
});
