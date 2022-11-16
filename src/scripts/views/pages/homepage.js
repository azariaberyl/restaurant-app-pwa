import RestaurantAPI from '../../data/restaurant-data';
import RestaurantTemplates from '../templates/create-restaurant-template';

const Homepage = {
  async render() {
    const jumbotron = document.createElement('div');
    jumbotron.classList.add('jumbotron');
    const main = document.querySelector('main');
    document.body.insertBefore(jumbotron, main);
    jumbotron.innerHTML = `
      <div>
        <h2>Where every flavor tells a story.</h2>
        <p>The best restaurants from all over the country to fulfill your journey</p>
      </div>
    `;
    main.innerHTML = `
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
