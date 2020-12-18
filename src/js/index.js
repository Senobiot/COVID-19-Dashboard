import '../css/reset.css';
import '../css/style.css';
import '../css/style.scss';
import '../css/style_graph.scss';
import '../css/style_list.scss';
<<<<<<< HEAD
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
=======
// import '../css/style_map.scss';
import '../css/style_totals.scss'
// import '../../node_modules/leaflet/dist/leaflet.css'
// import '../../node_modules/leaflet/dist/leaflet'
import Chart from '../../node_modules/chart.js/dist/Chart';
import './header';
import './table_total';
import './country_panel';
// import './map';
>>>>>>> 12b5af1c3017fcb2cfefd9eec662a6634f3db97f

let todayData = '';
const statistics = new CreateStatistics(document.body);
let isTotal = false;

// Получаем total статистику
const getTotalData = async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false');
  todayData = await response.json();
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
      const dataKey = currentLi.dataset.key;
      const dataIndex = Number(currentLi.dataset.index);
      statistics.setCurrentProperty(dataKey, dataIndex);
      statistics.switchToggle.dataset.index = dataIndex;
    } else if (item.tagName === 'INPUT') {
      let dataIndex = Number(item.closest('.switch__statistics').dataset.index);
      if (isTotal) {
        isTotal = false;
        statistics.generateListStatistics(todayData, 7793895016, isTotal);
        if (dataIndex > 5) dataIndex -= 6;
        statistics.setCurrentData(dataIndex);
      } else {
        isTotal = true;
        statistics.generateListStatistics(todayData, 7793895016, isTotal);
        if (dataIndex < 6) dataIndex += 6;
        statistics.setCurrentData(dataIndex);
      }
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
  statistics.generateListStatistics(todayData, 7793895016, isTotal);
  addHandlerClickStatistics();
};
initApp();
