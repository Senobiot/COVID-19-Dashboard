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
            borderColor: [
                //'',
            ],
            borderWidth: 2
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

let lastMonthDates = []; //массив с поледними датами месяцев года

function getLastMonthDates(queryYear) {
    for (let index = 0; index < 11; index += 1) {
        let date = new Date(queryYear, index + 1, 0);
        let year = date.getFullYear();
        let month = index < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let day = date.getDate();
        let lastDate = `${year}-${month}-${day}`;
        lastMonthDates.push(lastDate)
    }
        let date = new Date();
        let year = date.getFullYear();
        let month =  date.getMonth() + 1 < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        let day = date.getDate();
        let lastDateNow = `${year}-${month}-${day - 1}`;
        lastMonthDates.push(lastDateNow);
}


let globalDataEveryMonth = [];

let globalMonthConfirmed = [];
let globalMonthDeaths = [];
let globalMonthRecovered = [];

(async function GlobalTotalMonths () {
    getLastMonthDates(2020);
    async function getData() {
    for (const item of lastMonthDates) {
        const response = await fetch(`https://covid-api.com/api/reports/total?date=${item}`);
        const data  = await response.json();
        globalDataEveryMonth.push(data.data);
    } 
  }
    await getData();
    
    async function dataToGraph() {
        for (let index = 0; index < globalDataEveryMonth.length; index++) {
            globalMonthConfirmed.push(globalDataEveryMonth[index].confirmed);
            globalMonthDeaths.push(globalDataEveryMonth[index].deaths);
            globalMonthRecovered.push(globalDataEveryMonth[index].recovered);
        }
        graphConfig.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec',];
        graphConfig.data.datasets[0].data = globalMonthConfirmed;
        graphWrapper.classList.remove('loading');
        myChart.update();
    }
    await dataToGraph();
})();

graphControlPanelTypeBtn.addEventListener('click', function(){
    if(this.checked) {
        graphConfig.type = 'line';
        myChart.update();
    } else {
        graphConfig.type = 'bar';
        myChart.update();
    }
})

// graphControlPanelCaseBtn1
// graphControlPanelCaseBtn2
// graphControlPanelCaseBtn3
graphControlPanelCaseBtn4.addEventListener('click', function(){
    graphConfig.data.datasets[0].data = globalMonthConfirmed;
    graphConfig.data.datasets[0].backgroundColor = '#675d04';
    graphConfig.data.datasets[0].label = 'Global Month Confirmed';
    myChart.update();
})
graphControlPanelCaseBtn5.addEventListener('click', function(){
    graphConfig.data.datasets[0].data = globalMonthDeaths;
    graphConfig.data.datasets[0].backgroundColor = '#842727';
    graphConfig.data.datasets[0].label = 'Global Month Deaths';
    myChart.update();
})
 graphControlPanelCaseBtn6.addEventListener('click', function(){
    graphConfig.data.datasets[0].data = globalMonthRecovered;
    graphConfig.data.datasets[0].backgroundColor = '#1b481b';
    graphConfig.data.datasets[0].label = 'Global Month Recovered';
    myChart.update();
})



export {myChart, graphConfig};