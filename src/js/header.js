const header = document.createElement('header');
const headerTitle = document.createElement('h1');
headerTitle.textContent = 'RS School Covid-19 live dashbord';
header.classList.add('header');
header.appendChild(headerTitle);

const footer = document.createElement('footer');
const footerYear = document.createElement('div');
const footerLogo = document.createElement('a');
const footerNames = document.createElement('div');
footerNames.classList.add('footerNames');
const footerName1 = document.createElement('a');
const footerName2 = document.createElement('a');
const footerName3 = document.createElement('a');
footerYear.textContent = '© 2020 Covid Dashboard';
footerYear.classList.add('year');
footerLogo.href = 'https://rs.school/js/';
footerLogo.classList.add('logo');

footerName1.textContent = 'Senobiot';
footerName2.textContent = 'HannaHerman';
footerName3.textContent = 'sanazez';
footerName1.href = 'https://github.com/Senobiot';
footerName2.href = 'https://github.com/HannaHerman';
footerName3.href = 'https://github.com/sanazez';

footerNames.appendChild(footerName1);
footerNames.appendChild(footerName2);
footerNames.appendChild(footerName3);

footer.classList.add('footer');
footer.appendChild(footerYear);
footer.appendChild(footerLogo);
footer.appendChild(footerNames);

document.body.appendChild(header);
document.body.appendChild(footer);
