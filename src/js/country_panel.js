import {myChart, graphConfig} from './graph_1';
import getTotalData from './table_total';

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
confirmedBtn.textContent = 'confirmed';
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

// document.body.appendChild(recieveDataBtns);
document.body.appendChild(countriesModule);


// -----------------------search field logic -----------------------------------

let searchFieldArray; //тут для сортировки, когда ввели в поиске что-то
searchField.addEventListener("input", function (event) {
    searchFieldArray = {'Countries' : []};
    let searchString = event.target.value; 
    let options = countriesList.childNodes; 
    for (let i = 0; i < options.length; i++) {
        let regex = new RegExp("^" + searchString, "i");
        let match =  options[i].children[1].textContent.match(regex);

        if (!match ) {
            options[i].style.display = 'none';
            options[i].setAttribute('filtered', 'yes');
        } else {
            if (searchString) {
                let obj = summaryData.Countries.find(element => element.Country === options[i].children[1].textContent);
                searchFieldArray.Countries.push(obj);
            }
            options[i].removeAttribute('filtered');
            options[i].style.display = 'block';
        }
    }
});

// -------------------get countries list and data ----------------------------------
let summaryData; 
let summarySelectedCountryData;
// тут объект вида {Countries: [192x{массив с 192 объектами стран}], Date: 'дата последних данных',
// Global {NewConfirmed: 668755, TotalConfirmed: 68884181, NewDeaths: 12540, TotalDeaths: 1569277, NewRecovered: 425817} }

//let countryFlagsAndPopulationData; // !!!! МОЖЕТ НЕ ПОНАДОБИТЬСЯтут объект вида [{flag: "https://restcountries.eu/data/afg.svg", name: "Afghanistan", population: 27657145}x255, ..]

// (async function getCountryFlagsAndPopulation() {
// const response = await fetch(`https://restcountries.eu/rest/v2/all?fields=name;population;flag`)
// const data  = await response.json();
// countryFlagsAndPopulationData = data;
// console.log(getCountryFlagsAndPopulation)
// })();


// async function getAllCountries() {
//     const response = await fetch(`https://api.covid19api.com/summary`)
//     const data  = await response.json();
//     summaryData = data;
//     console.log(data)
//     return data;    
// };

(async function countries () {
    // summaryData = await getTotalData();
    summaryData = (await getTotalData()).default; //убрать
    console.log(summaryData.default)  //убрать

    for (let index = 0; index < summaryData.Countries.length; index++) {
        const option = document.createElement('div');
        option.classList.add('country');
        const spanValaue = document.createElement('span');
        const spanCountryName = document.createElement('span');

        spanValaue.classList.add('optionValue');
        spanCountryName.classList.add('optionCountryName');

        spanValaue.textContent = String(summaryData.Countries[index].TotalConfirmed).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        spanCountryName.textContent = summaryData.Countries[index].Country;

        option.setAttribute('TotalConfirmed', `${summaryData.Countries[index].TotalConfirmed}`);
        option.setAttribute('TotalDeaths', `${summaryData.Countries[index].TotalDeaths}`);
        option.setAttribute('TotalRecovered', `${summaryData.Countries[index].TotalRecovered}`);
        
        option.appendChild(spanValaue);
        option.appendChild(spanCountryName);
      
        option.style.backgroundImage = `url( https://www.countryflags.io/${summaryData.Countries[index].CountryCode}/shiny/64.png)`;

        option.addEventListener('click', async function(){
            async function getTotalCountryData() {
            const response = await fetch(`https://api.covid19api.com/dayone/country/south-africa`)
            const data  = await response.json();
            summarySelectedCountryData = data;
            return data; 
        };
        })

        countriesList.appendChild(option);  
    }
})()


