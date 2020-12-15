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
graphControlPanelTypeBtn.classList.add('graphSwitcherType');

const graphControlPanelDataBtn =  document.createElement('input');
graphControlPanelDataBtn.type = "checkbox";
graphControlPanelDataBtn.classList.add('graphSwitcherData');

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
graphControlPanelCaseBtn4.classList.add('graphBtn', 'graphConfirmedTotal', 'active');
graphControlPanelCaseBtn4.textContent = 'Cumulative Confirmed';

const graphControlPanelCaseBtn5 =  document.createElement('button');
graphControlPanelCaseBtn5.classList.add('graphBtn', 'graphDeathsTotal');
graphControlPanelCaseBtn5.textContent = 'Cummulative Deaths';

const graphControlPanelCaseBtn6 =  document.createElement('button');
graphControlPanelCaseBtn6.classList.add('graphBtn', 'graphRecoveredTotal');
graphControlPanelCaseBtn6.textContent = 'Cummulative recovered';

const graphControlPanelCaseBtn7 =  document.createElement('button');
graphControlPanelCaseBtn7.classList.add('graphBtn', 'graphConfirmedDailyPer100k', 'hidden');
graphControlPanelCaseBtn7.textContent = 'Daily Cases per 100k';

const graphControlPanelCaseBtn8 =  document.createElement('button');
graphControlPanelCaseBtn8.classList.add('graphBtn', 'graphDeathsDailyPer100k', 'hidden');
graphControlPanelCaseBtn8.textContent = 'Daily Deaths per 100k';

const graphControlPanelCaseBtn9 =  document.createElement('button');
graphControlPanelCaseBtn9.classList.add('graphBtn', 'graphRecoveredDailyPer100k', 'hidden');
graphControlPanelCaseBtn9.textContent = ' daily recovered per 100k';

const graphControlPanelCaseBtn10 =  document.createElement('button');
graphControlPanelCaseBtn10.classList.add('graphBtn', 'graphConfirmedDailyPer100k', 'hidden');
graphControlPanelCaseBtn10.textContent = 'recovered per 100k';

const graphControlPanelCaseBtn11 =  document.createElement('button');
graphControlPanelCaseBtn11.classList.add('graphBtn', 'graphConfirmedDailyPer100k', 'hidden');
graphControlPanelCaseBtn11.textContent = 'recovered per 100k';

const graphControlPanelCaseBtn12 =  document.createElement('button');
graphControlPanelCaseBtn12.classList.add('graphBtn', 'graphConfirmedDailyPer100k', 'hidden');
graphControlPanelCaseBtn12.textContent = 'recovered per 100k';

const fullScreenBtn = document.createElement('div');
fullScreenBtn.classList.add('fullScreenGraph');

graphControlPanel.appendChild(graphControlPanelCaseBtn1);
graphControlPanel.appendChild(graphControlPanelCaseBtn2);
graphControlPanel.appendChild(graphControlPanelCaseBtn3);
graphControlPanel.appendChild(graphControlPanelCaseBtn4);
graphControlPanel.appendChild(graphControlPanelCaseBtn5);
graphControlPanel.appendChild(graphControlPanelCaseBtn6);
graphControlPanel.appendChild(graphControlPanelCaseBtn7);
graphControlPanel.appendChild(graphControlPanelCaseBtn8);
graphControlPanel.appendChild(graphControlPanelCaseBtn9);
graphControlPanel.appendChild(graphControlPanelCaseBtn10);
graphControlPanel.appendChild(graphControlPanelCaseBtn11);
graphControlPanel.appendChild(graphControlPanelCaseBtn12);

graphWrapper.appendChild(graph);
graphWrapper.appendChild(graphControlPanelTypeBtn);
graphWrapper.appendChild(graphControlPanelDataBtn);
graphWrapper.appendChild(graphControlPanel);
graphWrapper.appendChild(fullScreenBtn);


document.body.appendChild(graphWrapper);

const ctx = document.getElementById('myChart').getContext('2d');

            const graphConfig = {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            fill: false,
            label: 'Total Confirmed',
            data: [],
            backgroundColor: '#675d04',
            borderColor: '#675d04',
            // borderWidth: 1
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Global'
        },
        tooltips: {
            callbacks: {
                label(tooltipItem) {
                    return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                },
            },
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    callback(value) {
                        return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                    }
                }
            }]
        }
    }
}

const myChart = new Chart(ctx, graphConfig);

graphControlPanelTypeBtn.addEventListener('click', function clickGraphControlPanelTypeBtn(){
    if(this.checked) {
        graphConfig.type = 'line';
        myChart.update();
    } else {
        graphConfig.type = 'bar';
        myChart.update();
    }
})

fullScreenBtn.addEventListener('click', function clickFullScreenBtn(){
    graphWrapper.classList.toggle('fullScreen');
})


function graphControlPanelBtnsGroup(group) {
    if (group === 1) {
        for (let idx = 0; idx < graphControlPanel.childNodes.length; idx += 1) {
           if(idx < graphControlPanel.childNodes.length / 2 ) {
               graphControlPanel.children[idx].classList.add('hidden')
            } else {
                graphControlPanel.children[idx].classList.remove('hidden');
            }
         }   
    } else if (group === 2) {
        for (let idx = 0; idx < graphControlPanel.childNodes.length; idx += 1) {
            if(idx < graphControlPanel.childNodes.length / 2 ) {
                graphControlPanel.children[idx].classList.remove('hidden')
             } else {
                 graphControlPanel.children[idx].classList.add('hidden');
             }
          }  
    }
}


// for (let index = 0; index < graphControlPanel.childNodes.length; index += 1) {
//         graphControlPanel.children[index].addEventListener('click', function activeBtn() {
//             if (!this.classList.contains('active')) {
//                 graphControlPanelDisactive();
//                 this.classList.add('active');
//             }
//         });
// }

graphControlPanelDataBtn.addEventListener('click', function clickGraphControlPanelDataBtn(){
    if(this.checked) {
        graphControlPanelBtnsGroup(1);
    } else {
        graphControlPanelBtnsGroup(2);
    }
})



export {myChart, graphConfig, graphControlPanel, graphWrapper};