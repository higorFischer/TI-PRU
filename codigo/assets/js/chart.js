document.addEventListener('DOMContentLoaded', () => {

	var i = 0;

	var dadosExames = {
		"exame": [
			{   
				"id": 1,
				"nome": "Glicose",
				"data": ["12/07/23", "29/08/23", "21/09/23"],
				"resultado": [109, 85, 98],
				"referencia": "90 a 110 mg/dL",
				"refMin": 90,
			},
			{
				"id": 2,
				"nome": "Vitamina D",
				"data": ["18/07/23", "30/08/23", "01/09/23"],
				"resultado": [150, 170, 120],
				"referencia": "130 a 190 mg/dL",
				"refMin": 130
			},
			{
				"id": 3,
				"nome": "Tireoide",
				"data": ["25/07/23", "29/08/23", "01/10/23"],
				"resultado": [135, 110, 112],
				"referencia": "115 a 150 mg/dL",
				"refMin": 115
			}
		]
	};
	
	function createChart(containerID){
		var chart = Highcharts.chart(containerID, {
			chart: {
				type: 'line',
				backgroundColor: 'white',
				borderColor: 'white',
				borderWidth: 5,
				borderRadius: 30,
			},
	
			credits: {
				enabled: false
			},
	
			tooltip: {
				formatter() {
					return `${this.y}`
				},
				
			},
	
			legend: {enabled: false},
			
			title: {
				text: 'Glicose',
				style: {
					color: 'white'
				}
			},
	
			yAxis: {
				title: '',
				min: 0,
				max: 200,
				gridLineColor: '#9CCEFF',
				gridLineWidth: 2,
				lineWidth: 2,
				lineColor: '#9CCEFF',
				labels: {
					style: {
						color: '#559AC1',
						fontSize: 14,
					}
				}
			},
			
			xAxis: {
				categories: dadosExames.exame[i].data,
				lineColor: '#9CCEFF',
				lineWidth: 2,
				labels: {
					style: {
						color: '#559AC1',
						fontSize: 15,
					}
				}
			},
			
			series: [
				{
				color: '#0f0',
				lineWidth: 4,
				data: dadosExames.exame[i].resultado,
				marker: {
					radius: 7
				},
				zones: [
					{
					value: dadosExames.exame[i].refMin,
					color: '#f00',
				},
				
			]
			},
		],
		});
	}
});