function sortCountriesList (sortedValue, sortReverse, originalArray = summaryData) {
    if (!sortReverse) {
        originalArray.Countries.sort(function (a,b) {
        if ( a[sortedValue] > b[sortedValue] ){
          return -1;
        }
        if ( b[sortedValue] > a[sortedValue] ){
          return 1;
        }
        return 0;
      });
    } else {
        originalArray.Countries.sort(function (a,b) {
            if ( a[sortedValue] < b[sortedValue] ){
              return -1;
            }
            if ( b[sortedValue] < a[sortedValue] ){
              return 1;
            }
            return 0;
          });
    }

    const countriesListNodes = originalArray.Countries.length < 50 ? document.querySelectorAll('.country:not([filtered])') : document.querySelectorAll('.country');
    for (let index = 0; index < countriesListNodes.length; index++) {
        countriesListNodes[index].setAttribute('TotalConfirmed', `${originalArray.Countries[index].TotalConfirmed}`);
        countriesListNodes[index].setAttribute('TotalDeaths', `${originalArray.Countries[index].TotalDeaths}`);
        countriesListNodes[index].setAttribute('TotalRecovered', `${originalArray.Countries[index].TotalRecovered}`);
        if (sortedValue !== 'Country') {
            countriesListNodes[index].children[0].textContent = String(originalArray.Countries[index][sortedValue]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }  else {
            if (sortCountryListBtns.children[2].hasAttribute('sorted')) {
                countriesListNodes[index].children[0].textContent = String(originalArray.Countries[index].TotalConfirmed).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }   else if (sortCountryListBtns.children[3].hasAttribute('sorted')) {
                countriesListNodes[index].children[0].textContent = String(originalArray.Countries[index].TotalDeaths).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }   else if (sortCountryListBtns.children[4].hasAttribute('sorted')) {
                countriesListNodes[index].children[0].textContent = String(originalArray.Countries[index].TotalRecovered).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }   
                else {
                countriesListNodes[index].children[0].textContent = String(originalArray.Countries[index].TotalConfirmed).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            }
        }
        countriesListNodes[index].children[1].textContent = originalArray.Countries[index].Country;
        countriesListNodes[index].style.backgroundImage = `url( https://www.countryflags.io/${originalArray.Countries[index].CountryCode}/shiny/64.png)`;
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
                sortCountriesList('Country', true, searchFieldArray);
            } else {
                sortCountriesList('Country', true);
            }
        } else {
            this.setAttribute('sorted', 'forward');
            if (searchField.value) {
                sortCountriesList('Country', false, searchFieldArray);
            } else {
                sortCountriesList('Country');
            }      
        }
    } else {
        this.setAttribute('sorted', 'forward');
        if (searchField.value) {
            sortCountriesList('Country', false, searchFieldArray);
        } else {
            sortCountriesList('Country');
        }   
    }
})


confirmedBtn.addEventListener('click', function() {
    if (this.hasAttribute('sorted')) {
        if (this.getAttribute('sorted') === 'forward') {
            disactiveSortBtns();
            this.setAttribute('sorted', 'reverse');
            if (searchField.value) {
                sortCountriesList('TotalConfirmed', true, searchFieldArray);
            } else {
                sortCountriesList('TotalConfirmed', true);
            }
        } else {
            disactiveSortBtns();
            this.setAttribute('sorted', 'forward');
            if (searchField.value) {
                sortCountriesList('TotalConfirmed', false, searchFieldArray);
            } else {
                sortCountriesList('TotalConfirmed');
            }      
        }
    } else {
        disactiveSortBtns();
        this.setAttribute('sorted', 'forward');
        if (searchField.value) {
            sortCountriesList('TotalConfirmed', false, searchFieldArray);
        } else {
            sortCountriesList('TotalConfirmed');
        }   
    }
})

deathBtn.addEventListener('click', function() {
      if (this.hasAttribute('sorted')) {
        if (this.getAttribute('sorted') === 'forward') {
            disactiveSortBtns();
            this.setAttribute('sorted', 'reverse');
            if (searchField.value) {
                sortCountriesList('TotalDeaths', true, searchFieldArray);
            } else {
                sortCountriesList('TotalDeaths', true);
            }
        } else {
            disactiveSortBtns();
            this.setAttribute('sorted', 'forward')
            if (searchField.value) {
                sortCountriesList('TotalDeaths', false, searchFieldArray);
            } else {
                sortCountriesList('TotalDeaths');
            } 
        }
    } else {
        disactiveSortBtns();
        this.setAttribute('sorted', 'forward');
        if (searchField.value) {
            sortCountriesList('TotalDeaths', false, searchFieldArray);
        } else {
            sortCountriesList('TotalDeaths');
        }   
    }
})

recoverBtn.addEventListener('click', function() {
    if (this.hasAttribute('sorted')) {
        if (this.getAttribute('sorted') === 'forward') {
            disactiveSortBtns();
            this.setAttribute('sorted', 'reverse');
            if (searchField.value) {
                sortCountriesList('TotalRecovered', true, searchFieldArray);
            } else {
                sortCountriesList('TotalRecovered', true);
            }
        } else {
            disactiveSortBtns();
            this.setAttribute('sorted', 'forward')
            if (searchField.value) {
                sortCountriesList('TotalRecovered', false, searchFieldArray);
            } else {
                sortCountriesList('TotalRecovered');
            } 
        }
    } else {
        disactiveSortBtns();
        this.setAttribute('sorted', 'forward');
        if (searchField.value) {
            sortCountriesList('TotalRecovered', false, searchFieldArray);
        } else {
            sortCountriesList('TotalRecovered');
        }  
    }
})

export default summarySelectedCountryData;