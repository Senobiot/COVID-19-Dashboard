/* eslint-disable max-len */
export default class CreateStatistics {
  constructor(body) {
    this.body = body;
    this.wrapperTable = '';
    this.properties = ['Daily Cases', 'Daily Deaths', 'Daily Recovered', 'Summary Confirmed', 'Summary Deaths', 'Summary Recovered'];
    this.dataAttributes = ['todayCases', 'todayDeaths', 'todayRecovered', 'cases', 'deaths', 'recovered'];
    this.arrayContinents = ['N. America', 'Asia', 'S. America', 'Europe', 'Africa', 'Australia'];
  }

  static transformNumbers(number) {
    return String(number).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  createTableStatistics(srcImg, title, current) {
    this.wrapperTable = CreateStatistics.createDomElement('div', 'wrapper-statistics');
    this.body.append(this.wrapperTable);
    this.generateTableStatistics(srcImg, title, current);
  }

  generateTableStatistics(srcImg, title, current) {
    this.statisticsContent = CreateStatistics.createDomElement('div', 'statistics__content');
    const headerStatistics = CreateStatistics.createDomElement('div', 'statistics__header');
    const subTitle = CreateStatistics.createDomElement('div', 'statistics__subtitle');
    subTitle.innerHTML = '<div class="statistics__region active_tab">Current region</div><div class="statistics__continents">Continents</div>';
    headerStatistics.innerText = 'STATISTICS';
    this.continents = CreateStatistics.createDomElement('div', 'continents');
    this.wrapperTable.append(headerStatistics);
    this.wrapperTable.append(subTitle);
    this.wrapperTable.append(this.statisticsContent);
    this.statisticsContent.append(this.continents);
    this.generateCurrentStatistics(current, srcImg, title);
    this.createFullScreen();
    this.fullScreen.addEventListener('click', () => {
      this.wrapperTable.classList.toggle('fullScreen');
    });
    subTitle.addEventListener('mouseup', (e) => {
      const item = e.target;
      const currentItem = e.currentTarget;
      if (item.classList.contains('statistics__region')) {
        this.continents.classList.remove('statistics_active');
        this.wrappercurrentStatistics.classList.add('statistics_active');
        item.classList.add('active_tab');
        currentItem.querySelector('.statistics__continents').classList.remove('active_tab');
      } else if (item.classList.contains('statistics__continents')) {
        this.continents.classList.add('statistics_active');
        this.wrappercurrentStatistics.classList.remove('statistics_active');
        item.classList.add('active_tab');
        currentItem.querySelector('.statistics__region').classList.remove('active_tab');
      }
    });
  }

  generateCurrentStatistics(current, srcImg, title) {
    this.currentProperty = CreateStatistics.createDomElement('div', 'current__property');
    this.currentProperty.innerText = `${current}`;
    this.currentData = CreateStatistics.createDomElement('div', 'current__data');
    this.currentData.style.color = '#675D04';
    this.iconCountry = CreateStatistics.createDomElement('img', 'statistics__icon');
    this.iconCountry.src = `${srcImg}`;
    const currentRegion = CreateStatistics.createDomElement('div', 'current__region');
    this.currentText = CreateStatistics.createDomElement('div', 'current__text');
    this.currentText.innerText = `${title}`;
    const currentStatistics = CreateStatistics.createDomElement('div', 'current__statistics');
    this.wrappercurrentStatistics = CreateStatistics.createDomElement('div', 'wrapper-current-statistics', 'statistics_active');
    this.wrappercurrentStatistics.append(currentStatistics);
    this.statisticsContent.append(this.wrappercurrentStatistics);
    currentRegion.append(this.iconCountry);
    currentRegion.append(this.currentText);
    currentStatistics.append(this.currentProperty);
    currentStatistics.append(this.currentData);
    currentStatistics.append(currentRegion);
    this.generateSwitch();
  }

  static getPerPopulation(data, population) {
    const countThousands = population / 100000;
    return Number((data / countThousands).toFixed(2));
  }

  generateListStatistics(data, population, isTotal) {
    let additionalNumber = 0;
    if (isTotal) {
      additionalNumber = 6;
    }
    if (this.list) {
      this.list.remove();
    }
    const arraryData = [data.todayCases, data.todayDeaths, data.todayRecovered, data.cases, data.deaths, data.recovered];
    const arraryDataPerPopulation = arraryData.reduce((arr, element) => arr.concat(CreateStatistics.getPerPopulation(element, population)), []);// расчет на 100 тыс. населения
    this.arraryData = arraryData.concat(arraryDataPerPopulation);
    this.currentData.innerText = `${String(this.arraryData[3]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}`;
    this.list = CreateStatistics.createDomElement('ul', 'list__statistics');
    this.properties.forEach((element, index) => {
      const li = CreateStatistics.createDomElement('li', 'item__statistics');
      li.dataset.key = `${this.dataAttributes[index]}`;
      li.dataset.index = index + additionalNumber;
      const text = String(this.arraryData[index + additionalNumber]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
      li.innerHTML = `<span>${element}</span><span class="property">${text}</span>`;
      this.list.append(li);
    });
    this.wrappercurrentStatistics.append(this.list);
  }

  generateSwitch() {
    const wrapperSwitch = CreateStatistics.createDomElement('div', 'wrapper-switch');
    this.switchToggle = CreateStatistics.createDomElement('div', 'switch__statistics');
    this.switchToggle.innerHTML = '<input class="graphSwitcherData" type="checkbox">';
    this.switchToggle.dataset.index = 3;

    wrapperSwitch.append(this.switchToggle);

    this.wrapperTable.append(wrapperSwitch);
  }

  setCurrentProperty(index) {
    this.currentData.innerText = String(this.arraryData[index]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    let indexProperty = index;
    if (index > 5) {
      indexProperty = index - 6;
    }
    this.currentProperty.innerText = this.properties[indexProperty];
    if (index % 3 === 0 || index === 0) {
      this.currentData.style.color = '#675D04';
    } else if ((index - 1) % 3 === 0 || index === 1) {
      this.currentData.style.color = '#84272F';
    } else if ((index - 2) % 3 === 0 || index === 2) {
      this.currentData.style.color = '#1B481B';
    }
  }

  switchToggleExportEvent(index) {
    const checkbox = this.switchToggle.querySelector('input');
    if (index > 5) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    this.setCurrentProperty(index);
  }

  setCurrentCountry(isoCountry, country) {
    this.iconCountry.src = `https://www.countryflags.io/${isoCountry}/shiny/64.png`;
    this.currentText.innerText = country;
  }

  setCurrentData(index) {
    this.currentData.innerText = String(this.arraryData[index]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  async getTotalDataContinents() {
    const response = await fetch('https://disease.sh/v3/covid-19/continents?yesterday=false&twoDaysAgo=false');
    this.totalDataContinents = await response.json();
  }

  createPropertyContinent() {
    const ul = CreateStatistics.createDomElement('ul', 'list-properties');
    this.properties.forEach((element) => {
      const li = CreateStatistics.createDomElement('li', 'item__properties');
      li.innerText = element;
      ul.append(li);
    });
    this.continents.append(ul);
  }

  async createContinents() {
    this.createPropertyContinent();
    await this.getTotalDataContinents();
    this.totalDataContinents.forEach((element, index) => {
      const ul = CreateStatistics.createDomElement('ul', 'list-continent');
      const liRegion = CreateStatistics.createDomElement('li', 'item__region');
      liRegion.innerText = this.arrayContinents[index];
      const liDailyCases = CreateStatistics.createDomElement('li', 'color__confirmed');
      liDailyCases.innerText = CreateStatistics.transformNumbers(element.todayCases);
      const liDailyDeaths = CreateStatistics.createDomElement('li', 'color__deaths');
      liDailyDeaths.innerText = CreateStatistics.transformNumbers(element.todayDeaths);
      const liDailyRecovered = CreateStatistics.createDomElement('li', 'color__recovered');
      liDailyRecovered.innerText = CreateStatistics.transformNumbers(element.todayRecovered);
      const liSumConfirmed = CreateStatistics.createDomElement('li', 'color__confirmed');
      liSumConfirmed.innerText = CreateStatistics.transformNumbers(element.cases);
      const liSumDeaths = CreateStatistics.createDomElement('li', 'color__deaths');
      liSumDeaths.innerText = CreateStatistics.transformNumbers(element.deaths);
      const liSumRecovered = CreateStatistics.createDomElement('li', 'color__recovered');
      liSumRecovered.innerText = CreateStatistics.transformNumbers(element.recovered);
      ul.append(liRegion);
      ul.append(liDailyCases);
      ul.append(liDailyDeaths);
      ul.append(liDailyRecovered);
      ul.append(liSumConfirmed);
      ul.append(liSumDeaths);
      ul.append(liSumRecovered);
      this.continents.append(ul);
    });
  }

  createFullScreen() {
    this.fullScreen = CreateStatistics.createDomElement('div', 'fullScreenGraph');
    this.wrapperTable.append(this.fullScreen);
  }

  static createDomElement(element, ...className) {
    const node = document.createElement(element);
    if (className.length > 0) node.classList.add(...className);
    return node;
  }
}
