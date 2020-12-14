const mapWrapper = document.createElement('div');
mapWrapper.id = 'map';
document.body.appendChild(mapWrapper);


// let mapOptions = {
//     center: [0, 0],
//     zoom: 0
//  }

 const mymap = L.map('map').setView([51.505, -0.09], 2);

 const layer = new L.TileLayer('http://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png');
         
 mymap.addLayer(layer);   
 const marker = L.marker([17.385044, 78.486671]);
         
 // Adding marker to the map
 marker.addTo(mymap);
 marker.bindPopup('Hi Welcome to Tutorialspoint').openPopup();

 const zoomOptions = {
    zoomInText: '1',
    zoomOutText: '0',
 };
 const zoom = L.control.zoom(zoomOptions);   // Creating zoom control
 zoom.addTo(mymap);   // Adding zoom control to the map