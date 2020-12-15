const tableTotalWrapper = document.createElement('div');
const tableTotalInfoWrapper = document.createElement('div');
const tableTotalInfoWrapperReverse = document.createElement('div');
tableTotalInfoWrapper.classList.add('tableTotalInfoWrapper');
tableTotalInfoWrapperReverse.classList.add('tableTotalInfoWrapperReverse');

const tableTotalAddInfoBtn = document.createElement('div');
const tableTotalDailyInfoBtn = document.createElement('div');
tableTotalAddInfoBtn.classList.add('tableTotalAddInfoBtn');
tableTotalDailyInfoBtn.classList.add('tableTotalDailyInfoBtn');
tableTotalWrapper.classList.add('tableTotalWrapper');

tableTotalAddInfoBtn.textContent = 'More'
tableTotalDailyInfoBtn.textContent = 'Today';


const tableTotalDateWrapper = document.createElement('div');
tableTotalDateWrapper.classList.add('tableTotalDateWrapper');
const tableTotalDateTitle = document.createElement('h2');
const tableTotalDate = document.createElement('h3');
tableTotalDate.classList.add('tableTotalDate');
tableTotalDateTitle.textContent = 'last update'
tableTotalDateWrapper.appendChild(tableTotalDateTitle);
tableTotalDateWrapper.appendChild(tableTotalDate);

const tableTotalCases = document.createElement('div');
const tableTotalCasesTitle = document.createElement('h2');
const tableTotalCasesCounter = document.createElement('h3');
tableTotalCases.classList.add('tableTotalCases');
tableTotalCasesTitle.classList.add('tableTotalCasesTitle');
tableTotalCasesCounter.classList.add('tableTotalCasesCounter');
tableTotalCases.appendChild(tableTotalCasesTitle);
tableTotalCases.appendChild(tableTotalCasesCounter);

const tableTotalDeaths = document.createElement('div');
const tableTotalDeathsTitle = document.createElement('h2');
const tableTotalDeathsCounter = document.createElement('h3');
tableTotalDeaths.classList.add('tableTotalDeaths');
tableTotalDeathsTitle.classList.add('tableTotalDeathsTitle');
tableTotalDeathsCounter.classList.add('tableTotalDeathsCounter');
tableTotalDeaths.appendChild(tableTotalDeathsTitle);
tableTotalDeaths.appendChild(tableTotalDeathsCounter);

const tableTotalRecovered = document.createElement('div');
const tableTotalRecoveredTitle = document.createElement('h2');
const tableTotalRecoveredCounter = document.createElement('h3'); 
tableTotalRecovered.classList.add('tableTotalRecovered');
tableTotalRecoveredTitle.classList.add('tableTotalRecoveredTitle');
tableTotalRecoveredCounter.classList.add('tableTotalRecoveredCounter');
tableTotalRecovered.appendChild(tableTotalRecoveredTitle);
tableTotalRecovered.appendChild(tableTotalRecoveredCounter);

const tableTotalTests = document.createElement('div');
const tableTotalTestsTitle = document.createElement('h2');
const tableTestsCounter = document.createElement('h3'); 
tableTotalTests.classList.add('tableTotalTests');
tableTotalTestsTitle.classList.add('tableTotalTestsTitle');
tableTestsCounter.classList.add('tableTestsCounter');
tableTotalTests.appendChild(tableTotalTestsTitle);
tableTotalTests.appendChild(tableTestsCounter);

tableTotalCasesTitle.textContent = "global confirmed :";
tableTotalDeathsTitle.textContent = "global deaths :";
tableTotalRecoveredTitle.textContent = 'global recovered :';
tableTotalTestsTitle.textContent = 'global tests :';

// dayly -------------------------------------------------------------------

const tableTotalDailyCases = document.createElement('div');
const tableTotalDailyCasesTitle = document.createElement('h2');
const tableTotalDailyCasesCounter = document.createElement('h3');
tableTotalDailyCases.classList.add('tableTotalCases');
tableTotalDailyCasesTitle.classList.add('tableTotalCasesTitle');
tableTotalDailyCasesCounter.classList.add('tableTotalCasesCounter');
tableTotalDailyCases.appendChild(tableTotalDailyCasesTitle);
tableTotalDailyCases.appendChild(tableTotalDailyCasesCounter);

