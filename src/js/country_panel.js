import {myChart, graphConfig, graphControlPanel, graphWrapper} from './graph';

const countriesModule = document.createElement('div');
countriesModule.classList.add('countriesModule');

const searchField = document.createElement('input');
searchField.type = 'search';
searchField.placeholder = 'Search country';
searchField.classList.add('countriesSearchField');

const countriesList = document.createElement('div');
countriesList.classList.add('countriesList');

const sortCountryListBtns = document.createElement('div');
sortCountryListBtns.classList.add('sortCountryListBtnsWrapper');

const sortCountryListBtnsTitle = document.createElement('div');
const countryBtn = document.createElement('button');
const confirmedBtn = document.createElement('button');
const deathBtn = document.createElement('button');
const recoverBtn = document.createElement('button');

sortCountryListBtnsTitle.classList.add('sortCountryListBtnsTitle');
countryBtn.classList.add('countrySortBtn', 'sortCountryListBtn');
confirmedBtn.classList.add('confirmedSortBtn', 'sortCountryListBtn');
deathBtn.classList.add('deathSortBtn', 'sortCountryListBtn');
recoverBtn.classList.add('recoverSortBtn', 'sortCountryListBtn');

sortCountryListBtnsTitle.textContent = 'Sort By:';
countryBtn.textContent = 'country';
countryBtn.setAttribute('sorted' , 'reverse');
confirmedBtn.textContent = 'confirmed';
confirmedBtn.setAttribute('sortedPast' , 'yes');
deathBtn.textContent = 'deaths';
recoverBtn.textContent = 'recovers';

sortCountryListBtns.appendChild(sortCountryListBtnsTitle);
sortCountryListBtns.appendChild(countryBtn);
sortCountryListBtns.appendChild(confirmedBtn);
sortCountryListBtns.appendChild(deathBtn);
sortCountryListBtns.appendChild(recoverBtn);

countriesModule.appendChild(sortCountryListBtns);
countriesModule.appendChild(searchField);
countriesModule.appendChild(countriesList);

document.body.appendChild(countriesModule);


// -------------------get countries list and data ----------------------------------

let countryNamesArray = [];
let globalDates = [];
let globalConfirmedCummulative = [];
let globalDeathsCummulative = [];
let globalRecoveredCummulative = [];
const globalConfirmedDay = [];
const globalDeathsDay = [];
const globalRecoveredDay = [];
let currentCountry = false;
let selectedCountryDates = [];
let selectedCountryConfirmedCummulative = [];
let selectedCountryDeathsCummulative = [];
let selectedCountryRecoveredCummulative = [];
const selectedCountryActive = [];
let selectedCountryConfirmedDay = [];
let selectedCountryDeathsDay = [];
let selectedCountryRecoveredDay = [];
let excludeCountries = ['AIA', 'ABW', 'BMU', 'VGB', 'BES', 'JEY', 'CUW', null, 'FLK', 'FRO' , 'GUF', 'PYF', 'GIB',
 'GRL', 'GLP', 'VAT', 'HKG', 'IMN', 'MAC', 'MTQ', 'MYT', 'MSR', 'MMR', 'NCL', 'PSE', 'REU', 'MAF', 'SPM', 'SXM', 'BLM', 'TCA', 'WLF', 'ESH'];

