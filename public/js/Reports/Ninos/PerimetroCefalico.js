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
                data: [32.1, 32.9, 33.7, 34.3, 34.9, 35.4, 35.9, 36.3, 36.7, 37.0, 37.4, 37.7, 38.0, 38.3],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P15",
                borderColor: 'rgb(255, 207, 148)',
                data: [33.1, 33.9, 34.7, 35.3, 35.9, 36.4, 36.8, 37.3, 37.7, 38.0, 38.4, 38.7, 39.0, 39.3],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P50",
                borderColor: 'rgb(94, 255, 183)',
                data: [34.5, 35.2, 35.9, 36.5, 37.1, 37.6, 38.1, 38.5, 38.9, 39.2, 39.6, 39.9, 40.2, 40.5],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P85",
                borderColor: 'rgb(255, 207, 148)',
                data: [35.8, 36.4, 37.1, 37.7, 38.3, 38.8, 39.3, 39.7, 40.1, 40.5, 40.8, 41.1, 41.4, 41.7],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P97",
                borderColor: 'rgb(255, 153, 148)',
                data: [36.6, 37.5, 38.1, 38.7, 39.3, 39.8, 40.3, 40.7, 41.7, 41.4, 41.8, 42.1, 42.4, 42.7],
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
