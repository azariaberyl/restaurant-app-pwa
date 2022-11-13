import RestaurantAPI from '../../data/restaurant-data';
import RestaurantTemplates from '../templates/create-restaurant-template';

const Homepage = {
  async render() {
    document.querySelector('main').innerHTML = `
      <div class="skeleton homepage-height loading"> Loading Data . . </div>
    `;
  },

  async afterRender() {
    const data = await RestaurantAPI.getList();
    if (data.error === true) {
      alert('Data gagal ditampilkan, silahkan muat ulang');
      return;
    }
    document.querySelector('main').innerHTML = '';

    data.restaurants.map((restaurant) => {
      RestaurantTemplates.createRestaurantItem(restaurant.name, restaurant.description, restaurant.id, restaurant.city, restaurant.pictureId, restaurant.rating);
    });
  },
};

export default Homepage;
