import '../css/reset.css';
import '../css/style.css';
import '../css/style.scss';
import '../css/style_graph.scss';
import '../css/style_list.scss';
import '../css/style_map.scss';
import '../css/style_totals.scss';
import '../../node_modules/leaflet/dist/leaflet.css'
import '../../node_modules/leaflet/dist/leaflet'
import Chart from '../../node_modules/chart.js/dist/Chart';
import './header';
import './table_total';
import './country_panel';
import WorldMap from './map';

let worldInfo = '';
let countriesInfo = '';
let newMap = new WorldMap();
const getTotalData = async () => {
    const responseCountries = await fetch('https://disease.sh/v3/covid-19/countries/');
    countriesInfo = await responseCountries.json();
    const responseWorld = await fetch('https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false');
    worldInfo = await responseWorld.json();
};

const initApp = async () => {
    await getTotalData();
    newMap.generateLayout(worldInfo, countriesInfo);
  };
  initApp();