(async function countries () {

    const responseFirst  = await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`)
    const globalCummulativeArray  = await responseFirst.json();

        globalDates = Object.keys(globalCummulativeArray.cases);
        globalConfirmedCummulative = Object.values(globalCummulativeArray.cases);
        globalDeathsCummulative = Object.values(globalCummulativeArray.deaths);
        globalRecoveredCummulative = Object.values(globalCummulativeArray.recovered);
  
        for (let idx = 0; idx < globalDates.length; idx++) {
            if (idx === 0) {
                globalConfirmedDay.push(globalConfirmedCummulative[idx]);
                globalDeathsDay.push(globalDeathsCummulative[idx]);
                globalRecoveredDay.push(globalRecoveredCummulative[idx]);
            }
            else {
                globalConfirmedDay.push(globalConfirmedCummulative[idx] - globalConfirmedCummulative[idx - 1]);
                globalDeathsDay.push(globalDeathsCummulative[idx] - globalDeathsCummulative[idx - 1]);
                globalRecoveredDay.push(globalRecoveredCummulative[idx] - globalRecoveredCummulative[idx - 1]);
            }
        }

        const responseSecond  = await fetch(`https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false`);
        countryNamesArray  = await responseSecond.json();
     
    for (let index = 0; index < countryNamesArray.length; index++) {
        if (excludeCountries.indexOf(countryNamesArray[index].countryInfo.iso3) !== - 1) {
            continue;
        }
        const option = document.createElement('div');
        option.classList.add('country');
        const spanValaue = document.createElement('span');
        const spanCountryName = document.createElement('span');

        spanValaue.classList.add('optionValue');
        spanCountryName.classList.add('optionCountryName');

        spanValaue.textContent = String(countryNamesArray[index].cases).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        spanCountryName.textContent = countryNamesArray[index].country;
        option.setAttribute('iso2', `${countryNamesArray[index].countryInfo.iso2}`);
        option.setAttribute('iso3', `${countryNamesArray[index].countryInfo.iso3}`);
        option.setAttribute('lat', `${countryNamesArray[index].countryInfo.lat}`);
        option.setAttribute('long', `${countryNamesArray[index].countryInfo.long}`);
       
        option.appendChild(spanValaue);
        option.appendChild(spanCountryName);
      
        if (countryNamesArray[index].countryInfo.iso2 !== null) {
            option.style.backgroundImage = `url( https://www.countryflags.io/${countryNamesArray[index].countryInfo.iso2}/shiny/64.png)`
        } else {
            option.style.backgroundImage = `https://disease.sh/assets/img/flags/unknown.png`
            }

        option.addEventListener('click', async function getTotalCountryData() {
                    
                    const response = await fetch(`https://disease.sh/v3/covid-19/historical/${this.getAttribute('iso3')}?lastdays=all`);
                    const data  = await response.json();
                    
                    if (currentCountry !== this.children[1].textContent) {
                        graphWrapper.classList.add('loading');
                        currentCountry = this.children[1].textContent;
                        selectedCountryDates = [];
                        selectedCountryConfirmedCummulative = [];
                        selectedCountryDeathsCummulative = [];
                        selectedCountryRecoveredCummulative = [];
  
                        selectedCountryConfirmedDay = [];
                        selectedCountryDeathsDay = [];
                        selectedCountryRecoveredDay = [];

                        selectedCountryDates = Object.keys(data.timeline.cases);
                        selectedCountryConfirmedCummulative = Object.values(data.timeline.cases);
                        selectedCountryDeathsCummulative = Object.values(data.timeline.deaths);
                        selectedCountryRecoveredCummulative = Object.values(data.timeline.recovered);

                        for (let idx = 0; idx < selectedCountryDates.length; idx++) {                   

                            if (idx > 0) {
                                const confirmedCalc = selectedCountryConfirmedCummulative[idx] - selectedCountryConfirmedCummulative[idx - 1];
                                    selectedCountryConfirmedDay.push(confirmedCalc >= 0 ? confirmedCalc : 0);
                                const deathsCalc = selectedCountryDeathsCummulative[idx] - selectedCountryDeathsCummulative[idx - 1];
                                    selectedCountryDeathsDay.push(deathsCalc >= 0 ? deathsCalc : 0);
                                const recoverCalc = selectedCountryRecoveredCummulative[idx] - selectedCountryRecoveredCummulative[idx - 1];       
                                    selectedCountryRecoveredDay.push(recoverCalc >= 0 ? recoverCalc : 0);  
                
                            } 
                            else {
                                selectedCountryConfirmedDay.push(selectedCountryConfirmedCummulative[idx]);
                                selectedCountryDeathsDay.push(selectedCountryDeathsCummulative[idx]);
                                selectedCountryRecoveredDay.push(selectedCountryRecoveredCummulative[idx]);
                            }     
                        }
                        dataToGraph(selectedCountryDates, selectedCountryConfirmedCummulative);
                        graphWrapper.classList.remove('loading');
                    }
            })
        countriesList.appendChild(option);  
    }
    dataToGraph(globalDates, globalConfirmedCummulative);
    graphWrapper.classList.remove('loading');
})()

// -----------------------filter field logic -----------------------------------

let searchFieldArray; // тут для сортировки, когда ввели в поиске что-то
searchField.addEventListener("input", function (event) {
    searchFieldArray = [];
    const searchString = event.target.value; 
    const options = countriesList.childNodes; 
    for (let i = 0; i < options.length; i++) {
        const regex = new RegExp(`^${  searchString}`, "i");
        const match =  options[i].children[1].textContent.match(regex);

        if (!match ) {
            options[i].style.display = 'none';
            options[i].setAttribute('filtered', 'yes');
        } else {
            if (searchString) {
                const obj = countryNamesArray.find(element => element.country === options[i].children[1].textContent);
                searchFieldArray.push(obj);
            }
            options[i].removeAttribute('filtered');
            options[i].style.display = 'block';
        }
    }
});

