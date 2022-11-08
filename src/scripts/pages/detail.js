import RestaurantAPI from '../data/restaurant-data';
import UrlParser from '../routes/url-parser';

const Detail = {
  _createDetailPage() {},
  async render() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantAPI.getDetail(url.id);
    const jumbroton = document.querySelector('.jumbotron');
    jumbroton.classList.add('none');

    const root = document.querySelector('main');
    root.innerHTML = `
      <h2>Cek, dicoba</h2>
    `;
  },

  afterRender() {},
};

export default Detail;