const tableTotalDailyDeaths = document.createElement('div');
const tableTotalDailyDeathsTitle = document.createElement('h2');
const tableTotalDailyDeathsCounter = document.createElement('h3');
tableTotalDailyDeaths.classList.add('tableTotalDeaths');
tableTotalDailyDeathsTitle.classList.add('tableTotalDeathsTitle');
tableTotalDailyDeathsCounter.classList.add('tableTotalDeathsCounter');
tableTotalDailyDeaths.appendChild(tableTotalDailyDeathsTitle);
tableTotalDailyDeaths.appendChild(tableTotalDailyDeathsCounter);

const tableTotalDailyRecovered = document.createElement('div');
const tableTotalDailyRecoveredTitle = document.createElement('h2');
const tableTotalDailyRecoveredCounter = document.createElement('h3'); 
tableTotalDailyRecovered.classList.add('tableTotalRecovered');
tableTotalDailyRecoveredTitle.classList.add('tableTotalRecoveredTitle');
tableTotalDailyRecoveredCounter.classList.add('tableTotalRecoveredCounter');
tableTotalDailyRecovered.appendChild(tableTotalDailyRecoveredTitle);
tableTotalDailyRecovered.appendChild(tableTotalDailyRecoveredCounter);

const tableTotalDailyTests = document.createElement('div');
const tableTotalDailyTestsTitle = document.createElement('h2');
const tableTestsDailyCounter = document.createElement('h3'); 
tableTotalDailyTests.classList.add('tableTotalTests');
tableTotalDailyTestsTitle.classList.add('tableTotalTestsTitle');
tableTestsDailyCounter.classList.add('tableTestsCounter');
tableTotalDailyTests.appendChild(tableTotalDailyTestsTitle);
tableTotalDailyTests.appendChild(tableTestsDailyCounter);

tableTotalDailyCasesTitle.textContent = "today confirmed :";
tableTotalDailyDeathsTitle.textContent = "today deaths :";
tableTotalDailyRecoveredTitle.textContent = 'today recovered :';
tableTotalDailyTestsTitle.textContent = 'tests per million :';

const fullScreenBtn = document.createElement('div');
fullScreenBtn.classList.add('fullScreenTotalTable');

let casesCache;
let deatsCache;
let recoveryCache;
let testsCache;
let activeCases;
let criticalCases;
let affectedCountries;
let population;


(async function getTotalData() {
    const response = await fetch(`https://disease.sh/v3/covid-19/all?yesterday=false&twoDaysAgo=false`);
    const todayData  = await response.json();
    const upDate = new Date(todayData.updated)
    tableTotalDate.textContent = upDate.toString().replace(/GMT.*/, '');

    tableTotalCasesCounter.textContent = String(todayData.cases).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    tableTotalDeathsCounter.textContent = String(todayData.deaths).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    tableTotalRecoveredCounter.textContent = String(todayData.recovered).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    tableTestsCounter.textContent = String(todayData.tests).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    tableTotalDailyCasesCounter.textContent = String(todayData.todayCases).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    casesCache = tableTotalDailyCasesCounter.textContent;
    tableTotalDailyDeathsCounter.textContent = String(todayData.todayDeaths).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    deatsCache = tableTotalDailyDeathsCounter.textContent;
    tableTotalDailyRecoveredCounter.textContent = String(todayData.todayRecovered).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    recoveryCache = tableTotalDailyRecoveredCounter.textContent;
    tableTestsDailyCounter.textContent = String(todayData.testsPerOneMillion).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    testsCache = tableTestsDailyCounter.textContent;

    activeCases = String(todayData.active).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    criticalCases = String(todayData.critical).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    affectedCountries = String(todayData.affectedCountries).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    population = String(todayData.population).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

})();

tableTotalInfoWrapper.appendChild(tableTotalCases);
tableTotalInfoWrapper.appendChild(tableTotalDeaths);
tableTotalInfoWrapper.appendChild(tableTotalRecovered);
tableTotalInfoWrapper.appendChild(tableTotalTests);