function sortCountriesList(sortedValue, sortReverse, originalArray = countryNamesArray) {
    if (!sortReverse) {
        originalArray.sort(function (a,b) {
        if ( a[sortedValue] > b[sortedValue] ){
          return -1;
        }
        if ( b[sortedValue] > a[sortedValue] ){
          return 1;
        }
        return 0;
      });
    } else {
        originalArray.sort(function (a,b) {
            if ( a[sortedValue] < b[sortedValue] ){
              return -1;
            }
            if ( b[sortedValue] < a[sortedValue] ){
              return 1;
            }
            return 0;
          });
    }

    const countriesListNodes = originalArray.length < 50 ? document.querySelectorAll('.country:not([filtered])') : document.querySelectorAll('.country');
    for (let index = 0; index < countriesListNodes.length; index++) {

        if (sortedValue !== 'country') {
            countriesListNodes[index].children[0].textContent = String(originalArray[index][sortedValue]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }  else if (sortCountryListBtns.children[2].hasAttribute('sorted')) {
                countriesListNodes[index].children[0].textContent = String(originalArray[index].cases).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }   else if (sortCountryListBtns.children[3].hasAttribute('sorted')) {
                countriesListNodes[index].children[0].textContent = String(originalArray[index].deaths).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }   else if (sortCountryListBtns.children[4].hasAttribute('sorted')) {
                countriesListNodes[index].children[0].textContent = String(originalArray[index].recovered).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }   
                else {
                countriesListNodes[index].children[0].textContent = String(originalArray[index].cases).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }
        countriesListNodes[index].setAttribute('iso2', originalArray[index].countryInfo.iso2);
        countriesListNodes[index].setAttribute('iso3', originalArray[index].countryInfo.iso3);
        countriesListNodes[index].children[1].textContent = originalArray[index].country;
        countriesListNodes[index].style.backgroundImage = `url( https://www.countryflags.io/${originalArray[index].countryInfo.iso2}/shiny/64.png)`;
    }
}

function disactiveSortBtns(){
    for (let index = 1; index < sortCountryListBtns.childNodes.length; index++) {
        sortCountryListBtns.children[index].removeAttribute('sorted');
        sortCountryListBtns.children[index].removeAttribute('sortedPast');
    }
}

countryBtn.addEventListener('click', function() {
    for (let index = 2; index < sortCountryListBtns.childNodes.length; index++) {
        if (sortCountryListBtns.children[index].hasAttribute('sorted')) {
            sortCountryListBtns.children[index].setAttribute('sortedPast', 'yes');
        }
    }

    if (this.hasAttribute('sorted')) {
        if (this.getAttribute('sorted') === 'forward') {
            this.setAttribute('sorted', 'reverse');
            if (searchField.value) {
                sortCountriesList('country', true, searchFieldArray);
            } else {
                sortCountriesList('country', true);
            }
        } else {
            this.setAttribute('sorted', 'forward');
            if (searchField.value) {
                sortCountriesList('country', false, searchFieldArray);
            } else {
                sortCountriesList('country');
            }      
        }
    } else {
        this.setAttribute('sorted', 'forward');
        if (searchField.value) {
            sortCountriesList('country', false, searchFieldArray);
        } else {
            sortCountriesList('country');
        }   
    }
})


confirmedBtn.addEventListener('click', function() {
    if (this.hasAttribute('sorted')) {
        if (this.getAttribute('sorted') === 'forward') {
            disactiveSortBtns();
            this.setAttribute('sorted', 'reverse');
            if (searchField.value) {
                sortCountriesList('cases', true, searchFieldArray);
            } else {
                sortCountriesList('cases', true);
            }
        } else {
            disactiveSortBtns();
            this.setAttribute('sorted', 'forward');
            if (searchField.value) {
                sortCountriesList('cases', false, searchFieldArray);
            } else {
                sortCountriesList('cases');
            }      
        }
    } else {
        disactiveSortBtns();
        this.setAttribute('sorted', 'forward');
        if (searchField.value) {
            sortCountriesList('cases', false, searchFieldArray);
        } else {
            sortCountriesList('cases');
        }   
    }
})

deathBtn.addEventListener('click', function() {
      if (this.hasAttribute('sorted')) {
        if (this.getAttribute('sorted') === 'forward') {
            disactiveSortBtns();
            this.setAttribute('sorted', 'reverse');
            if (searchField.value) {
                sortCountriesList('deaths', true, searchFieldArray);
            } else {
                sortCountriesList('deaths', true);
            }
        } else {
            disactiveSortBtns();
            this.setAttribute('sorted', 'forward')
            if (searchField.value) {
                sortCountriesList('deaths', false, searchFieldArray);
            } else {
                sortCountriesList('deaths');
            } 
        }
    } else {
        disactiveSortBtns();
        this.setAttribute('sorted', 'forward');
        if (searchField.value) {
            sortCountriesList('deaths', false, searchFieldArray);
        } else {
            sortCountriesList('deaths');
        }   
    }
})

recoverBtn.addEventListener('click', function() {
    if (this.hasAttribute('sorted')) {
        if (this.getAttribute('sorted') === 'forward') {
            disactiveSortBtns();
            this.setAttribute('sorted', 'reverse');
            if (searchField.value) {
                sortCountriesList('recovered', true, searchFieldArray);
            } else {
                sortCountriesList('recovered', true);
            }
        } else {
            disactiveSortBtns();
            this.setAttribute('sorted', 'forward')
            if (searchField.value) {
                sortCountriesList('recovered', false, searchFieldArray);
            } else {
                sortCountriesList('recovered');
            } 
        }
    } else {
        disactiveSortBtns();
        this.setAttribute('sorted', 'forward');
        if (searchField.value) {
            sortCountriesList('recovered', false, searchFieldArray);
        } else {
            sortCountriesList('recovered');
        }  
    }
})

function dataToGraph(datesArr, dataType) {
    graphConfig.data.labels = datesArr;
    graphConfig.data.datasets[0].data = dataType;
    graphConfig.data.datasets[0].backgroundColor = '#675d04';
    graphConfig.data.datasets[0].borderColor = '#675d04';
    graphConfig.options.title.text = currentCountry || 'Global';
    graphConfig.data.datasets[0].label = 'Total Confirmed';
    graphWrapper.classList.remove('loading');
    myChart.update();
    myChart.update();
}

graphControlPanel.children[0].addEventListener('click', function(){
    if (!this.hasAttribute('active')) {
        graphConfig.data.datasets[0].data = currentCountry ? selectedCountryConfirmedDay: globalConfirmedDay;
        graphConfig.options.title.text = currentCountry || 'Global' ;
        graphConfig.data.datasets[0].label = 'Confirmed Per Day';
        graphConfig.data.datasets[0].backgroundColor = '#675d04';
        graphConfig.data.datasets[0].borderColor = '#675d04'; 
        myChart.update();
        myChart.update();
    }
})


graphControlPanel.children[1].addEventListener('click', function(){
    if (!this.hasAttribute('active')) {
        graphConfig.data.datasets[0].data = currentCountry ? selectedCountryDeathsDay: globalDeathsDay;
        graphConfig.options.title.text = currentCountry || 'Global';
        graphConfig.data.datasets[0].label = 'Deaths Per Day';
        graphConfig.data.datasets[0].backgroundColor = '#842727';
        graphConfig.data.datasets[0].borderColor = '#842727';
        myChart.update();
        myChart.update();
    }
})

graphControlPanel.children[2].addEventListener('click', function(){
    if (!this.hasAttribute('active')) {
        graphConfig.data.datasets[0].data = currentCountry ? selectedCountryRecoveredDay: globalRecoveredDay;
        graphConfig.options.title.text = currentCountry || 'Global';
        graphConfig.data.datasets[0].label = 'Recovered Per Day';
        graphConfig.data.datasets[0].backgroundColor = '#1b481b'; 
        graphConfig.data.datasets[0].borderColor = '#1b481b';
        myChart.update();
        myChart.update();
    }
})

graphControlPanel.children[3].addEventListener('click', function(){
    if (!this.hasAttribute('active')) {
        graphConfig.data.datasets[0].data = currentCountry ? selectedCountryConfirmedCummulative : globalConfirmedCummulative;
        graphConfig.options.title.text = currentCountry || 'Global';
        graphConfig.data.datasets[0].label = 'Total Confirmed';
        graphConfig.data.datasets[0].backgroundColor = '#675d04';
        graphConfig.data.datasets[0].borderColor = '#675d04';
        myChart.update();
        myChart.update();
    }

})
graphControlPanel.children[4].addEventListener('click', function(){
    if (!this.hasAttribute('active')) {
        graphConfig.data.datasets[0].data = currentCountry ? selectedCountryDeathsCummulative: globalDeathsCummulative;
        graphConfig.options.title.text = currentCountry || 'Global';
        graphConfig.data.datasets[0].label = 'Total Deaths';
        graphConfig.data.datasets[0].backgroundColor = '#842727';
        graphConfig.data.datasets[0].borderColor = '#842727';
        myChart.update();
        myChart.update();
    }
})
 graphControlPanel.children[5].addEventListener('click', function(){
    if (!this.hasAttribute('active')) {
        graphConfig.data.datasets[0].data = currentCountry ? selectedCountryRecoveredCummulative : globalRecoveredCummulative;
        graphConfig.options.title.text = currentCountry || 'Global';
        graphConfig.data.datasets[0].label = 'Total Recovered';
        graphConfig.data.datasets[0].backgroundColor = '#1b481b';
        graphConfig.data.datasets[0].borderColor = '#1b481b'; 
        myChart.update();
        myChart.update();
    }
})

// export default summarySelectedCountryData;