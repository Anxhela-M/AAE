
function update(chart, dataMin){
	$.ajax({
		url: '/api/getLastMinute',
		success: function(data){
			console.log(data);
			var yVal = 100; 
			var updateInterval =  2*60*1000;
			var dataLength = 30; // number of dataPoints visible at any point

			var updateChart = function (count) {

				count = count || 1;

				for (var j = 0; j < count; j++) {
					dataMin.push({
						y: data[0].numberOfCars,
						label: data[0].timestamp.substring(16, 21)
					});
					console.log("update" + data[0].numberOfCars)
				}

				if (dataMin.length > dataLength) {
					dataMin.shift();
				}

				chart.render();
			};

			updateChart(dataLength);
			setInterval(function(){updateChart()}, updateInterval);
		}
	})
}

var dataMin = []
var i;
function drawMinutes() {
	$.ajax({
		url: '/api/getData',
		success: function(data) {

 			data.forEach(function(d, ind){
   			 	dataMin[ind]={y:   d.numberOfCars, label: d.timestamp.substring(16, 21)}
   			 	i = ind;
 			})
			console.log(data[0].numberOfCars)

			var chart = drawChart(dataMin, "minutesGraph", "Current Traffic Reporter", "Number Of Cars", "line");
			update(chart, dataMin);
		}
	})
}


var dataHour = []

function drawHours(){
	$.ajax({
		url: '/api/getHoursData',
		success: function(data) {
 			data.forEach(function(d, ind){
 				console.log(d.timestamp.substring(16, 18))
 				console.log("nr mak: " + d.numberOfCars)
   				dataHour[ind]={y: d.numberOfCars, label: d.timestamp.substring(16, 21)
   			}
 		})

		console.log(data[0].numberOfCars)
		drawChart(dataHour, "hoursGraph", "Hourly Traffic Reporter", "Number Of Cars", "area")
	}
	})
}

var dailyData = []

function drawDays(){
	$.ajax({
		url: '/api/getDailyData',
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

var monthlyData = []

function drawMonths(){
	$.ajax({
		url: '/api/getMonthlyData',
		success: function(data) {
 			data.forEach(function(d, ind){
   				monthlyData[ind]={y: d.numberOfCars, label: d.timestamp.substring(4, 7)
   			}
 		})

		console.log(data[0].numberOfCars)
		drawChart(monthlyData, "monthlyGraph", "Monthly Traffic Reporter", "Number Of Cars", "column")
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
				title: y,
				includeZero: false
			},
			data: [{        
				type: type,  
				dataPoints: data
			}]
		});
		chart.render();

		return chart;
} 

$(function(){
	
	drawMinutes()
	setInterval(drawMinutes(), 2 * 60 * 1000)

	drawHours()
	setInterval(drawHours(), 60 * 60 * 1000)

	drawDays()
	setInterval(drawDays(), 24 * 60 * 60 * 1000)

	drawMonths()
	setInterval(drawDays(), 28 * 24 * 60 * 60 * 1000)




})