import {async} from 'regenerator-runtime';
import FavoriteRestaurantIdb from '../data/favorite-restaurants-idb';

const FavoriteButtonInitiator1 = async (id, restaurant) => {
  const favBtn = document.querySelector('.detail-page #favorite-button');

  const removeFavorite = () => {
    favBtn.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(id);
      favBtn.classList.remove('favorited');
      favBtn.classList.add('favorite');
      favBtn.innerHTML = 'Favorite';
      renderBtn();
    });
  };

  const addFavorited = () => {
    favBtn.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(restaurant);
      favBtn.classList.remove('favorite');
      favBtn.classList.add('favorited');
      favBtn.innerHTML = 'Favorited';
      renderBtn();
    });
  };

  const renderBtn = async () => {
    const getRestaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    if (getRestaurant) {
      removeFavorite();
    } else {
      addFavorited();
    }
  };
  await renderBtn();
};

const FavoriteButtonInitiator = {
  async init(id, restaurant) {
    this._favoriteButtonContainer = document.querySelector('.detail-page #favorite-button');
    this._id = id;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const id = this._id;

    if (await this._isRestaurantExist(id)) {
      this._favoriteButtonContainer.classList.remove('favorite');
      this._favoriteButtonContainer.classList.add('favorited');
      this._favoriteButtonContainer.innerHTML = 'Favorited';
    } else {
      this._favoriteButtonContainer.classList.remove('favorited');
      this._favoriteButtonContainer.classList.add('favorite');
      this._favoriteButtonContainer.innerHTML = 'Favorite';
    }

    this._favoriteButtonContainer.addEventListener('click', async () => {
      if (await this._isRestaurantExist(id)) {
        this._favoriteButtonContainer.classList.remove('favorited');
        this._favoriteButtonContainer.classList.add('favorite');
        this._favoriteButtonContainer.innerHTML = 'Favorite';
        await FavoriteRestaurantIdb.deleteRestaurant(this._id);
      } else {
        this._favoriteButtonContainer.classList.remove('favorite');
        this._favoriteButtonContainer.classList.add('favorited');
        this._favoriteButtonContainer.innerHTML = 'Favorited';
        await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      }
    });
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  // TODO, fix folowing functions
  _renderLike() {},

  _renderLiked() {},
};

export default FavoriteButtonInitiator;
