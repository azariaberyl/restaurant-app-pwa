import FavoriteRestaurantIdb from '../data/favorite-restaurants-idb';

const FavoriteButtonInitiator = {
  async init(favoriteButtonContainer, restaurant) {
    this._favoriteButtonContainer = favoriteButtonContainer;
    this._id = restaurant.id;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const id = this._id;
    this._renderTheButton();
    const favoriteButton = document.querySelector('#favorite-button');

    if (await this._isRestaurantExist(id)) {
      this.renderFavoritedButton(favoriteButton);
    } else {
      this.renderFavoriteButton(favoriteButton);
    }

    favoriteButton.addEventListener('click', async () => {
      if (await this._isRestaurantExist(id)) {
        this.renderFavoriteButton(favoriteButton);
        await FavoriteRestaurantIdb.deleteRestaurant(this._id);
      } else {
        this.renderFavoritedButton(favoriteButton);
        await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      }
    });
  },

  renderFavoritedButton(favoriteButton) {
    favoriteButton.classList.remove('favorite');
    favoriteButton.classList.add('favorited');
    favoriteButton.innerHTML = 'Favorited';
  },

  renderFavoriteButton(favoriteButton) {
    favoriteButton.classList.remove('favorited');
    favoriteButton.classList.add('favorite');
    favoriteButton.innerHTML = 'Favorite';
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  // TODO, fix folowing functions
  _renderTheButton() {
    const button = document.createElement('button');
    button.id = 'favorite-button';
    button.type = 'button';
    button.classList.add('show-more', 'favorite');
    button.innerText = 'Favorite';

    this._favoriteButtonContainer.appendChild(button);
  },
};

export default FavoriteButtonInitiator;
