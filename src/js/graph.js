import Chart from '../../node_modules/chart.js/dist/Chart';

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
    }],
  },
  options: {
    title: {
      display: true,
      text: 'Global',
    },
    tooltips: {
      callbacks: {
        label(tooltipItem) {
          return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
      },
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback(value) {
            return String(value).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
          },
        },
      }],
    },
  },
};

const graphWrapper = document.createElement('div');
graphWrapper.classList.add('graphWrapper', 'loading');

const graph = document.createElement('canvas');
graph.width = '100%';
graph.height = 'auto';
graph.id = 'myChart';

const graphControlPanel = document.createElement('div');
graphControlPanel.classList.add('graphControlPanel');

const graphControlPanelTypeBtn = document.createElement('input');
graphControlPanelTypeBtn.type = 'checkbox';
graphControlPanelTypeBtn.classList.add('graphSwitcherType');

const graphControlPanelDataBtn = document.createElement('input');
graphControlPanelDataBtn.type = 'checkbox';
graphControlPanelDataBtn.classList.add('graphSwitcherData');

const fullScreenBtn = document.createElement('div');
fullScreenBtn.classList.add('fullScreenGraph');

graphWrapper.appendChild(graph);
graphWrapper.appendChild(graphControlPanelTypeBtn);
graphWrapper.appendChild(graphControlPanelDataBtn);
graphWrapper.appendChild(graphControlPanel);
graphWrapper.appendChild(fullScreenBtn);

document.body.appendChild(graphWrapper);

const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, graphConfig);

for (let i = 1; i <= 12; i += 1) {
  const graphControlPanelCaseBtn = document.createElement('button');
  graphControlPanelCaseBtn.classList.add('graphDataBtn');
  if ((i < 4 || i > 6) && i < 10) {
    graphControlPanelCaseBtn.textContent = 'Daily';
  } else {
    graphControlPanelCaseBtn.textContent = 'Summary';
  }
  if (i === 1 || i === 4 || i === 7 || i === 10) {
    graphControlPanelCaseBtn.textContent += ' confirmed';
    graphControlPanelCaseBtn.setAttribute('data-colour', '#675d04');
  } else if (i === 2 || i === 5 || i === 8 || i === 11) {
    graphControlPanelCaseBtn.textContent += ' deaths';
    graphControlPanelCaseBtn.setAttribute('data-colour', '#842727');
  } else {
    graphControlPanelCaseBtn.textContent += ' recovered';
    graphControlPanelCaseBtn.setAttribute('data-colour', '#1b481b');
  }

  if (i > 6) {
    graphControlPanelCaseBtn.classList.add('hidden');
    graphControlPanelCaseBtn.textContent += ' per 100k';
  }
  graphControlPanel.appendChild(graphControlPanelCaseBtn);
}

function graphBtsDisactive() {
  for (let idx = 0; idx < graphControlPanel.childNodes.length; idx += 1) {
    graphControlPanel.children[idx].classList.remove('active');
  }
}

function graphBtsEvent(changeCountry) {
  if (!this.classList.contains('active') || changeCountry) {
    graphBtsDisactive();
    this.classList.add('active');
    const currCountry = localStorage.getItem('currentCountry');

    const dates = currCountry === 'Global' ? JSON.parse(localStorage.getItem('globalDates'))
      : JSON.parse(localStorage.getItem('selectedCountryDates'));
    const dataSets = currCountry === 'Global' ? JSON.parse(localStorage.getItem(`Global ${this.textContent}`))
      : JSON.parse(localStorage.getItem(`${this.textContent}`));

    graphConfig.data.labels = dates;
    graphConfig.data.datasets[0].data = dataSets;
    graphConfig.options.title.text = currCountry;

    graphConfig.data.datasets[0].label = this.textContent;
    graphConfig.data.datasets[0].backgroundColor = this.getAttribute('data-colour');
    graphConfig.data.datasets[0].borderColor = this.getAttribute('data-colour');

    myChart.update();
    myChart.update();
  }
}

function graphControlPanelBtnsGroup(group) {
  if (group === 1) {
    for (let idx = 0; idx < graphControlPanel.childNodes.length; idx += 1) {
      if (idx < graphControlPanel.childNodes.length / 2) {
        graphControlPanel.children[idx].classList.add('hidden');
      } else {
        graphControlPanel.children[idx].classList.remove('hidden');
      }
    }
  } else if (group === 2) {
    for (let idx = 0; idx < graphControlPanel.childNodes.length; idx += 1) {
      if (idx < graphControlPanel.childNodes.length / 2) {
        graphControlPanel.children[idx].classList.remove('hidden');
      } else {
        graphControlPanel.children[idx].classList.add('hidden');
      }
    }
  }
}

for (let index = 0; index < graphControlPanel.childNodes.length; index += 1) {
  graphControlPanel.children[index].draw = graphBtsEvent;
  graphControlPanel.children[index].addEventListener('click', graphBtsEvent);
  graphControlPanel.children[index].addEventListener('click', () => {
    localStorage.setItem('currentDataNumber', index);
  });
}

const graphBtnExportEvents = function graphBtnExportEventsClick(number, changeCountry) {
  if (number < 6 && graphControlPanelDataBtn.checked) {
    graphControlPanelDataBtn.checked = false;
    graphControlPanelBtnsGroup(2);
  } else if (number > 5 && !graphControlPanelDataBtn.checked) {
    graphControlPanelBtnsGroup(1);
    graphControlPanelDataBtn.checked = true;
  }
  graphControlPanel.children[number].draw(changeCountry);
};

graphControlPanelTypeBtn.addEventListener('click', function clickGraphControlPanelTypeBtn() {
  if (this.checked) {
    graphConfig.type = 'line';
    myChart.update();
  } else {
    graphConfig.type = 'bar';
    myChart.update();
  }
});

fullScreenBtn.addEventListener('click', () => {
  graphWrapper.classList.toggle('fullScreen');
});

graphControlPanelDataBtn.addEventListener('click', function clickGraphControlPanelDataBtn() {
  if (this.checked) {
    graphControlPanelBtnsGroup(1);
  } else {
    graphControlPanelBtnsGroup(2);
  }
});

export { graphWrapper, graphBtnExportEvents, graphControlPanel };
