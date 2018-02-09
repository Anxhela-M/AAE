
var dataMin = []
function drawMinutes() {
	$.ajax({
		url: '/getData',
		success: function(data) {

 			data.forEach(function(d, ind){
   			 	dataMin[ind]={y:   d.numberOfCars, label: d.timestamp.substring(16, 21)}
 			})
			console.log(data[0].numberOfCars)

			drawChart(dataMin, "minutesGraph", "Current Traffic Reporter", "Number Of Cars", "line");
		}
	})
}



var dataHour = []

function drawHours(){
	$.ajax({
		url: '/getHoursData',
		success: function(data) {
 			data.forEach(function(d, ind){
 				console.log(d.timestamp.substring(16, 18))
 				console.log("nr mak: " + d.numberOfCars)
   				dataHour[ind]={y: d.numberOfCars, label: d.timestamp.substring(16, 18)
   			}
 		})

		console.log(data[0].numberOfCars)
		drawChart(dataHour, "hoursGraph", "Hourly Traffic Reporter", "Number Of Cars", "column")
	}
	})
}

var dailyData = []

function drawDays(){
	$.ajax({
		url: '/getDailyData',
		success: function(data) {
 			data.forEach(function(d, ind){
   				dailyData[ind]={y: d.numberOfCars, label: d.timestamp.substring(8, 10)
   			}
 		})

		console.log(data[0].numberOfCars)
		drawChart(dailyData, "dailyGraph", "Daily Traffic Reporter", "Number Of Cars", "column")
	}
	})
} 

function drawChart(data, divId, text, y, type){
	var chart = new CanvasJS.Chart(divId, {
			animationEnabled: true,
			theme: "light2", // "light1", "light2", "dark1", "dark2"
			title:{
				text: text
			},
			axisY: {
				title: y
			},
			data: [{        
				type: type,  
				dataPoints: data
			}]
		});
		chart.render();
} 



$(function(){
	
	drawMinutes()
	setInterval(drawMinutes(), 2 * 60 * 1000)

	drawHours()
	setInterval(drawHours(), 60 * 60 * 1000)

	drawDays()
	setInterval(drawDays(), 24 * 60 * 60 * 1000)

})