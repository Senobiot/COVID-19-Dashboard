const tableTotalWrapper = document.createElement('div');
tableTotalWrapper.classList.add('tableTotalWrapper');

const tableTotalDateWrapper = document.createElement('div');
const tableTotalDateTitle = document.createElement('h2');
const tableTotalDate = document.createElement('h3');
   
tableTotalDate.classList.add('tableTotalDate');

tableTotalDateTitle.textContent = 'last update'

tableTotalDateWrapper.appendChild(tableTotalDateTitle);
tableTotalDateWrapper.appendChild(tableTotalDate);

const tableTotalCases = document.createElement('div');
const tableTotalCasesTitle = document.createElement('h2');
const tableTotalCasesCounter = document.createElement('h4');
   
tableTotalCases.classList.add('tableTotalCases');
tableTotalCasesTitle.classList.add('tableTotalCasesTitle');
tableTotalCasesCounter.classList.add('tableTotalCasesCounter');

tableTotalCases.appendChild(tableTotalCasesTitle);
tableTotalCases.appendChild(tableTotalCasesCounter);

const tableTotalDeaths = document.createElement('div');
const tableTotalDeathsTitle = document.createElement('h3');
const tableTotalDeathsCounter = document.createElement('h4');
   
tableTotalDeaths.classList.add('tableTotalDeaths');
tableTotalDeathsTitle.classList.add('tableTotalDeathsTitle');
tableTotalDeathsCounter.classList.add('tableTotalDeathsCounter');

tableTotalDeaths.appendChild(tableTotalDeathsTitle);
tableTotalDeaths.appendChild(tableTotalDeathsCounter);

const tableTotalRecovered = document.createElement('div');
const tableTotalRecoveredTitle = document.createElement('h3');
const tableTotalRecoveredCounter = document.createElement('h4');
   
tableTotalRecovered.classList.add('tableTotalRecovered');
tableTotalRecoveredTitle.classList.add('tableTotalRecoveredTitle');
tableTotalRecoveredCounter.classList.add('tableTotalRecoveredCounter');

tableTotalRecovered.appendChild(tableTotalRecoveredTitle);
tableTotalRecovered.appendChild(tableTotalRecoveredCounter);

tableTotalCasesTitle.textContent = "global confirmed";
tableTotalDeathsTitle.textContent = "global deaths";
tableTotalRecoveredTitle.textContent = 'global recovered';

(async function getTotalData() {
    const response = await fetch(`https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false`)
    const todayData  = await response.json();
    const upDate = new Date(todayData.updated)
    tableTotalDate.textContent = upDate.toString().replace(/GMT.*/, '');

    tableTotalCasesCounter.textContent = String(todayData.cases).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    tableTotalDeathsCounter.textContent = String(todayData.deaths).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    tableTotalRecoveredCounter.textContent = String(todayData.recovered).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
})();


tableTotalWrapper.appendChild(tableTotalDateWrapper);
tableTotalWrapper.appendChild(tableTotalCases);
tableTotalWrapper.appendChild(tableTotalDeaths);
tableTotalWrapper.appendChild(tableTotalRecovered);

document.body.appendChild(tableTotalWrapper);