tableTotalInfoWrapperReverse.appendChild(tableTotalDailyCases);
tableTotalInfoWrapperReverse.appendChild(tableTotalDailyDeaths);
tableTotalInfoWrapperReverse.appendChild(tableTotalDailyRecovered);
tableTotalInfoWrapperReverse.appendChild(tableTotalDailyTests);

tableTotalWrapper.appendChild(tableTotalDateWrapper);
tableTotalWrapper.appendChild(tableTotalInfoWrapper);
tableTotalWrapper.appendChild(tableTotalInfoWrapperReverse);
tableTotalWrapper.appendChild(tableTotalDailyInfoBtn);
tableTotalWrapper.appendChild(tableTotalAddInfoBtn);
tableTotalWrapper.appendChild(fullScreenBtn);

tableTotalAddInfoBtn.addEventListener('click', function clickTableTotalAddInfoBtn() {
    if(this.classList.contains('active')) {
        this.classList.remove('active');
        tableTotalInfoWrapper.classList.remove('rotated');
        tableTotalInfoWrapperReverse.classList.remove('rotated');

        this.animate([
            {}, 
            { opacity: '0' },
            { }
          ], {
            duration: 1000,
          })
          setTimeout(() => {
            tableTotalAddInfoBtn.textContent = 'more';
            tableTotalDailyCasesCounter.textContent = casesCache;
            tableTotalDailyDeathsCounter.textContent = deatsCache;
            tableTotalDailyRecoveredCounter.textContent = recoveryCache;
            tableTestsDailyCounter.textContent = testsCache;
            tableTotalDailyCasesTitle.textContent = "today confirmed :";
            tableTotalDailyDeathsTitle.textContent = "today deaths :";
            tableTotalDailyRecoveredTitle.textContent = 'today recovered :';
            tableTotalDailyTestsTitle.textContent = 'tests per million :';
            }, 500);

            tableTotalDailyInfoBtn.classList.remove('disactive');
    } else {
        this.classList.add('active');
        tableTotalInfoWrapper.classList.add('rotated');
        tableTotalInfoWrapperReverse.classList.add('rotated');
        tableTotalDailyCasesCounter.textContent = activeCases;
        tableTotalDailyDeathsCounter.textContent = criticalCases;
        tableTotalDailyRecoveredCounter.textContent = affectedCountries;
        tableTestsDailyCounter.textContent = population;

        this.animate([
            {}, 
            { opacity: '0' },
            {}
          ], {
            duration: 1000,
          })
          setTimeout(() => {
            tableTotalAddInfoBtn.textContent = 'less';
            tableTotalDailyCasesTitle.textContent = "active :";
            tableTotalDailyDeathsTitle.textContent = "critical :";
            tableTotalDailyRecoveredTitle.textContent = 'affected countries :';
            tableTotalDailyTestsTitle.textContent = 'population :';
              
            }, 300);
            tableTotalDailyInfoBtn.classList.add('disactive');
    }
})

tableTotalDailyInfoBtn.addEventListener('click', function clickTableTotalDailyInfoBtn() {
    if(this.classList.contains('active')) {
        this.classList.remove('active');
        tableTotalInfoWrapper.classList.remove('rotated');
        tableTotalInfoWrapperReverse.classList.remove('rotated');
        this.animate([
            {}, 
            { opacity: '0' },
            { }
          ], {
            duration: 1000,
          })
          setTimeout(() => {
              tableTotalDailyInfoBtn.textContent = 'daily';
              
            }, 500);

        tableTotalAddInfoBtn.classList.remove('disactive');
        
    } else {
        this.classList.add('active');
        tableTotalInfoWrapper.classList.add('rotated');
        tableTotalInfoWrapperReverse.classList.add('rotated');
        this.animate([
            {}, 
            { opacity: '0' },
            {}
          ], {
            duration: 1000,
          })
          setTimeout(() => {
              tableTotalDailyInfoBtn.textContent = 'all'
              
            }, 500);
            tableTotalAddInfoBtn.classList.add('disactive');
    }
})

fullScreenBtn.addEventListener('click', function clickFullScreenBtn(){
  tableTotalWrapper.classList.toggle('fullScreen');
})

document.body.appendChild(tableTotalWrapper);
