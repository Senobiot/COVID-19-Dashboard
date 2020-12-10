let graph_wrapper = document.createElement('div');
graph_wrapper.classList.add('graphWrapper');

let graph = document.createElement('canvas');
graph.id = 'myChart';
graph_wrapper.appendChild(graph);
document.body.appendChild(graph_wrapper);

let ctx = document.getElementById('myChart').getContext('2d');

let graphConfig = {
    type: 'line',
    data: {
        labels: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
        datasets: [{
            label: 'Quantity of cases',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Total cases in the world'
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                    }
                }
            }]
        }
    }
}

let myChart = new Chart(ctx, graphConfig);

// graphButtonsAdd.addEventListener('click', ()=> {
//     const newDataSet = {
//         label: graphButtonsInput.value || null,
//         data: [1, 50, 33, 11, 33, 12],
//         backgroundColor: [
//             'red',
//         ],
//         borderColor: [
//             'green',
//         ],
//         borderWidth: 1
//     }
//     graphConfig.data.datasets.push(newDataSet);
//     myChart.update();
// })

export {myChart, graphConfig};