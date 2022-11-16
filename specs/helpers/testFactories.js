import FavoriteButtonInitiator from '../../src/scripts/utils/favoriteButtonInitiator';

const createFavoritedButtonPresenterWithRestaurant = async (restaurant) => {
  await FavoriteButtonInitiator.init(document.querySelector('#favoriteButtonContainer'), restaurant);
};

export {createFavoritedButtonPresenterWithRestaurant};
