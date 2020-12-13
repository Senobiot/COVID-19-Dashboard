//import getTotalData from './table_total';


const graphWrapper = document.createElement('div');
graphWrapper.classList.add('graphWrapper', 'loading');

const graph = document.createElement('canvas');
graph.width = '100%';
graph.height = 'auto';
graph.id = 'myChart';



const graphControlPanel = document.createElement('div');
graphControlPanel.classList.add('graphControlPanel');

const graphControlPanelTypeBtn =  document.createElement('input');
graphControlPanelTypeBtn.type = "checkbox";
graphControlPanelTypeBtn.classList.add('graphSwitcher');


const graphControlPanelCaseBtn1 =  document.createElement('button');
graphControlPanelCaseBtn1.classList.add('graphBtn', 'graphConfirmedDaily');
graphControlPanelCaseBtn1.textContent = 'Daily Cases'

const graphControlPanelCaseBtn2 =  document.createElement('button');
graphControlPanelCaseBtn2.classList.add('graphBtn', 'graphDeathsDaily');
graphControlPanelCaseBtn2.textContent = 'Daily Deaths';

const graphControlPanelCaseBtn3 =  document.createElement('button');
graphControlPanelCaseBtn3.classList.add('graphBtn', 'graphRecoveredDaily');
graphControlPanelCaseBtn3.textContent = 'Daily Recovered';

const graphControlPanelCaseBtn4 =  document.createElement('button');
graphControlPanelCaseBtn4.classList.add('graphBtn', 'graphConfirmedTotal');
graphControlPanelCaseBtn4.textContent = 'Cumulative Confirmed'

const graphControlPanelCaseBtn5 =  document.createElement('button');
graphControlPanelCaseBtn5.classList.add('graphBtn', 'graphDeathsTotal');
graphControlPanelCaseBtn5.textContent = 'Cummulative Deaths'

const graphControlPanelCaseBtn6 =  document.createElement('button');
graphControlPanelCaseBtn6.classList.add('graphBtn', 'graphRecoveredTotal');
graphControlPanelCaseBtn6.textContent = 'Cummulative recovered'


graphControlPanel.appendChild(graphControlPanelCaseBtn1);
graphControlPanel.appendChild(graphControlPanelCaseBtn2);
graphControlPanel.appendChild(graphControlPanelCaseBtn3);
graphControlPanel.appendChild(graphControlPanelCaseBtn4);
graphControlPanel.appendChild(graphControlPanelCaseBtn5);
graphControlPanel.appendChild(graphControlPanelCaseBtn6);


graphWrapper.appendChild(graph);
graphWrapper.appendChild(graphControlPanelTypeBtn);
graphWrapper.appendChild(graphControlPanel);

document.body.appendChild(graphWrapper);

const ctx = document.getElementById('myChart').getContext('2d');

const graphConfig = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            fill: false,
            label: 'Global Month Confirmed',
            data: [],
            backgroundColor: '#675d04',
            borderColor: '#675d04',
            //borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Total cases in the world'
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
            },
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback(value, index, values) {
                        return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                    }
                }
            }]
        }
    }
}

const myChart = new Chart(ctx, graphConfig);

graphControlPanelTypeBtn.addEventListener('click', function(){
    if(this.checked) {
        graphConfig.type = 'line';
        myChart.update();
    } else {
        graphConfig.type = 'bar';
        myChart.update();
    }
})

export {myChart, graphConfig, graphControlPanel, graphWrapper};