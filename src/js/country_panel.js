import {graphWrapper, graphBtnExportEvents} from './graph';


const countriesModule = document.createElement('div');
countriesModule.classList.add('countriesModule');

const searchField = document.createElement('input');
searchField.type = 'search';
searchField.placeholder = 'Find country';
searchField.classList.add('countriesSearchField');


const filterField = document.createElement('input');
filterField.type = 'search';
filterField.disabled = true;
filterField.placeholder = 'Filter country';
filterField.classList.add('countriesSearchField');

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

let allCountriesArrayForSorting;

function sortCountryListBtnDisactive() {
    for (let idx = 0; idx < sortCountryListBtnsSubWrapper.childNodes.length; idx += 1) {
        sortCountryListBtnsSubWrapper.children[idx].classList.remove('active');    
    }
} 

function sortCountriesList() {
       
       const value = this.getAttribute('data-type');

        allCountriesArrayForSorting.sort( (a,b) => {
        if ( a[value] * 100 > b[value] * 100){
          return -1;
        }
        if ( b[value] * 100 > a[value] * 100){
          return 1;
        }
        return 0;
      });
        
      const countriesListNodes = countriesList.childNodes;

      for (let index = 0; index < countriesList.childNodes.length; index += 1) {
            countriesListNodes[index].children[0].textContent = String(allCountriesArrayForSorting[index][value]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            countriesListNodes[index].setAttribute('data-iso2', allCountriesArrayForSorting[index].iso2);
            countriesListNodes[index].setAttribute('data-iso3', allCountriesArrayForSorting[index].iso3);
            countriesListNodes[index].setAttribute('data-population', allCountriesArrayForSorting[index].population);
            countriesListNodes[index].children[1].textContent = allCountriesArrayForSorting[index].country;
            countriesListNodes[index].style.backgroundImage = `url( https://www.countryflags.io/${allCountriesArrayForSorting[index].iso2}/shiny/64.png)`;
      }

}


for (let i = 1; i <= 12; i += 1) {
    const sortCountryListBtn =  document.createElement('button');
    sortCountryListBtn.classList.add('sortCountryListBtn');
    sortCountryListBtn.addEventListener('click', sortCountriesList);
    sortCountryListBtn.addEventListener('click', function() {
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




    

//     // sortCountryListBtn.addEventListener('click', function() {
//     //     if (!this.classList.contains('acive')) {
//     //         sortCountryListBtnDisactive();
//     //         this.classList.add('active');
//     //         graphBtnExportEvents(i - 1);
//     //         }
//     //     });

//     sortCountryListBtnsSubWrapper.appendChild(sortCountryListBtn);
// }



for (let index = 0; index < sortCountryListBtnsSubWrapper.childNodes.length; index += 1) {
    
    // sortCountryListBtnsSubWrapper.children[index].sort = ;
    // sortCountryListBtnsSubWrapper.children[index].addEventListener('click', );
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

sortCountryListBtnsSwitcher.addEventListener('click', function (){
    if(this.checked) {
        sortCountryListBtnSwitcher(1);
    } else {
        sortCountryListBtnSwitcher(2);
    }
})

sortCountryListBtns.appendChild(sortCountryListBtnsSubWrapper);
countriesModule.appendChild(sortCountryListBtns);
countriesModule.appendChild(searchField);
countriesModule.appendChild(filterField);
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

        graphBtnExportEvents(3, true);
        graphWrapper.classList.remove('loading');
    }
}

function buildCountryPanel() {
    const allCountriesArray = JSON.parse(localStorage.getItem('All country list'));
    allCountriesArrayForSorting = new Array(allCountriesArray.length);

    for (let index = 0; index < allCountriesArray.length; index += 1) {

        allCountriesArrayForSorting[index] = {};
        allCountriesArrayForSorting[index].cases = allCountriesArray[index].cases;
        allCountriesArrayForSorting[index].casesPer100k = (allCountriesArray[index].casesPerOneMillion / 10).toFixed(2);
        allCountriesArrayForSorting[index].deaths = allCountriesArray[index].deaths;
        allCountriesArrayForSorting[index].deathsPer100k = (allCountriesArray[index].deathsPerOneMillion / 10).toFixed(2);
        allCountriesArrayForSorting[index].recovered = allCountriesArray[index].recovered;
        allCountriesArrayForSorting[index].recoveredPer100k = (allCountriesArray[index].recoveredPerOneMillion / 10).toFixed(2);
        allCountriesArrayForSorting[index].todayCases = allCountriesArray[index].todayCases;
        allCountriesArrayForSorting[index].todayDeaths = allCountriesArray[index].todayDeaths;
        allCountriesArrayForSorting[index].todayRecovered = allCountriesArray[index].todayRecovered;

        allCountriesArrayForSorting[index].todayCases100k = ((allCountriesArray[index].todayCases /  allCountriesArray[index].population) * 100000).toFixed(3);
        allCountriesArrayForSorting[index].todayDeaths100k = ((allCountriesArray[index].todayDeaths /  allCountriesArray[index].population) * 100000).toFixed(3);
        allCountriesArrayForSorting[index].todayRecovered100k = ((allCountriesArray[index].todayRecovered / allCountriesArray[index].population) * 100000).toFixed(3);
        allCountriesArrayForSorting[index].iso2 = allCountriesArray[index].countryInfo.iso2;
        allCountriesArrayForSorting[index].iso3 = allCountriesArray[index].countryInfo.iso3;
        allCountriesArrayForSorting[index].country = allCountriesArray[index].country;
        allCountriesArrayForSorting[index].population = allCountriesArray[index].population;

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
};

(async function getGlobalData () {
    const date = new Date();
    const todayUpdate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

    if (localStorage.getItem('updateDate') === todayUpdate) {
        localStorage.setItem('currentCountry', 'Global');
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

    //
        buildCountryPanel();
        return;
    }

    const excludeCountries = ['AIA', 'ABW', 'BMU', 'VGB', 'BES', 'JEY', 'CUW', null, 'FLK', 'FRO' , 'GUF', 'PYF', 'GIB', 'GRL',
                             'GLP', 'VAT', 'HKG', 'IMN', 'MAC', 'MTQ', 'MYT', 'MSR', 'MMR', 'NCL', 'PSE', 'REU', 'MAF', 'SPM',
                              'SXM', 'BLM', 'TCA', 'WLF', 'ESH', 'CYM'];

    const response  = await fetch(`https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false`);
    const countryNamesArray  = (await response.json()).filter(e => excludeCountries.indexOf(e.countryInfo.iso3) === - 1);
    
    localStorage.setItem('All country list', JSON.stringify(countryNamesArray));
    buildCountryPanel();
})();


// -----------------------filter field logic -----------------------------------

let searchFieldArray; 
filterField.addEventListener("input", (event) => {
    searchFieldArray = [];
    const searchString = event.target.value; 
    const options = countriesList.childNodes; 
    for (let i = 0; i < options.length; i += 1) {
        const regex = new RegExp(`^${  searchString}`, "i");
        const match =  options[i].children[1].textContent.match(regex);

        if (!match ) {
            options[i].style.display = 'none';
            options[i].setAttribute('filtered', 'yes');
        } else {
            if (searchString) {
                const obj = allCountriesArrayForSorting.find(element => element.country === options[i].children[1].textContent);
                searchFieldArray.push(obj);
            }
            options[i].removeAttribute('filtered');
            options[i].style.display = 'block';
        }
    }
});

// function sortCountriesList(sortedValue, sortReverse, originalArray = countryNamesArray) {
//     if (!sortReverse) {
//         originalArray.sort( (a,b) => {
//         if ( a[sortedValue] > b[sortedValue] ){
//           return -1;
//         }
//         if ( b[sortedValue] > a[sortedValue] ){
//           return 1;
//         }
//         return 0;
//       });
//     } else {
//         originalArray.sort( (a,b) => {
//             if ( a[sortedValue] < b[sortedValue] ){
//               return -1;
//             }
//             if ( b[sortedValue] < a[sortedValue] ){
//               return 1;
//             }
//             return 0;
//           });
//     }

//     const countriesListNodes = originalArray.length < 50 ? document.querySelectorAll('.country:not([filtered])') : document.querySelectorAll('.country');
//     for (let index = 0; index < countriesListNodes.length; index += 1) {

//         if (sortedValue !== 'country') {
//             countriesListNodes[index].children[0].textContent = String(originalArray[index][sortedValue]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
//         }  else if (sortCountryListBtns.children[2].hasAttribute('sorted')) {
//                 countriesListNodes[index].children[0].textContent = String(originalArray[index].cases).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
//             }   else if (sortCountryListBtns.children[3].hasAttribute('sorted')) {
//                 countriesListNodes[index].children[0].textContent = String(originalArray[index].deaths).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
//             }   else if (sortCountryListBtns.children[4].hasAttribute('sorted')) {
//                 countriesListNodes[index].children[0].textContent = String(originalArray[index].recovered).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
//             }   
//                 else {
//                 countriesListNodes[index].children[0].textContent = String(originalArray[index].cases).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
//             }
//         countriesListNodes[index].setAttribute('data-iso2', originalArray[index].countryInfo.iso2);
//         countriesListNodes[index].setAttribute('data-iso3', originalArray[index].countryInfo.iso3);
//         countriesListNodes[index].setAttribute('data-population', originalArray[index].population);
//         countriesListNodes[index].children[1].textContent = originalArray[index].country;
//         countriesListNodes[index].style.backgroundImage = `url( https://www.countryflags.io/${originalArray[index].countryInfo.iso2}/shiny/64.png)`;
//     }
// }

// function disactiveSortBtns(){
//     for (let index = 1; index < sortCountryListBtns.childNodes.length; index += 1) {
//         sortCountryListBtns.children[index].removeAttribute('sorted');
//         sortCountryListBtns.children[index].removeAttribute('sortedPast');
//     }
// }

// countryBtn.addEventListener('click', function clickCountryBtn() {
//     for (let index = 2; index < sortCountryListBtns.childNodes.length; index += 1) {
//         if (sortCountryListBtns.children[index].hasAttribute('sorted')) {
//             sortCountryListBtns.children[index].setAttribute('sortedPast', 'yes');
//         }
//     }

//     if (this.hasAttribute('sorted')) {
//         if (this.getAttribute('sorted') === 'forward') {
//             this.setAttribute('sorted', 'reverse');
//             if (searchField.value) {
//                 sortCountriesList('country', true, searchFieldArray);
//             } else {
//                 sortCountriesList('country', true);
//             }
//         } else {
//             this.setAttribute('sorted', 'forward');
//             if (searchField.value) {
//                 sortCountriesList('country', false, searchFieldArray);
//             } else {
//                 sortCountriesList('country');
//             }      
//         }
//     } else {
//         this.setAttribute('sorted', 'forward');
//         if (searchField.value) {
//             sortCountriesList('country', false, searchFieldArray);
//         } else {
//             sortCountriesList('country');
//         }   
//     }
// })


// confirmedBtn.addEventListener('click', function clickConfirmedBtn() {
//     if (this.hasAttribute('sorted')) {
//         if (this.getAttribute('sorted') === 'forward') {
//             disactiveSortBtns();
//             this.setAttribute('sorted', 'reverse');
//             if (searchField.value) {
//                 sortCountriesList('cases', true, searchFieldArray);
//             } else {
//                 sortCountriesList('cases', true);
//             }
//         } else {
//             disactiveSortBtns();
//             this.setAttribute('sorted', 'forward');
//             if (searchField.value) {
//                 sortCountriesList('cases', false, searchFieldArray);
//             } else {
//                 sortCountriesList('cases');
//             }      
//         }
//     } else {
//         disactiveSortBtns();
//         this.setAttribute('sorted', 'forward');
//         if (searchField.value) {
//             sortCountriesList('cases', false, searchFieldArray);
//         } else {
//             sortCountriesList('cases');
//         }   
//     }
// })

// deathBtn.addEventListener('click', function clickDeathBtn() {
//       if (this.hasAttribute('sorted')) {
//         if (this.getAttribute('sorted') === 'forward') {
//             disactiveSortBtns();
//             this.setAttribute('sorted', 'reverse');
//             if (searchField.value) {
//                 sortCountriesList('deaths', true, searchFieldArray);
//             } else {
//                 sortCountriesList('deaths', true);
//             }
//         } else {
//             disactiveSortBtns();
//             this.setAttribute('sorted', 'forward')
//             if (searchField.value) {
//                 sortCountriesList('deaths', false, searchFieldArray);
//             } else {
//                 sortCountriesList('deaths');
//             } 
//         }
//     } else {
//         disactiveSortBtns();
//         this.setAttribute('sorted', 'forward');
//         if (searchField.value) {
//             sortCountriesList('deaths', false, searchFieldArray);
//         } else {
//             sortCountriesList('deaths');
//         }   
//     }
// })

// recoverBtn.addEventListener('click', function clickRecoverBtn() {
//     if (this.hasAttribute('sorted')) {
//         if (this.getAttribute('sorted') === 'forward') {
//             disactiveSortBtns();
//             this.setAttribute('sorted', 'reverse');
//             if (searchField.value) {
//                 sortCountriesList('recovered', true, searchFieldArray);
//             } else {
//                 sortCountriesList('recovered', true);
//             }
//         } else {
//             disactiveSortBtns();
//             this.setAttribute('sorted', 'forward')
//             if (searchField.value) {
//                 sortCountriesList('recovered', false, searchFieldArray);
//             } else {
//                 sortCountriesList('recovered');
//             } 
//         }
//     } else {
//         disactiveSortBtns();
//         this.setAttribute('sorted', 'forward');
//         if (searchField.value) {
//             sortCountriesList('recovered', false, searchFieldArray);
//         } else {
//             sortCountriesList('recovered');
//         }  
//     }
// })


// export default summarySelectedCountryData;

// var _lsTotal=0,_xLen,_x;for(_x in localStorage){ if(!localStorage.hasOwnProperty(_x)){continue;} _xLen= ((localStorage[_x].length + _x.length)* 2);_lsTotal+=_xLen; console.log(_x.substr(0,50)+" = "+ (_xLen/1024).toFixed(2)+" KB")};console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");