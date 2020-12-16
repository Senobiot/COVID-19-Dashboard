export default class CreateStatistics {
  constructor(body) {
    this.body = body;
    this.wrapperTable = '';
    this.properties = ['Daily Cases', 'Daily Deaths', 'Daily Recovered', 'Cumulative Confirmed', 'Cummulative Deaths', 'Cummulative Recovered'];
    this.dataAttributes = ['todayCases', 'todayDeaths', 'todayRecovered', 'cases', 'deaths', 'recovered'];
  }

  createTableStatistics(srcImg, title, data, current) {
    this.data = data;
    this.wrapperTable = CreateStatistics.createDomElement('div', 'wrapper-statistics');
    this.body.append(this.wrapperTable);
    this.generateTableStatistics(srcImg, title, data, current);
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

  generateListStatistics(data) {
    this.currentData.innerText = `${String(data.cases).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}`;
    const arraryData = [data.todayCases, data.todayDeaths, data.todayRecovered, data.cases, data.deaths, data.recovered];
    this.list = CreateStatistics.createDomElement('ul', 'list__statistics');
    this.properties.forEach((element, index) => {
      const li = CreateStatistics.createDomElement('li', 'item__statistics');
      li.dataset.key = `${this.dataAttributes[index]}`;
      li.innerHTML = `<span>${element}</span><span class="property">${arraryData[index]}</span>`;
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
    const switchToggle = CreateStatistics.createDomElement('div', 'switch__statistics');
    switchToggle.innerHTML = '<input checked class="graphSwitcher" type="checkbox">';
    wrapperSwitch.append(switchTotal);
    wrapperSwitch.append(switchToggle);
    wrapperSwitch.append(switchPopulation);
    this.wrapperTable.append(wrapperSwitch);
  }

  setCurrentData(property, data, key) {
    this.currentData.innerText = String(data[key]).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    this.currentProperty.innerText = property;
    const str = key.toLowerCase();
    if (str.includes('cases')) {
      this.currentData.style.color = '#675D04';
    } else if (str.includes('deaths')) {
      this.currentData.style.color = '#84272F';
    } else if (str.includes('recovered')) {
      this.currentData.style.color = '#1B481B';
    }
  }

  static createDomElement(element, ...className) {
    const node = document.createElement(element);
    if (className.length > 0) node.classList.add(...className);
    return node;
  }
}
