export default class WorldMap {
  constructor() {
    this.worldInfo = null;
    this.countriesInfo = null;
    this.dataAttributes = ['todayCases', 'todayDeaths', 'todayRecovered', 'cases', 'deaths', 'recovered'];
    this.infoToRender = ['Daily confirmed', 'Daily deaths', 'Daily recovered', 'Summary confirmed', 'Summary deaths', 'Summary recovered', 'Daily confirmed per 100k', 'Daily deaths per 100k', 'Daily recovered per 100k', 'Summary confirmed per 100k', 'Summary deaths per 100k', 'Summary recovered per 100k'];
  }

  handleClick(e) {

    const { lat } = e.target.dataset;
    const { long } = e.target.dataset;
    if (lat && long) {
      this.changeView(lat, long);
    }

    const { index } = e.target.dataset;
    if (index) {
      document.querySelector('.active-map').classList.remove('active-map');
      e.target.classList.add('active-map');
    }
    this.removeMarkers();
    this.generateMarkers(this.countriesInfo, index);
  }

  generateLayout() {
    this.mapWrapper = document.createElement('div');
    this.mapWrapper.classList.add('map-wrapper');
    this.mapWrapper.id = 'map';
    document.body.appendChild(this.mapWrapper);
    const mapOptions = {
      center: [9.103241, -25.031420],
      zoom: 1,
      worldCopyJump: true,
    };
    this.map = new L.map('map', mapOptions);
    const Layer = new L.TileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 6,
      minZoom: 1,
    });
    Layer.addTo(this.map);
    this.generateMarkers(this.countriesInfo, 0);
    this.addButtons();
    this.mapWrapper.addEventListener('click', this.handleClick.bind(this));
  }

  generateMarkers(todayData, index = 0) {
    const choosenParam = index < 6 ? this.dataAttributes[index] : this.dataAttributes[index - 6];
    const borderValues = this.countBorderlineValues(choosenParam, todayData);
    const text = this.infoToRender[index];
    todayData.forEach((el) => {
      const elClass = this.countMarkerClass(el[choosenParam], borderValues);
      const numbers = index < 6 ? el[choosenParam] : (Number((el[choosenParam] / (el.population / 100000)).toFixed(2)));
      this.createMarker(el.countryInfo.lat, el.countryInfo.long, el.country, elClass, el.countryInfo.iso2, el.countryInfo.iso3, text, numbers);
    });
  }

  createMarker(lat, long, country, elClass, iso2, iso3, text, numbers) {
    const element = `<span class="icon-marker ${elClass}" data-iso2=${iso2} data-iso3=${iso3} data-lat=${lat} data-long=${long}>
      <span class="icon-marker-tooltip">
        <h2>${country}</h2>
        <p><strong>${text}:</strong> ${new Intl.NumberFormat('ru-RU').format(numbers)}</p>
      </span>
    </span>`;
    const myIcon = L.divIcon({
      html: element,
      iconSize: [20, 20],
      className: 'map-marker',
    });
    const markerOptions = {
      clickable: true,
      icon: myIcon,
    };
    const marker = new L.Marker([lat, long], markerOptions);
    marker.addTo(this.map);
    marker.bindPopup(`<strong>${country}</strong><br/><strong>${text}</strong>: ${new Intl.NumberFormat('ru-RU').format(numbers)}`);
  }

  removeMarkers() {
    const allMarkers = document.querySelectorAll('.map-marker');
    allMarkers.forEach((el) => {
      el.remove();
    });
  }

  addButtons() {
    const listElement = document.createElement('div');
    this.mapWrapper.appendChild(listElement);
    listElement.classList.add('map-buttons-list');
    this.infoToRender.forEach((el, ind) => {
      const listItem = document.createElement('button');
      listElement.appendChild(listItem);
      listItem.classList.add('map-buttons-item');
      if (ind === 0) {
        listItem.classList.add('active-map');
      }
      listItem.dataset.index = ind;
      listItem.textContent = `${el}`;
    });
    const expandButton = document.createElement('button');
    this.mapWrapper.appendChild(expandButton);
    expandButton.classList.add('expand-map-button');
    expandButton.addEventListener('click', this.expandFullScreen.bind(this));
  }

  renderMap() {
    const getCountriesData = async () => {
      const responseCountries = await fetch('https://disease.sh/v3/covid-19/countries/');
      this.countriesInfo = await responseCountries.json();
    };
    const initApp = async () => {
      await getCountriesData();
      this.generateLayout();
    };
    initApp();
  }

  changeView(lat, long) {
    this.map.flyTo([lat, long], 5);
  }

  resetView() {
    this.map.flyTo([9.103241, -25.031420], 1);
  }

  countBorderlineValues(param, cInfo) {
    const arr = [];
    cInfo.forEach((val) => {
      arr.push(val[param]);
    });
    arr.sort((a, b) => a - b);
    arr.splice(arr.length - 4);
    arr.splice(1, arr.length - 2);
    return arr;
  }

  countMarkerClass(param, borderVal) {
    const max = borderVal[1];
    const min = borderVal[0];
    const interval = (max - min) / 5;
    if (param >= max - interval) {
      return 'icon-size-xl';
    } if (param <= max - interval && param >= max - (interval * 2)) {
      return 'icon-size-l';
    } if (param <= max - (interval * 2) && param >= max - (interval * 3)) {
      return 'icon-size-m';
    } if (param <= max - (interval * 3) && param >= max - (interval * 4)) {
      return 'icon-size-s';
    } if (param <= max - (interval * 4) && param >= min) {
      return 'icon-size-xs';
    }
  }

  expandFullScreen() {
    this.mapWrapper.classList.toggle('fullscreen');
    const currentZoom = this.map.getZoom();
    if (currentZoom < 2) {
      this.map.flyTo([55.660363, 18.532167], 2);
    }
  }
}
