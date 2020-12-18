/* eslint-disable max-len */
export default class CreateStatistics {
  constructor(body) {
    this.body = body;
    this.wrapperTable = '';
    this.properties = ['Daily Cases', 'Daily Deaths', 'Daily Recovered', 'Summary Confirmed', 'Summary Deaths', 'Summary Recovered'];
    this.dataAttributes = ['todayCases', 'todayDeaths', 'todayRecovered', 'cases', 'deaths', 'recovered'];
  }

  createTableStatistics(srcImg, title, current) {
    this.wrapperTable = CreateStatistics.createDomElement('div', 'wrapper-statistics');
    this.body.append(this.wrapperTable);
    this.generateTableStatistics(srcImg, title, current);
  }

  generateTableStatistics(srcImg, title, current) {
    this.statisticsContent = CreateStatistics.createDomElement('div', 'statistics__content');
    const headerStatistics = CreateStatistics.createDomElement('div', 'statistics__header');
    headerStatistics.innerText = 'STATISTICS';
    this.wrapperTable.append(headerStatistics);
    this.wrapperTable.append(this.statisticsContent);
    this.generateCurrentStatistics(current, srcImg, title);
  }

  generateCurrentStatistics(current, srcImg, title) {
    this.currentProperty = CreateStatistics.createDomElement('div', 'current__property');
    this.currentProperty.innerText = `${current}`;
    this.currentData = CreateStatistics.createDomElement('div', 'current__data');
    this.currentData.style.color = '#675D04';
    const iconCountry = CreateStatistics.createDomElement('img', 'statistics__icon');
    iconCountry.src = `${srcImg}`;
    const currentRegion = CreateStatistics.createDomElement('div', 'current__region');
    const currentText = CreateStatistics.createDomElement('div', 'current__text');
    currentText.innerText = `${title}`;
    const currentStatistics = CreateStatistics.createDomElement('div', 'current__statistics');
    currentRegion.append(iconCountry);
    currentRegion.append(currentText);
    currentStatistics.append(this.currentProperty);
    currentStatistics.append(this.currentData);
    currentStatistics.append(currentRegion);
    this.statisticsContent.append(currentStatistics);
    this.generateSwitch();
  }

  static getPerPopulation(data, population) {
    const countThousands = population / 100000;
    return Number((data / countThousands).toFixed(3));
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
      li.innerHTML = `<span>${element}</span><span class="property">${this.arraryData[index + additionalNumber]}</span>`;
      this.list.append(li);
    });
    this.statisticsContent.append(this.list);
  }

  generateSwitch() {
    const wrapperSwitch = CreateStatistics.createDomElement('div', 'wrapper-switch');
    const switchTotal = CreateStatistics.createDomElement('div', 'switch__total');
    switchTotal.innerText = 'Absolute';
    const switchPopulation = CreateStatistics.createDomElement('div', 'switch__population');
    switchPopulation.innerText = 'Per 100 thousand population';
    this.switchToggle = CreateStatistics.createDomElement('div', 'switch__statistics');
    this.switchToggle.innerHTML = '<input checked class="graphSwitcher" type="checkbox">';
    this.switchToggle.dataset.index = 3;
    wrapperSwitch.append(switchTotal);
    wrapperSwitch.append(this.switchToggle);
    wrapperSwitch.append(switchPopulation);
    this.wrapperTable.append(wrapperSwitch);
  }

  setCurrentProperty(key, index) {
    this.currentData.innerText = String(this.arraryData[index]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    let indexProperty = index;
    if (index > 5) {
      indexProperty = index - 6;
    }
    this.currentProperty.innerText = this.properties[indexProperty];
    const str = key.toLowerCase();
    if (str.includes('cases')) {
      this.currentData.style.color = '#675D04';
    } else if (str.includes('deaths')) {
      this.currentData.style.color = '#84272F';
    } else if (str.includes('recovered')) {
      this.currentData.style.color = '#1B481B';
    }
  }

  setCurrentData(index) {
    this.currentData.innerText = String(this.arraryData[index]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  static createDomElement(element, ...className) {
    const node = document.createElement(element);
    if (className.length > 0) node.classList.add(...className);
    return node;
  }
}
