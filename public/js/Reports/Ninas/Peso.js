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
                data: [2.4, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9, 4.1, 4.2, 4.3, 4.5, 4.6],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P15",
                borderColor: 'rgb(255, 207, 148)',
                data: [2.8, 2.9, 3.1, 3.3, 3.5, 3.8, 4.0, 4.2, 4.4, 4.5, 4.7, 4.8, 5.0, 5.1],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P50",
                borderColor: 'rgb(94, 255, 183)',
                data: [3.2, 3.3, 3.6, 3.8, 4.1, 4.3, 4.6, 4.8, 5.0, 5.2, 5.4, 5.5, 5.7, 5.8],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P85",
                borderColor: 'rgb(255, 207, 148)',
                data: [3.7, 3.9, 4.1, 4.4, 4.7, 5.0, 5.3, 5.5, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P97",
                borderColor: 'rgb(255, 153, 148)',
                data: [4.2, 4.4, 4.6, 5.0, 5.3, 5.6, 5.9, 6.1, 6.4, 6.6, 6.8, 7.0, 7.2, 7.4],
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
