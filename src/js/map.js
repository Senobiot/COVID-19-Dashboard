const mapWrapper = document.createElement('div');
mapWrapper.id = 'map';
document.body.appendChild(mapWrapper);


// let mapOptions = {
//     center: [0, 0],
//     zoom: 0
//  }

let mymap = L.map('map').setView([51.505, -0.09], 2);

const layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

mymap.addLayer(layer);
const marker = L.marker([17.385044, 78.486671]);

// // Adding marker to the map
// marker.addTo(mymap);
// marker.bindPopup('Hi Welcome to Tutorialspoint').openPopup();

const zoomOptions = {
  zoomInText: '1',
  zoomOutText: '0',
};
const zoom = L.control.zoom(zoomOptions);   // Creating zoom control
zoom.addTo(mymap);   // Adding zoom control to the map

function mapEffect({ leafletElement: mymap } = {}) {
  let response;



  const { data = [] } = response;

  const hasData = Array.isArray(data) && data.length > 0;

  if ( !hasData ) return;

  const geoJson = {
    type: 'FeatureCollection',
    features: data.map((country = {}) => {
      const { countryInfo = {} } = country;
      const { lat, long: lng } = countryInfo;
      return {
        type: 'Feature',
        properties: {
        ...country,
        },
        geometry: {
          type: 'Point',
          coordinates: [ lng, lat ]
        }
      }
    })
  }
  const geoJsonLayers = new L.GeoJSON(geoJson, {
    pointToLayer: (feature = {}, latlng) => {
      const { properties = {} } = feature;
      let updatedFormatted;
      let casesString;
  
      const {
        country,
        updated,
        cases,
        deaths,
        recovered
      } = properties
  
      casesString = `${cases}`;
  
      if ( cases > 1000 ) {
        casesString = `${casesString.slice(0, -3)}k+`
      }
  
      if ( updated ) {
        updatedFormatted = new Date(updated).toLocaleString();
      }
  
      const html = `
        <span class="icon-marker">
          <span class="icon-marker-tooltip">
            <h2>${country}</h2>
            <ul>
              <li><strong>Confirmed:</strong> ${cases}</li>
              <li><strong>Deaths:</strong> ${deaths}</li>
              <li><strong>Recovered:</strong> ${recovered}</li>
              <li><strong>Last Update:</strong> ${updatedFormatted}</li>
            </ul>
          </span>
          ${ casesString }
        </span>
      `;
  
      return L.marker( latlng, {
        icon: L.divIcon({
          className: 'icon',
          html
        }),
        riseOnHover: true
      });
    }
  });
  mymap.addLayer(geoJsonLayers);
  // geoJsonLayers.addTo(mymap);
}

mapEffect(mymap);
