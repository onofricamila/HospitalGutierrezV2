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
                data: [31.7, 32.4, 33.1, 33.7, 34.2, 34.6, 35.0, 35.4, 35.7, 36.1, 36.4, 36.7, 36.9, 37.2],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P15",
                borderColor: 'rgb(255, 207, 148)',
                data: [32.7, 33.3, 34.0, 34.6, 35.2, 35.6, 36.0, 36.4, 36.8, 37.1, 37.4, 37.7, 38.0, 38.2],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P50",
                borderColor: 'rgb(94, 255, 183)',
                data: [33.8, 34.6, 35.2, 35.8, 36.4, 36.8, 37.3, 37.7, 38.0, 38.4, 38.7, 39.0, 39.3, 39.5],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P85",
                borderColor: 'rgb(255, 207, 148)',
                data: [35.1, 35.8, 36.4, 37.0, 37.6, 38.1, 38.5, 38.9, 39.3, 39.6, 39.9, 40.2, 40.5, 40.8],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P97",
                borderColor: 'rgb(255, 153, 148)',
                data: [36.1, 36.7, 37.4, 38.0, 38.6, 39.1, 39.5, 39.9, 40.3, 40.6, 41.0, 41.3, 41.6, 41.9],
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
