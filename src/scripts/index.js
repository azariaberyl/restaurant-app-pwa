import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import routes from './routes/routes';
import UrlParser from './routes/url-parser';
import DrawerInitiator from './utils/DrawerInitiator';

async function renderPage() {
  const root = document.querySelector('main');
  root.innerHTML = '';
  const url = UrlParser.parseActiveUrlWithCombiner();
  const page = routes[url];
  await page.render();
  await page.afterRender();
}

window.addEventListener('hashchange', () => {
  renderPage();
});

window.addEventListener('load', () => {
  DrawerInitiator.init();
  renderPage();
});
