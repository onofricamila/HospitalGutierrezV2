var weeks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: weeks,
        datasets: [{
                label: "P3",
                borderColor: 'rgb(255, 153, 148)',
                backgroundColor: 'rgb(255, 153, 148)',
                data: [45.6, 50.0, 53.2, 55.8, 58.0, 59.9, 61.5, 62.9, 64.3, 65.6, 66.8, 68.0, 69.2, 70.3, 71.3, 72.4, 73.3, 74.3, 75.2, 76.2, 77.0, 77.9, 78.7, 79.6, 80.3],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P15",
                borderColor: 'rgb(255, 207, 148)',
                backgroundColor: 'rgb(255, 207, 148)',
                data: [47.2, 51.7, 55.0, 57.6, 59.8, 61.7, 63.4, 64.9, 66.3, 67.6, 68.9, 70.2, 71.3, 72.5, 73.6, 74.7, 75.7, 76.7, 77.7, 78.7, 79.6, 80.5, 81.4, 82.2, 83.1],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P50",
                borderColor: 'rgb(94, 255, 183)',
                backgroundColor: 'rgb(94, 255, 183)',
                data: [49.1, 53.7, 57.1, 59.8, 62.1, 64.0, 65.7, 67.3, 68.7, 70.1, 71.5, 72.8, 74.0, 75.2, 76.4, 77.5, 78.6, 79.7, 80.7, 81.7, 82.7, 83.7, 84.6, 85.5, 86.4],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P85",
                borderColor: 'rgb(255, 207, 148)',
                backgroundColor: 'rgb(255, 207, 148)',
                data: [51.1, 55.7, 59.2, 62.0, 64.3, 66.3, 68.1, 69.7, 71.2, 72.6, 74.0, 75.4, 76.7, 77.9, 79.2, 80.3, 81.5, 82.6, 83.7, 84.8, 85.8, 86.8, 87.8, 88.8, 89.8],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P97",
                borderColor: 'rgb(255, 153, 148)',
                backgroundColor: 'rgb(255, 153, 148)',
                data: [52.7, 57.4, 60.9, 63.8, 66.2, 68.2, 70.0, 71.6, 73.2, 74.7, 76.1, 77.5, 78.9, 80.2, 81.4, 82.7, 83.9, 85.0, 86.2, 87.3, 88.4, 89.4, 90.5, 91.5, 92.5],
                fill: false,
                borderWidth: 1,
            }
        ]
    },

    // Configuration options go here
    options: {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Peso (kg)'
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Semana'
                }
            }]
        }
    }
});
