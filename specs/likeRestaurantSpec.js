import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb';
import {createFavoritedButtonPresenterWithRestaurant} from './helpers/testFactories';

describe('Like a movie', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await createFavoritedButtonPresenterWithRestaurant({id: 1});
    expect(document.querySelector('#favorite-button.favorite')).toBeTruthy();
  });

  it('should not show the favorited button when the restaurant has not been favorited before', async () => {
    await createFavoritedButtonPresenterWithRestaurant({id: 1});
    expect(document.querySelector('#favorite-button.favorited')).toBeFalsy();
  });

  it('should be able to favorite the restaurant', async () => {
    await createFavoritedButtonPresenterWithRestaurant({id: 1});

    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));
    await FavoriteRestaurantIdb.getAllRestaurants();

    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({id: 1});
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant again when its already favorited', async () => {
    await createFavoritedButtonPresenterWithRestaurant({id: 1});

    // Tambahkan restaurant dengan ID 1 ke daftar restaurant yang disukai
    await FavoriteRestaurantIdb.putRestaurant({id: 1});

    // Simulasikan pengguna menekan favorite suka restaurant
    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));

    // tidak ada restaurant yang ganda
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{id: 1}]);

    FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await createFavoritedButtonPresenterWithRestaurant({});

    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
