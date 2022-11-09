import FavoriteRestaurantIdb from '../data/favorite-restaurants-idb';
import CONFIG from '../global/config';
import '../../styles/favorite.css';

const Favorites = {
  _createRestaurant(name, pictureId, rating, id) {
    return `
      <div class="favorite-item">
        <img alt="Image of ${name}" src="${CONFIG.API_IMAGE_ENDPOINT(pictureId)}" />
        <div>
          <p class="bold judul">${name}</p>
          <p class="rating">Rating: ${rating}</p>
        </div>
        <a href="#/detail/${id}" class="detail-button">Show more..</a>
      </div>
    `;
  },

  async render() {
    const root = document.querySelector('main');
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.classList.add('none');
    const data = await FavoriteRestaurantIdb.getAllRestaurants();
    if (data.error === true) {
      alert('Data gagal ditampilkan, silahkan muat ulang');
      return;
    }

    const favoritePage = document.createElement('div');
    favoritePage.classList.add('favorite-page');
    root.appendChild(favoritePage);

    data.forEach((restaurant) => {
      favoritePage.innerHTML += this._createRestaurant(
          restaurant.name,
          restaurant.pictureId,
          restaurant.rating,
          restaurant.id,
      );
    });
  },

  async afterRender() {},
};

export default Favorites;
