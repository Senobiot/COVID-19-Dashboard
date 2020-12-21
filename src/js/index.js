import '../css/reset.css';
import '../css/style.css';
import '../css/style.scss';
import '../css/style_graph.scss';
import '../css/style_list.scss';
import '../css/style_map.scss';
import '../css/style_table.scss';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet/dist/leaflet';
import './header';
import './table_total';
import {
  sortBtsEvent, countriesList, sortBtns, searchResults,
} from './country_panel';
import { graphBtnExportEvents, graphControlPanel } from './graph';
import './map';
// import '../css/style_map.scss';
import '../css/style_totals.scss';
import CreateStatistics from './table-statistics';

let dataCurrentRegion = '';

let population = 7793895016;
const statistics = new CreateStatistics(document.body);
let isTotal = false; // Флаг выбора расчета показателей на все население или 100К

const getDataCurrentCountry = async (country) => {
  const response = await fetch(`https://disease.sh/v3/covid-19/countries/${country}?yesterday=false&twoDaysAgo=false&strict=true`);
  dataCurrentRegion = await response.json();
};

const createStatisticsCurrentCountry = async (iso2Country) => {
  await getDataCurrentCountry(iso2Country);
  population = dataCurrentRegion.population;
  const { country } = dataCurrentRegion;
  statistics.generateListStatistics(dataCurrentRegion, Number(population), isTotal);
  const dataIndex = Number(statistics.switchToggle.dataset.index);
  statistics.setCurrentData(dataIndex);
  statistics.setCurrentCountry(iso2Country, country);
};

// Получаем total статистику
const getTotalData = async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false');
  dataCurrentRegion = await response.json();
};

// Обрабока клика по таблице статистики
const addHandlerClickStatistics = () => {
  statistics.wrapperTable.addEventListener('mouseup', (e) => {
    const item = e.target;
    if (item.tagName === 'SPAN' || item.tagName === 'LI') {
      let currentLi = '';
      if (item.tagName === 'SPAN') {
        currentLi = item.closest('li');
      } else if (item.tagName === 'LI') {
        currentLi = item;
      }
      const dataIndex = Number(currentLi.dataset.index);
      sortBtsEvent(dataIndex);
      graphBtnExportEvents(dataIndex);
      statistics.setCurrentProperty(dataIndex);
      statistics.switchToggle.dataset.index = dataIndex;
    } else if (item.tagName === 'INPUT') {
      let dataIndex = Number(item.closest('.switch__statistics').dataset.index);
      if (isTotal) {
        isTotal = false;
        statistics.generateListStatistics(dataCurrentRegion, Number(population), isTotal);
        if (dataIndex > 5) dataIndex -= 6;
      } else {
        isTotal = true;
        statistics.generateListStatistics(dataCurrentRegion, Number(population), isTotal);
        if (dataIndex < 6) dataIndex += 6;
      }
      statistics.switchToggle.dataset.index = dataIndex;
      statistics.setCurrentData(dataIndex);
    }
  });
};

const statisticsExportEvents = (index) => {
  if (index > 5) {
    isTotal = true;
  } else {
    isTotal = false;
  }
  statistics.generateListStatistics(dataCurrentRegion, Number(population), isTotal);
  statistics.switchToggleExportEvent(index);
};

const createStatisticsFirstOnload = () => {
  const country = 'GLOBAL';
  const srcIconCountry = './img/world.png';
  const currentProperty = 'Confirmed';
  statistics.createTableStatistics(srcIconCountry, country, currentProperty);
};

// Инициализация приложения
const initApp = async () => {
  createStatisticsFirstOnload();
  await getTotalData();
  statistics.createContinents();
  statistics.generateListStatistics(dataCurrentRegion, population, isTotal);
  addHandlerClickStatistics();
};
initApp();

countriesList.addEventListener('click', (event) => {
  const iso = event.target.getAttribute('data-iso2') || event.target.closest('div').getAttribute('data-iso2');
  return iso ? createStatisticsCurrentCountry(iso) : event.stopImmediatePropagation();
});

sortBtns.addEventListener('click', (event) => {
  const idx = event.target.tagName === 'BUTTON' ? Array.from(event.target.parentNode.children).indexOf(event.target) : undefined;
  if (idx >= 0) {
    statisticsExportEvents(idx);
    graphBtnExportEvents(idx);
  }
  event.stopImmediatePropagation();
});

graphControlPanel.addEventListener('click', (event) => {
  const idx = event.target.tagName === 'BUTTON' ? Array.from(event.target.parentNode.children).indexOf(event.target) : undefined;
  if (idx >= 0) {
    statisticsExportEvents(idx);
    sortBtsEvent(idx);
  }
  event.stopImmediatePropagation();
});

searchResults.addEventListener('click', (event) => {
  const iso = event.target.getAttribute('data-iso2') || undefined;
  return iso ? createStatisticsCurrentCountry(iso) : event.stopImmediatePropagation();
});

export { createStatisticsCurrentCountry, statisticsExportEvents };
