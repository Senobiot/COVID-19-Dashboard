export default class WorldMap {
  constructor() {
    this.countriesInfo = null;
    this.dataAttributes = ['todayCases', 'todayDeaths', 'todayRecovered', 'cases', 'deaths', 'recovered'];
    this.infoToRender = ['Daily confirmed', 'Daily deaths', 'Daily recovered', 'Summary confirmed', 'Summary deaths', 'Summary recovered', 'Daily confirmed per 100k', 'Daily deaths per 100k', 'Daily recovered per 100k', 'Summary confirmed per 100k', 'Summary deaths per 100k', 'Summary recovered per 100k'];
    this.colorClass = ['red', 'purple', 'white', 'orange', 'green', 'blue', 'mint', 'pink', 'yellow', 'brown', 'electric', 'violet'];
    this.excludeCountries = ['AIA', 'ABW', 'BMU', 'VGB', 'BES', 'JEY', 'CUW', null, 'FLK', 'FRO', 'GUF', 'PYF', 'GIB', 'GRL',
      'GLP', 'VAT', 'HKG', 'IMN', 'MAC', 'MTQ', 'MYT', 'MSR', 'MMR', 'NCL', 'PSE', 'REU', 'MAF', 'SPM',
      'SXM', 'BLM', 'TCA', 'WLF', 'ESH', 'CYM'];
  }

  generateLayout() {
    this.mapWrapper = document.createElement('div');
    this.mapWrapper.classList.add('map-wrapper');
    this.mapWrapper.id = 'map';
    document.body.appendChild(this.mapWrapper);
    const southWest = L.latLng(-89.98155760646617, -180);
    const northEast = L.latLng(89.99346179538875, 180);

    const bounds = L.latLngBounds(southWest, northEast);
    const layer = new L.TileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 6,
      minZoom: 1,
      maxBoundsViscocity: 0.5,
      opacity: 0.8,
    });
    const simpleLayer = new L.TileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
      minZoom: 1,
      maxZoom: 6,
      opacity: 0,
      fadeAnimation: true,
      zoomAnimation: true,
      ext: 'png',
      maxBoundsViscocity: 0.5,
      dragging: false
    });
    const mapOptions = {
      center: bounds.getCenter(),
      zoom: 1,
      layers: [layer],
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
      opacity: 1,
    };
    this.map = new L.map('map', mapOptions);
    this.map.setView([31.505, 28.09], 1);
    const baseMaps = {
      "DAY": simpleLayer,
      'NIGHT': layer
    };
    L.control.layers(baseMaps).addTo(this.map);
    this.addButtons();
    this.generateMarkers(3);
    this.generateBorders();
  }

  generateMarkers(index = 0) {
    WorldMap.removeMarkers();
    WorldMap.setActiveButton(index);
    const choosenParam = index < 6 ? this.dataAttributes[index] : this.dataAttributes[index - 6];
    const maxValue = index < 6 ? WorldMap.countMaxValue(choosenParam, this.countriesInfo) : WorldMap
      .countRelativeMaxValue(choosenParam, this.countriesInfo);
    const text = this.infoToRender[index];
    const colorsClass = this.colorClass[index];
    this.generateLegend(index, maxValue, colorsClass);
    this.countriesInfo.forEach((el) => {
      let numbers = el[choosenParam];
      if (index > 5) {
        if (el.population) {
          numbers = Number((el[choosenParam] / (el.population / 100000)).toFixed(2));
        } else {
          numbers = 'exclude';
        }
      }
      if (this.excludeCountries.includes(el.countryInfo.iso3)) {
        numbers = 'exclude';
      }
      if (numbers !== 'exclude') {
        const elClass = WorldMap.countMarkerClass(numbers, maxValue);
        this.createMarker(el.countryInfo.lat, el.countryInfo.long, el.country, elClass, colorsClass,
          el.countryInfo.iso2, el.countryInfo.iso3, text, numbers);
      }
    });
  }

  createMarker(lat, long, country, elClass, colorsClass, iso2, iso3, text, numbers) {
    const element = `<div class="icon-marker ${elClass} ${colorsClass}" data-iso2=${iso2} data-iso3=${iso3} data-lat=${lat} data-long=${long}>
      <div class="icon-marker-tooltip">
        <div class="icon-tooltip-title">
        <h2>${country}</h2>
        <img class="icon-tooltip-flag" src="https://www.countryflags.io/${iso2}/shiny/64.png" alt="Country flag">
        </div>
        <p><strong>${text}:</strong> ${new Intl.NumberFormat('ru-RU').format(numbers)}</p>
      </div>
    </div>`;
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
  }

  static removeMarkers() {
    const allMarkers = document.querySelectorAll('.map-marker');
    if (allMarkers.length) {
      allMarkers.forEach((el) => {
        el.remove();
      });
    }
  }

  static setActiveButton(index) {
    const activeBtn = document.querySelector('.active-map');
    if (activeBtn) {
      activeBtn.classList.remove('active-map');
    }
    const allButtons = document.querySelectorAll('.map-buttons-item');
    allButtons.item(index).classList.add('active-map');
  }

  addButtons() {
    const buttonElement = document.createElement('div');
    this.mapWrapper.appendChild(buttonElement);
    buttonElement.classList.add('map-buttons-list');
    this.infoToRender.forEach((el, ind) => {
      const listItem = document.createElement('button');
      listItem.classList.add('map-buttons-item');
      listItem.dataset.index = ind;
      listItem.textContent = `${el}`;
      buttonElement.appendChild(listItem);
    });
    const expandButton = document.createElement('button');
    this.mapWrapper.appendChild(expandButton);
    expandButton.classList.add('expand-map-button');
    expandButton.addEventListener('click', this.expandFullScreen.bind(this));
    const legendButton = document.createElement('button');
    this.mapWrapper.appendChild(legendButton);
    legendButton.classList.add('legend-map-button');
    legendButton.addEventListener('click', this.expandLegend.bind(this));
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

  getСoordinates(buttonIso) {
    let coordinates = null;
    this.countriesInfo.forEach((el) => {
      const countryIso = el.countryInfo.iso2;
      if (buttonIso === countryIso) {
        coordinates = [el.countryInfo.lat, el.countryInfo.long];
      }
    });
    return coordinates;
  }

  showChoosenCountry(buttonIso) {
    const countryCoordinates = this.getСoordinates(buttonIso);
    const allMarkers = document.querySelectorAll('.icon-marker');
    const el = document.querySelector('.hover');
    if (el) {
      el.classList.remove('hover');
    }
    if (allMarkers.length) {
      allMarkers.forEach((el) => {
        if (el.dataset.iso2 === buttonIso) {
          el.classList.add('hover');
        }
      });
    }
    if (countryCoordinates) {
      this.map.flyTo(countryCoordinates, 5);
    }
  }

  changeView(buttonIso) {
    const countryCoordinates = this.getСoordinates(buttonIso);
    if (countryCoordinates) {
      this.map.flyTo(countryCoordinates, 5);
    }
  }

  static countMaxValue(param, cInfo) {
    const arr = [];
    cInfo.forEach((val) => {
      if (val[param]) {
        arr.push(val[param]);
      }
    });
    arr.sort((a, b) => a - b);
    arr.splice(arr.length - 4);
    return arr[arr.length - 1];
  }

  static countRelativeMaxValue(param, cInfo) {
    const arr = [];
    cInfo.forEach((val) => {
      if (val.population) {
        const res = Number((val[param] / (val.population / 100000)).toFixed(2));
        arr.push(res);
      }
    });
    arr.sort((a, b) => a - b);
    arr.splice(arr.length - 4);
    return arr[arr.length - 1];
  }

  static countMarkerClass(param, maxValue) {
    const max = WorldMap.countIntervalsMax(maxValue);
    const interval = max / 5;
    if (param >= max - interval) {
      return 'icon-size-xl';
    } if (param <= max - interval && param >= max - (interval * 2)) {
      return 'icon-size-l';
    } if (param <= max - (interval * 2) && param >= max - (interval * 3)) {
      return 'icon-size-m';
    } if (param <= max - (interval * 3) && param >= max - (interval * 4)) {
      return 'icon-size-s';
    }
    return 'icon-size-xs';
  }

  static countIntervalsMax(max) {
    const deg = Math.round(max).toString().length - 1;
    const maxPar = (Math.round(max / (10 ** deg))) * (10 ** deg);
    return maxPar;
  }

  expandFullScreen() {
    this.mapWrapper.classList.toggle('fullscreen-map');
    const currentZoom = this.map.getZoom();
    this.map._onResize();
    if (currentZoom < 2) {
      this.map.flyTo([55.660363, 18.532167], 2);
    }
  }

  generateLegend(index, maxValue, colorsClass) {
    if (this.legendContainer) {
      this.legendContainer.remove();
    }
    const sizeClass = ['icon-size-xl', 'icon-size-l', 'icon-size-m', 'icon-size-s', 'icon-size-xs'];
    this.legendContainer = document.createElement('table');
    this.mapWrapper.appendChild(this.legendContainer);
    this.legendContainer.classList.add('map-legend');
    this.legendContainer.classList.add('hidden-legend');

    const legentTitle = document.createElement('thead');
    legentTitle.textContent = `${this.infoToRender[index]}`;
    this.legendContainer.appendChild(legentTitle);
    legentTitle.classList.add('map-legend-title');

    const interval = WorldMap.countIntervalsMax(maxValue) / 5;

    let max = WorldMap.countIntervalsMax(maxValue) - interval;

    sizeClass.forEach((el) => {
      const legendElement = document.createElement('tr');
      legendElement.classList.add('map-legend-item');
      this.legendContainer.appendChild(legendElement);

      const pointContainer = document.createElement('td');
      pointContainer.classList.add('map-legend-point');
      legendElement.appendChild(pointContainer);

      const newPoint = document.createElement('span');
      pointContainer.appendChild(newPoint);
      newPoint.classList.add(`${colorsClass}`);
      newPoint.classList.add(`${el}`);
      newPoint.classList.add('icon-marker');

      const newInterval = document.createElement('td');
      legendElement.appendChild(newInterval);
      newInterval.classList.add('map-legend-interval');
      newInterval.textContent = `> ${new Intl.NumberFormat('ru-RU').format(max)}`;
      if (index === '7') {
        max = (max - interval).toFixed(1);
        if (max <= 0) {
          max = 0;
        }
      } else {
        max -= interval;
      }
    });

    const closeBtn = document.createElement('button');
    this.legendContainer.appendChild(closeBtn);
    closeBtn.classList.add('map-legend-close');
    closeBtn.addEventListener('click', this.hideLegend.bind(this));
  }

  expandLegend() {
    this.legendContainer.classList.toggle('hidden-legend');
  }

  hideLegend() {
    if (this.legendContainer) {
      this.legendContainer.classList.add('hidden-legend');
    }
  }

  generateBorders() {
    d3.json(('borders.json'), (json) => {
      function onEachFeature(feature, layer) {
        layer.on({
          click: onCountryClick,
          mouseover: onCountryHighLight,
          mouseout: onCountryMouseOut,
        });
      }
      const geojson = L.geoJson(json, {
        onEachFeature,
        style,
      }).addTo(this.map);
      function onCountryMouseOut(e) {
        geojson.resetStyle(e.target);
        const el = document.querySelector('.hover');
        if (el) {
          el.classList.remove('hover');
        }
      }
      function onCountryClick(e) {
        const countryCode = e.target.feature.properties.ISO2;
        const allMarkers = document.querySelectorAll('.icon-marker');
        if (allMarkers.length) {
          allMarkers.forEach((el) => {
            if (el.dataset.iso2 === countryCode) {
              el.click();
            }
          });
        }
      }
      function onCountryHighLight(e) {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7,
        });
        if (!L.Browser.ie && !L.Browser.opera) {
          layer.bringToFront();
        }
        const countryCode = e.target.feature.properties.ISO2;
        const allMarkers = document.querySelectorAll('.icon-marker');
        if (allMarkers.length) {
          allMarkers.forEach((el) => {
            if (el.dataset.iso2 === countryCode) {
              el.classList.add('hover');
            }
          });
        }
      }

      function style(feature) {
        return {
          fillColor: '#E3E3E3',
          weight: 1,
          opacity: 0.4,
          color: 'white',
          fillOpacity: 0.3,
        };
      }
    });
  }
}
