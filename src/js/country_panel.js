import {graphWrapper, graphBtnExportEvents} from './graph';


const countriesModule = document.createElement('div');
countriesModule.classList.add('countriesModule');

const fullScreenCountreisBtn = document.createElement('div');
fullScreenCountreisBtn.classList.add('fullScreenCountreisBtn');

const searchWrapper = document.createElement('div');
searchWrapper.classList.add('searchWrapper');
const searchField = document.createElement('input');
searchField.type = 'search';
searchField.placeholder = 'Search country';
searchField.classList.add('countriesSearchField');
searchWrapper.appendChild(searchField);

const countriesSearchFieldResults = document.createElement('div');
countriesSearchFieldResults.classList.add('countriesSearchFieldResults');
searchWrapper.appendChild(countriesSearchFieldResults);

const countriesList = document.createElement('div');
countriesList.classList.add('countriesList');

const sortCountryListBtns = document.createElement('div');
sortCountryListBtns.classList.add('sortCountryListBtnsWrapper');

const sortCountryListBtnsSubWrapper = document.createElement('div');
sortCountryListBtnsSubWrapper.classList.add('sortCountryListBtnsSubWrapper');

const sortCountryListBtnsSwitcher = document.createElement('input');
sortCountryListBtnsSwitcher.type = 'checkbox';
sortCountryListBtnsSwitcher.classList.add('sortCountryListBtnsSwitcher');
sortCountryListBtns.appendChild(sortCountryListBtnsSwitcher);

let allCountriesFinalArray;

function sortCountryListBtnDisactive() {
    for (let idx = 0; idx < sortCountryListBtnsSubWrapper.childNodes.length; idx += 1) {
        sortCountryListBtnsSubWrapper.children[idx].classList.remove('active');    
    }
} 

