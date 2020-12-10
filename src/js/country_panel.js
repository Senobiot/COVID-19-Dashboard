import {myChart, graphConfig} from './graph_1';
let countriesSelector = document.createElement('select');
countriesSelector.classList.add('selectCountry');
countriesSelector.size = 9;

let recieveDataBtns = document.createElement('div');
recieveDataBtns.classList.add('getDataBtnsWrapper')
let casesBtn = document.createElement('button');
let deathBtn = document.createElement('button');
let recoverBtn = document.createElement('button');
casesBtn.classList.add('casesBtn', 'getDataBtns');
deathBtn.classList.add('deathBtn', 'getDataBtns');
recoverBtn.classList.add('recoverBtn', 'getDataBtns');

casesBtn.textContent = 'cases';
deathBtn.textContent = 'deaths';
recoverBtn.textContent = 'recovers';

recieveDataBtns.appendChild(casesBtn);
recieveDataBtns.appendChild(deathBtn);
recieveDataBtns.appendChild(recoverBtn);

document.body.appendChild(recieveDataBtns);
document.body.appendChild(countriesSelector);


// ----------------------------------------------------get data covid-------------------
let countryDataArray;
async function getData(status, country, month, day) {
    let response = await fetch(
        `https://api.covid19api.com/total/country/${country}/status/${status}?from=2020-${month}-${day}T00:00:00Z&to=2020-${month}-${day}T23:59:59Z`);
    let data  = await response.json();
    countryDataArray.push(data[0].Cases);
    return data;       
};

let dataReceiveFromClick;
const lastDaysArray = ['31','29','31','30','31','30','31','31','30','31','30', '09'];
casesBtn.addEventListener('click', async ()=> {
    countryDataArray = [];
    for (let index = 1; index < 11; index++) {
        await getData('confirmed', dataReceiveFromClick, index < 10 ? '0' + index : index, lastDaysArray[index - 1]);
    }
    graphConfig.data.datasets[0].data = countryDataArray;
    graphConfig.options.title.text = `Total cases in the ${dataReceiveFromClick}`;
    myChart.update();
})

deathBtn.addEventListener('click', async ()=> {
    countryDataArray = [];
    for (let index = 1; index < 11; index++) {
        await getData('deaths', dataReceiveFromClick, index < 10 ? '0' + index : index, lastDaysArray[index - 1]);
    }
    graphConfig.data.datasets[0].data = countryDataArray;
    graphConfig.options.title.text = `Total deaths in the ${dataReceiveFromClick}`;
    myChart.update();
})

recoverBtn.addEventListener('click', async ()=> {
    countryDataArray = [];
    for (let index = 1; index < 11; index++) {
        await getData('recovered', dataReceiveFromClick, index < 10 ? '0' + index : index, lastDaysArray[index - 1]);
    }
    graphConfig.data.datasets[0].data = countryDataArray;
    graphConfig.options.title.text = `Total recovered in the ${dataReceiveFromClick}`;
    myChart.update();
})

// ------------------------------------get country population data ------------------------

async function getAllCountries() {
let response = await fetch(`https://restcountries.eu/rest/v2/all?fields=name;population;flag`)
let data  = await response.json();
return data;    
};

(async function countries () {
let data = await getAllCountries()
for (let index = 0; index < data.length; index++) {
    let options = document.createElement('option');
    options.textContent = data[index].name;
    if (index === 0) {
        options.selected = true;
    }
    options.addEventListener('click', function(){
        dataReceiveFromClick = this.textContent;
    })
    options.style.backgroundImage = `url(${data[index].flag})`;
    options.style.backgroundPosition = '0% 50%';
    options.style.backgroundSize = '40px';
    options.style.backgroundRepeat = 'no-repeat';
    countriesSelector.appendChild(options);   
}
})()