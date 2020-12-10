let tableTotalWrapper = document.createElement('div');
tableTotalWrapper.classList.add('tableTotalWrapper');

let tableTotalCases = document.createElement('div');
let tableTotalCasesTitle = document.createElement('h2');
let tableTotalCasesCounter = document.createElement('h4');
   
tableTotalCases.classList.add('tableTotalCases');
tableTotalCasesTitle.classList.add('tableTotalCasesTitle');
tableTotalCasesCounter.classList.add('tableTotalCasesCounter');

tableTotalCases.appendChild(tableTotalCasesTitle);
tableTotalCases.appendChild(tableTotalCasesCounter);


let tableTotalDeaths = document.createElement('div');
let tableTotalDeathsTitle = document.createElement('h3');
let tableTotalDeathsCounter = document.createElement('h4');
   
tableTotalDeaths.classList.add('tableTotalDeaths');
tableTotalDeathsTitle.classList.add('tableTotalDeathsTitle');
tableTotalDeathsCounter.classList.add('tableTotalDeathsCounter');

tableTotalDeaths.appendChild(tableTotalDeathsTitle);
tableTotalDeaths.appendChild(tableTotalDeathsCounter);

let tableTotalRecovered = document.createElement('div');
let tableTotalRecoveredTitle = document.createElement('h3');
let tableTotalRecoveredCounter = document.createElement('h4');
   
tableTotalRecovered.classList.add('tableTotalRecovered');
tableTotalRecoveredTitle.classList.add('tableTotalRecoveredTitle');
tableTotalRecoveredCounter.classList.add('tableTotalRecoveredCounter');

tableTotalRecovered.appendChild(tableTotalRecoveredTitle);
tableTotalRecovered.appendChild(tableTotalRecoveredCounter);

tableTotalCasesTitle.textContent = "world total cases";
tableTotalDeathsTitle.textContent = "world total deaths";
tableTotalRecoveredTitle.textContent = 'world total recovered';


(async function getTotalData() {
    let response = await fetch(`https://api.covid19api.com/summary`)
    let data  = await response.json();
    tableTotalCasesCounter.textContent = String(data.Global.TotalConfirmed).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    tableTotalDeathsCounter.textContent = String(data.Global.TotalDeaths).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    tableTotalRecoveredCounter.textContent = String(data.Global.TotalRecovered).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    return data;     
})();

tableTotalWrapper.appendChild(tableTotalCases);
tableTotalWrapper.appendChild(tableTotalDeaths);
tableTotalWrapper.appendChild(tableTotalRecovered);

document.body.appendChild(tableTotalWrapper);



// количество случаев заболевания
// количество летальных исходов
// количество выздоровевших