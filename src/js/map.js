export default class WorldMap {
  constructor() {
    this.worldInfo;
    this.countriesInfo;
  };
  renderMap(obj) {

  };
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
  };
  generateMarkers() {
    console.log(this.countriesInfo[0]);
    console.log(this.countriesInfo);
    this.countriesInfo.forEach(el => {
      this.createMarker(el.countryInfo.lat, el.countryInfo.long, el.country, el.countryInfo.iso2, el.countryInfo.iso3, el.cases, el.deaths, el.recovered);
    });
  };
  createMarker(lat, long, country, iso2, iso3, cases, deaths, recovered) {
    const element = `<span class="icon-marker" data-iso2=${iso2} data-iso3=${iso3}>
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
      className: 'map-marker'
    });
    const markerOptions = {
      clickable: true,
      icon: myIcon
    };
    const marker = new L.Marker([lat, long], markerOptions);
    marker.addTo(this.map);
    marker.bindPopup(`${country, cases}`).openPopup();
  };
  changeZoom() {

  };
  showInfo() {

  };
  hideInfo() {

  };
}