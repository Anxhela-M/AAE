
var dataMin = []
function drawMinutes() {
	$.ajax({
		url: '/getData',
		success: function(data) {

 			data.forEach(function(d, ind){
   			 	dataMin[ind]={y:   d.numberOfCars}
 			})
			console.log(data[0].numberOfCars)

			var chart = new CanvasJS.Chart("minutesGraph", {
				animationEnabled: true,
				theme: "light2",
				title:{
					text: "Simple Line Chart"
				},
				axisY:{
					includeZero: false
				},
				data: [{        
					type: "line",       
					dataPoints: dataMin
				}]
			});
			chart.render();
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

			

		var chart = new CanvasJS.Chart("hoursGraph", {
			animationEnabled: true,
			theme: "light2", // "light1", "light2", "dark1", "dark2"
			title:{
				text: "Top Oil Reserves"
			},
			axisY: {
				title: "Reserves(MMbbl)"
			},
			data: [{        
				type: "column",  
				showInLegend: true, 
				legendMarkerColor: "grey",
				legendText: "MMbbl = one million barrels",
				dataPoints: dataHour
			}]
		});
		chart.render();
	}
	})
}  



$(function(){
	
	drawMinutes()
	setInterval(drawMinutes(), 2 * 60 * 1000)

	drawHours()
	setInterval(drawHours(), 60 * 60 * 1000)


})