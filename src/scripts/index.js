/* eslint-disable no-unused-vars */
import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import routes from './routes/routes';
import UrlParser from './routes/url-parser';
import DrawerInitiator from './utils/DrawerInitiator';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const START = 10;
const NUMBER_OF_IMAGES = 100;

async function renderPage() {
  const root = document.querySelector('main');
  root.innerHTML = '';
  const url = UrlParser.parseActiveUrlWithCombiner();
  const page = routes[url];
  await page.render();
  await page.afterRender();
  const skipLinkElem = document.querySelector('.skip-to');
  skipLinkElem.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('#main').focus();
  });
}

window.addEventListener('hashchange', () => {
  renderPage();
});

window.addEventListener('load', async () => {
  DrawerInitiator.init();
  renderPage();
  await swRegister();
});
