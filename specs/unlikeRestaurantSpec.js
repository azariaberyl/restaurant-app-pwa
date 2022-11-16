import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurants-idb';
import {createFavoritedButtonPresenterWithRestaurant} from './helpers/testFactories';

describe('Unlik A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="favoriteButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({id: 1});
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should display favorited button when the restaurant has been favorited', async () => {
    await createFavoritedButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('#favorite-button.favorited')).toBeTruthy();
  });

  it('should not display favorited button when the restaurant has been favorited', async () => {
    await createFavoritedButtonPresenterWithRestaurant({id: 1});

    expect(document.querySelector('#favorite-button.favorite')).toBeFalsy();
  });

  it('should be able to remove favorited restaurant from the list', async () => {
    await createFavoritedButtonPresenterWithRestaurant({id: 1});

    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));
    await FavoriteRestaurantIdb.getAllRestaurants();

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await createFavoritedButtonPresenterWithRestaurant({id: 1});

    // hapus dulu film dari daftar film yang disukai
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    // kemudian, simulasikan pengguna menekan widget batal menyukai film
    document.querySelector('#favorite-button').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