function sortCountriesList() {
    let activeCountryISO;
    const value = this.getAttribute('data-type');
    
       if (localStorage.getItem('currentCountryISO3')) {
           activeCountryISO = document.querySelector('.country.active').getAttribute('data-iso3');
       }
       allCountriesFinalArray.sort( (a,b) => {
        if ( a[value] * 100 > b[value] * 100){
          return -1;
        }
        if ( b[value] * 100 > a[value] * 100){
          return 1;
        }
        return 0;
      });
    
      for (let index = 0; index < countriesList.childNodes.length; index += 1) {
        countriesList.childNodes[index].classList.remove('active');
        countriesList.childNodes[index].children[0].textContent = String(allCountriesFinalArray[index][value]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        countriesList.childNodes[index].setAttribute('data-iso2', allCountriesFinalArray[index].iso2);
        countriesList.childNodes[index].setAttribute('data-iso3', allCountriesFinalArray[index].iso3);
        countriesList.childNodes[index].setAttribute('data-population', allCountriesFinalArray[index].population);
        countriesList.childNodes[index].children[1].textContent = allCountriesFinalArray[index].country;
        countriesList.childNodes[index].style.backgroundImage = `url( https://www.countryflags.io/${allCountriesFinalArray[index].iso2}/shiny/64.png)`;
      }
      if (activeCountryISO) {
          document.querySelector(`[data-iso3=${activeCountryISO}]`).classList.add('active');
      }
}

for (let i = 1; i <= 12; i += 1) {
    const sortCountryListBtn =  document.createElement('button');
    sortCountryListBtn.classList.add('sortCountryListBtn');
    localStorage.setItem('currentDataNumber', '3');
    sortCountryListBtn.addEventListener('click', sortCountriesList);
    sortCountryListBtn.addEventListener('click', function sortCountryListBtnClick() {
        localStorage.setItem('currentDataNumber', i - 1);
        if (!this.classList.contains('acive')) {
            sortCountryListBtnDisactive();
            this.classList.add('active');
            graphBtnExportEvents(i - 1);
            }
        });

    if (i > 6) {sortCountryListBtn.classList.add('hidden')};

    if (i === 1) {
        sortCountryListBtn.textContent = 'Today confirmed';
        sortCountryListBtn.setAttribute('data-type', 'todayCases');
    }
    if (i === 2) {
        sortCountryListBtn.textContent = 'Today deaths';
        sortCountryListBtn.setAttribute('data-type', 'todayDeaths');
    }
    if (i === 3) {
        sortCountryListBtn.textContent = 'Today recovered';
        sortCountryListBtn.setAttribute('data-type', 'todayRecovered');
    }
    if (i === 4) {
        sortCountryListBtn.textContent = 'Summary confirmed';
        sortCountryListBtn.setAttribute('data-type', 'cases');
        sortCountryListBtn.classList.add('active');
    }
    if (i === 5) {
        sortCountryListBtn.textContent = 'Summary deaths';
        sortCountryListBtn.setAttribute('data-type', 'deaths');
    }
    if (i === 6) {
        sortCountryListBtn.textContent = 'Summary recovered';
        sortCountryListBtn.setAttribute('data-type', 'recovered');
    }
    if (i === 7) {
        sortCountryListBtn.textContent = 'Today confirmed per 100k';
        sortCountryListBtn.setAttribute('data-type', 'todayCases100k');
    }
    if (i === 8) {
        sortCountryListBtn.textContent = 'Today deaths per 100k';
        sortCountryListBtn.setAttribute('data-type', 'todayDeaths100k');
    }
    if (i === 9) {
        sortCountryListBtn.textContent = 'Today recovered per 100k';
        sortCountryListBtn.setAttribute('data-type', 'todayRecovered100k');
    }
    if (i === 10) {
        sortCountryListBtn.textContent = 'Summary confirmed per 100k';
        sortCountryListBtn.setAttribute('data-type', 'casesPer100k');
    }
    if (i === 11) {
        sortCountryListBtn.textContent = 'Summary deaths per 100k';
        sortCountryListBtn.setAttribute('data-type', 'deathsPer100k');
    }
    if (i === 12) {
        sortCountryListBtn.textContent = 'Summary recovered per 100k';
        sortCountryListBtn.setAttribute('data-type', 'recoveredPer100k');
    }
    
    sortCountryListBtnsSubWrapper.appendChild(sortCountryListBtn);
}
  
function sortCountryListBtnSwitcher(group) {
    if (group === 1) {
        for (let idx = 0; idx < sortCountryListBtnsSubWrapper.childNodes.length; idx += 1) {
           if(idx < sortCountryListBtnsSubWrapper.childNodes.length / 2 ) {
            sortCountryListBtnsSubWrapper.children[idx].classList.add('hidden')
            } else {
                sortCountryListBtnsSubWrapper.children[idx].classList.remove('hidden');
            }
         }   
    } else if (group === 2) {
        for (let idx = 0; idx < sortCountryListBtnsSubWrapper.childNodes.length; idx += 1) {
            if(idx < sortCountryListBtnsSubWrapper.childNodes.length / 2 ) {
                sortCountryListBtnsSubWrapper.children[idx].classList.remove('hidden')
             } else {
                sortCountryListBtnsSubWrapper.children[idx].classList.add('hidden');
             }
          }  
    }
}

function sortBtsEvent(number) {
    sortCountryListBtnDisactive();
    if (number < 6) {
        sortCountryListBtnSwitcher(2);
        sortCountryListBtnsSwitcher.checked = false;
    } else {
        sortCountryListBtnSwitcher(1);
        sortCountryListBtnsSwitcher.checked = true;
    }
    sortCountryListBtnsSubWrapper.children[number].classList.add('active');
    sortCountriesList.call(sortCountryListBtnsSubWrapper.children[number]);
}


sortCountryListBtnsSwitcher.addEventListener('click', function sortCountryListBtnsSwitcherClick (){
    if(this.checked) {
        sortCountryListBtnSwitcher(1);
    } else {
        sortCountryListBtnSwitcher(2);
    }
})
countriesModule.appendChild(fullScreenCountreisBtn);
sortCountryListBtns.appendChild(sortCountryListBtnsSubWrapper);
countriesModule.appendChild(sortCountryListBtns);
countriesModule.appendChild(searchWrapper);
countriesModule.appendChild(countriesList);

document.body.appendChild(countriesModule);

function countryListDisactive() {
    for (let idx = 0; idx < countriesList.childNodes.length; idx += 1) {
        countriesList.children[idx].classList.remove('active');    
    }
} 

async function getCurrentCountryData() {                   
    if (localStorage.getItem('currentCountryISO3') !== this.getAttribute('data-iso3')) {
        countryListDisactive();
        this.classList.add('active');
        graphWrapper.classList.add('loading');
        const response = await fetch(`https://disease.sh/v3/covid-19/historical/${this.getAttribute('data-iso3')}?lastdays=all`);
        const data  = await response.json();
        localStorage.setItem('currentCountryISO3', this.getAttribute('data-iso3'));
        localStorage.setItem('currentCountry', this.children[1].innerText);

        let selectedCountryDates = [];
        let selectedCountryConfirmedCummulative = [];
        let selectedCountryDeathsCummulative = [];
        let selectedCountryRecoveredCummulative = [];
        let selectedCountryConfirmedDay = [];
        let selectedCountryDeathsDay = [];
        let selectedCountryRecoveredDay = [];

        const selectedCountryConfirmedCummulative100k = [];
        const selectedCountryDeathsCummulative100k = [];
        const selectedCountryRecoveredCummulative100k = [];
        const selectedCountryConfirmedDay100k = [];
        const selectedCountryDeathsDay100k = [];
        const selectedCountryRecoveredDay100k = [];

        const selectedCountryPopulation = this.getAttribute('data-population');
        selectedCountryConfirmedDay = [];
        selectedCountryDeathsDay = [];
        selectedCountryRecoveredDay = [];

        selectedCountryDates = Object.keys(data.timeline.cases);
        selectedCountryConfirmedCummulative = Object.values(data.timeline.cases);
        selectedCountryDeathsCummulative = Object.values(data.timeline.deaths);
        selectedCountryRecoveredCummulative = Object.values(data.timeline.recovered);

        for (let idx = 0; idx < selectedCountryDates.length; idx += 1) {                   

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
        for (let ids = 0; ids < selectedCountryDates.length; ids += 1) {
            selectedCountryConfirmedDay100k.push((selectedCountryConfirmedDay[ids] / selectedCountryPopulation * 100000).toFixed(2));
            selectedCountryDeathsDay100k.push((selectedCountryDeathsDay[ids] / selectedCountryPopulation * 100000).toFixed(2));
            selectedCountryRecoveredDay100k.push((selectedCountryRecoveredDay[ids] / selectedCountryPopulation * 100000).toFixed(2));
            selectedCountryConfirmedCummulative100k.push((selectedCountryConfirmedCummulative[ids] / selectedCountryPopulation * 100000).toFixed(2));
            selectedCountryDeathsCummulative100k.push((selectedCountryDeathsCummulative[ids] / selectedCountryPopulation * 100000).toFixed(2));
            selectedCountryRecoveredCummulative100k.push((selectedCountryRecoveredCummulative[ids] / selectedCountryPopulation * 100000).toFixed(2));
        }

        localStorage.setItem('selectedCountryDates', JSON.stringify(selectedCountryDates));

        localStorage.setItem('Daily confirmed', JSON.stringify(selectedCountryConfirmedDay));
        localStorage.setItem('Daily deaths', JSON.stringify(selectedCountryDeathsDay));
        localStorage.setItem('Daily recovered', JSON.stringify(selectedCountryRecoveredDay));
        localStorage.setItem('Summary confirmed', JSON.stringify(selectedCountryConfirmedCummulative));
        localStorage.setItem('Summary deaths', JSON.stringify(selectedCountryDeathsCummulative));
        localStorage.setItem('Summary recovered', JSON.stringify(selectedCountryRecoveredCummulative));
        
        localStorage.setItem('Daily confirmed per 100k', JSON.stringify(selectedCountryConfirmedDay100k));
        localStorage.setItem('Daily deaths per 100k', JSON.stringify(selectedCountryDeathsDay100k));
        localStorage.setItem('Daily recovered per 100k', JSON.stringify(selectedCountryRecoveredDay100k));
        localStorage.setItem('Summary confirmed per 100k', JSON.stringify(selectedCountryConfirmedCummulative100k));
        localStorage.setItem('Summary deaths per 100k', JSON.stringify(selectedCountryDeathsCummulative100k));
        localStorage.setItem('Summary recovered per 100k', JSON.stringify(selectedCountryRecoveredCummulative100k));

        graphBtnExportEvents(localStorage.getItem('currentDataNumber'), true);
        graphWrapper.classList.remove('loading');
    }
}

function buildCountryPanel() {
    const allCountriesArray = JSON.parse(localStorage.getItem('All country list'));
    allCountriesFinalArray = JSON.parse(localStorage.getItem('All country list final'));

    for (let index = 0; index < allCountriesArray.length; index += 1) {

        const option = document.createElement('div');
        option.classList.add('country');
        const spanValaue = document.createElement('span');
        const spanCountryName = document.createElement('span');

        spanValaue.classList.add('optionValue');
        spanCountryName.classList.add('optionCountryName');
   
        spanValaue.textContent = String(allCountriesArray[index].cases).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        spanCountryName.textContent = allCountriesArray[index].country;
        option.setAttribute('data-iso2', `${allCountriesArray[index].countryInfo.iso2}`);
        option.setAttribute('data-iso3', `${allCountriesArray[index].countryInfo.iso3}`);
        option.setAttribute('data-population', `${allCountriesArray[index].population}`);

        option.appendChild(spanValaue);
        option.appendChild(spanCountryName);
    
        option.style.backgroundImage = `url( https://www.countryflags.io/${allCountriesArray[index].countryInfo.iso2}/shiny/64.png)`;
        option.addEventListener('click', getCurrentCountryData);
        countriesList.appendChild(option);  
    }
    sortCountriesList.call(sortCountryListBtnsSubWrapper.children[3]);
};

(async function getGlobalData () {
    const date = new Date();
    const todayUpdate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

    if (localStorage.getItem('updateDate') === todayUpdate) {
        localStorage.setItem('currentCountry', 'Global');
        localStorage.setItem('currentCountryISO3', '');
        graphBtnExportEvents(3);
        graphWrapper.classList.remove('loading');
        return;
    }

    const responseFirst  = await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`);
    const globalCummulativeArray  = await responseFirst.json();

    const responseForPopulation = await fetch(`https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false`);

        const selectedCountryPopulation  = (await responseForPopulation.json()).population;
        const globalDates = Object.keys(globalCummulativeArray.cases);
        const globalConfirmedCummulative = Object.values(globalCummulativeArray.cases);
        const globalDeathsCummulative = Object.values(globalCummulativeArray.deaths);
        const globalRecoveredCummulative = Object.values(globalCummulativeArray.recovered);

        const globalConfirmedDay =[];
        const globalDeathsDay = [];
        const globalRecoveredDay = [];

        const globalConfirmedDay100k = [];
        const globalDeathsDay100k = [];
        const globalRecoveredDay100k = [];
        const globalConfirmedCummulative100k = [];
        const globalDeathsCummulative100k = [];
        const globalRecoveredCummulative100k = [];
       
        for (let idx = 0; idx < globalDates.length; idx += 1) {
            if (idx === 0) {
                globalConfirmedDay.push(globalConfirmedCummulative[idx]);
                globalDeathsDay.push(globalDeathsCummulative[idx]);
                globalRecoveredDay.push(globalRecoveredCummulative[idx]);
            }
            else {
                const globalConfirmedDayCalc = globalConfirmedCummulative[idx] - globalConfirmedCummulative[idx - 1];
                globalConfirmedDay.push(globalConfirmedDayCalc >= 0 ? globalConfirmedDayCalc : 0);
                const globalDeathsDayCalc = globalDeathsCummulative[idx] - globalDeathsCummulative[idx - 1];
                globalDeathsDay.push(globalDeathsDayCalc >= 0 ? globalDeathsDayCalc : 0);
                const globalRecoveredDayCalc = globalRecoveredCummulative[idx] - globalRecoveredCummulative[idx - 1];
                globalRecoveredDay.push(globalRecoveredDayCalc >= 0 ? globalRecoveredDayCalc : 0);
            }
        }

        for (let ids = 0; ids < globalDates.length; ids += 1) {
            globalConfirmedDay100k.push((globalConfirmedDay[ids] / selectedCountryPopulation * 100000).toFixed(2));
            globalDeathsDay100k.push((globalDeathsDay[ids] / selectedCountryPopulation * 100000).toFixed(2));
            globalRecoveredDay100k.push((globalRecoveredDay[ids] / selectedCountryPopulation * 100000).toFixed(2));
            globalConfirmedCummulative100k.push((globalConfirmedCummulative[ids] / selectedCountryPopulation * 100000).toFixed(2));
            globalDeathsCummulative100k.push((globalDeathsCummulative[ids] / selectedCountryPopulation * 100000).toFixed(2));
            globalRecoveredCummulative100k.push((globalRecoveredCummulative[ids] / selectedCountryPopulation * 100000).toFixed(2));
        }

        localStorage.setItem('updateDate', todayUpdate);
        localStorage.setItem('currentCountry', 'Global');
        localStorage.setItem('globalPopulation', JSON.stringify(selectedCountryPopulation));
        localStorage.setItem('globalDates', JSON.stringify(globalDates));

        localStorage.setItem('Global Daily confirmed', JSON.stringify(globalConfirmedDay));
        localStorage.setItem('Global Daily deaths', JSON.stringify(globalDeathsDay));
        localStorage.setItem('Global Daily recovered', JSON.stringify(globalRecoveredDay));
        localStorage.setItem('Global Summary confirmed', JSON.stringify(globalConfirmedCummulative));
        localStorage.setItem('Global Summary deaths', JSON.stringify(globalDeathsCummulative));
        localStorage.setItem('Global Summary recovered', JSON.stringify(globalRecoveredCummulative));
        
        localStorage.setItem('Global Daily confirmed per 100k', JSON.stringify(globalConfirmedDay100k));
        localStorage.setItem('Global Daily deaths per 100k', JSON.stringify(globalDeathsDay100k));
        localStorage.setItem('Global Daily recovered per 100k', JSON.stringify(globalRecoveredDay100k));
        localStorage.setItem('Global Summary confirmed per 100k', JSON.stringify(globalConfirmedCummulative100k));
        localStorage.setItem('Global Summary deaths per 100k', JSON.stringify(globalDeathsCummulative100k));
        localStorage.setItem('Global Summary recovered per 100k', JSON.stringify(globalRecoveredCummulative100k));

        graphBtnExportEvents(3);
    graphWrapper.classList.remove('loading');
})();


(async function getCountryList() {
    const date = new Date();
    const todayUpdate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

    if (localStorage.getItem('All country list') && (localStorage.getItem('updateDate') === todayUpdate)) {
        buildCountryPanel();
        return;
    }

    const excludeCountries = ['AIA', 'ABW', 'BMU', 'VGB', 'BES', 'JEY', 'CUW', null, 'FLK', 'FRO' , 'GUF', 'PYF', 'GIB', 'GRL',
                             'GLP', 'VAT', 'HKG', 'IMN', 'MAC', 'MTQ', 'MYT', 'MSR', 'MMR', 'NCL', 'PSE', 'REU', 'MAF', 'SPM',
                              'SXM', 'BLM', 'TCA', 'WLF', 'ESH', 'CYM'];

    const response  = await fetch(`https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false`);
    const countryNamesArray  = (await response.json()).filter(e => excludeCountries.indexOf(e.countryInfo.iso3) === - 1);

    allCountriesFinalArray = new Array((await countryNamesArray).length);

    for (let index = 0; index < allCountriesFinalArray.length; index += 1) {

        allCountriesFinalArray[index] = {};
        allCountriesFinalArray[index].cases = countryNamesArray[index].cases;
        allCountriesFinalArray[index].casesPer100k = (countryNamesArray[index].casesPerOneMillion / 10).toFixed(2);
        allCountriesFinalArray[index].deaths = countryNamesArray[index].deaths;
        allCountriesFinalArray[index].deathsPer100k = (countryNamesArray[index].deathsPerOneMillion / 10).toFixed(2);
        allCountriesFinalArray[index].recovered = countryNamesArray[index].recovered;
        allCountriesFinalArray[index].recoveredPer100k = (countryNamesArray[index].recoveredPerOneMillion / 10).toFixed(2);
        allCountriesFinalArray[index].todayCases = countryNamesArray[index].todayCases;
        allCountriesFinalArray[index].todayDeaths = countryNamesArray[index].todayDeaths;
        allCountriesFinalArray[index].todayRecovered = countryNamesArray[index].todayRecovered;

        allCountriesFinalArray[index].todayCases100k = ((countryNamesArray[index].todayCases / countryNamesArray[index].population) * 100000).toFixed(3);
        allCountriesFinalArray[index].todayDeaths100k = ((countryNamesArray[index].todayDeaths / countryNamesArray[index].population) * 100000).toFixed(3);
        allCountriesFinalArray[index].todayRecovered100k = ((countryNamesArray[index].todayRecovered / countryNamesArray[index].population) * 100000).toFixed(3);
        allCountriesFinalArray[index].iso2 = countryNamesArray[index].countryInfo.iso2;
        allCountriesFinalArray[index].iso3 = countryNamesArray[index].countryInfo.iso3;
        allCountriesFinalArray[index].country = countryNamesArray[index].country;
        allCountriesFinalArray[index].population = countryNamesArray[index].population;
    }
    
    localStorage.setItem('All country list final', JSON.stringify(allCountriesFinalArray));
    localStorage.setItem('All country list', JSON.stringify(countryNamesArray));
    buildCountryPanel();
})();


fullScreenCountreisBtn.addEventListener('click', () => {
    countriesModule.classList.toggle('fullscreen');
    searchWrapper.classList.toggle('fullscreen');
    sortCountryListBtnsSubWrapper.classList.toggle('fullscreen');
    sortCountryListBtns.classList.toggle('fullscreen');
    countriesList.classList.toggle('fullscreen');
    sortCountryListBtnsSwitcher.classList.toggle('fullscreen');
})

// -----------------------filter field logic -----------------------------------

// let searchFieldArray; 
// searchField.addEventListener("input", (event) => {
//     searchFieldArray = [];
//     const searchString = event.target.value; 
//     const options = countriesList.childNodes; 
//     for (let i = 0; i < options.length; i += 1) {
//         const regex = new RegExp(`^${  searchString}`, "i");
//         const match =  options[i].children[1].textContent.match(regex);
//         if (!match ) {
//             options[i].style.display = 'none';
//         } else {
//             if (searchString) {
//                 const obj = allCountriesFinalArray.find(element => element.country === options[i].children[1].textContent);
//                 searchFieldArray.push(obj);
//             }
//             options[i].style.display = 'block';
//         }
//     }
// });

// let searchFieldArray; 
searchField.addEventListener("input", (event) => { 
    countriesSearchFieldResults.textContent = '';
    const searchString = event.target.value; 
    for (let i = 0; i < countriesList.childNodes.length; i += 1) {
        const regex = new RegExp(`^${  searchString}`, "i");
        const match =  countriesList.childNodes[i].children[1].innerText.match(regex);
        if (match && searchField.value) {
            let searchFieldResult = document.createElement('div');
            searchFieldResult.classList.add('searchFieldResult');
            searchFieldResult.innerText = countriesList.childNodes[i].children[1].innerText;
            searchFieldResult.addEventListener('click', function serachElementClick(){
                getCurrentCountryData.call(countriesList.childNodes[i]);
                countriesSearchFieldResults.textContent = '';
                searchField.value = '';
                countriesList.childNodes[i].scrollIntoView({block: "center", behavior: "smooth"});
            })
            countriesSearchFieldResults.appendChild(searchFieldResult);
            
        } 
    }
});


export default sortBtsEvent;

// var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");