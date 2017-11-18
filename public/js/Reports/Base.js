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
                data: data[0],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P15",
                borderColor: 'rgb(255, 207, 148)',
                backgroundColor: 'rgb(255, 207, 148)',
                data: data[1],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P50",
                borderColor: 'rgb(94, 255, 183)',
                backgroundColor: 'rgb(94, 255, 183)',
                data: data[2],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P85",
                borderColor: 'rgb(255, 207, 148)',
                backgroundColor: 'rgb(255, 207, 148)',
                data: data[3],
                fill: false,
                borderWidth: 1,
            },
            {
                label: "P97",
                borderColor: 'rgb(255, 153, 148)',
                backgroundColor: 'rgb(255, 153, 148)',
                data: data[4],
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
                    labelString: yLabel
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
