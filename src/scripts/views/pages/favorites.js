import FavoriteRestaurantIdb from '../../data/favorite-restaurants-idb';
import '../../../styles/favorite.css';
import RestaurantTemplates from '../templates/create-restaurant-template';

const Favorites = {
  async render() {
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron && jumbotron.remove();
    const root = document.querySelector('main');
    root.innerHTML = `
      <div class="favorite-page skeleton loading">Loading Data</div>
    `;
  },

  async afterRender() {
    const data = await FavoriteRestaurantIdb.getAllRestaurants();
    const main = document.querySelector('main');
    if (data.error === true) {
      alert('Data gagal ditampilkan, silahkan muat ulang');
      main.innerHTML = `
      <div class="favorite-page loading">Data tidak ditemukan</div>
      `;
      return;
    }
    main.innerHTML = '<div class="favorite-page"></div>';
    const favElementContainer = document.querySelector('main .favorite-page');

    if (data.length === 0) {
      favElementContainer.textContent = 'Tidak ada restaurant yang disukai';
      return;
    }

    data.forEach((restaurant) => {
      favElementContainer.innerHTML += RestaurantTemplates.createRestaurantCard(restaurant.name, restaurant.pictureId, restaurant.rating, restaurant.id);
    });
  },
};

export default Favorites;
