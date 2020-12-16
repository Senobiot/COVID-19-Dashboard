import '../css/reset.css';
import '../css/style.css';
import '../css/style.scss';
import '../css/style_graph.scss';
import '../css/style_list.scss';
import '../css/style_map.scss';
import '../css/style_totals.scss';
import '../css/style_table.scss';
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet/dist/leaflet';
import Chart from '../../node_modules/chart.js/dist/Chart';
import './header';
import './table_total';
import './country_panel.js';
import './map';
import CreateStatistics from './table-statistics';

let todayData = '';
const statistics = new CreateStatistics(document.body);

// Получаем total статистику
const getTotalData = async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false');
  todayData = await response.json();
};

// Обрабока клика по таблице статистики
const addHandlerClickStatistics = () => {
  statistics.list.addEventListener('mouseup', (e) => {
    const item = e.target;
    if (item.tagName === 'SPAN' || item.tagName === 'LI') {
      let currentLi = '';
      if (item.tagName === 'SPAN') {
        currentLi = item.closest('li');
      } else if (item.tagName === 'LI') {
        currentLi = item;
      }
      const property = currentLi.querySelector('span').innerText;
      const dataKey = currentLi.dataset.key;
      statistics.setCurrentData(property, todayData, dataKey);
    }
  });
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
  statistics.generateListStatistics(todayData);
  addHandlerClickStatistics();
};
initApp();
