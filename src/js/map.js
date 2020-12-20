export default class WorldMap {
  constructor() {
    this.worldInfo;
    this.countriesInfo;
    this.borderValues;
  };
  renderMap(obj) {

  };
  handleClick(e) {
    

  }
  generateLayout(wInfo, cInfo) {
    this.mapWrapper = document.createElement('div');
    this.mapWrapper.id = 'map';
    document.body.appendChild(this.mapWrapper);
    let mapOptions = {
      center: [9.103241, -25.031420],
      zoom: 1
    };
    this.map = new L.map('map', mapOptions);
    const layer = new L.TileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 6,
      minZoom: 1
    });
    layer.addTo(this.map);
    this.countriesInfo = cInfo;
    this.worldInfo = wInfo;
    this.generateMarkers();
    this.mapWrapper.addEventListener('click', this.handleClick);
  };
  generateMarkers() {
    console.log(this.countriesInfo[0]);
    this.borderValues = this.countBorderlineValues('cases', this.countriesInfo);
    this.countriesInfo.forEach(el => {
      const elClass = this.countMarkerClass(el.cases, this.borderValues);
      this.createMarker(el.countryInfo.lat, el.countryInfo.long, el.country, elClass, el.countryInfo.iso2, el.countryInfo.iso3, el.cases, el.deaths, el.recovered);
    });
  };
  createMarker(lat, long, country, elClass, iso2, iso3, cases, deaths, recovered) {
    const element = `<span class="icon-marker ${elClass}" data-iso2=${iso2} data-iso3=${iso3}>
      <span class="icon-marker-tooltip">
        <h2>${country}</h2>
        <ul>
          <li><strong>Confirmed:</strong> ${cases}</li>
          <li><strong>Deaths:</strong> ${deaths}</li>
          <li><strong>Recovered:</strong> ${recovered}</li>
        </ul>
      </span>
    </span>`;
    const myIcon = L.divIcon({
      html: element,
      iconSize: [20, 20],
      className: 'map-marker'
    });
    const markerOptions = {
      clickable: true,
      icon: myIcon
    };
    const marker = new L.Marker([lat, long], markerOptions);
    marker.addTo(this.map);
    marker.bindPopup(`${country, cases}`);
  };
  changeZoom() {

  };
  showInfo() {

  };
  hideInfo() {

  };
  countBorderlineValues(param, cInfo) {
    let arr = [];
    cInfo.forEach((val) => {
      arr.push(val[param]);
    });
    arr.sort((a, b) => a - b);
    console.log(arr);
    arr.splice(arr.length - 4);
    arr.splice(1, arr.length - 2);
    return arr;
  };
  countMarkerClass(param, borderVal) {
    const max = borderVal[1];
    const min = borderVal[0];
    const interval = (max - min) / 5;
    if (param >= max - interval) {
      return 'icon-size-xl';
    } else if (param <= max - interval && param >= max - (interval * 2)) {
      return 'icon-size-l';
    } else if (param <= max - (interval * 2) && param >= max - (interval * 3)) {
      return 'icon-size-m';
    } else if (param <= max - (interval * 3) && param >= max - (interval * 4)) {
      return 'icon-size-s';
    } else if (param <= max - (interval * 4) && param >= min) {
      return 'icon-size-xs';
    }
  };
}