import RestaurantAPI from '../data/restaurant-data';
import CONFIG from '../global/config';

const Homepage = {
  _createRestaurant(name, description, id, city, pictureId, rating) {
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.classList.remove('none');
    const root = document.querySelector('main');
    const containerItem = document.createElement('div');
    const img = document.createElement('img');
    const title = document.createElement('h3');
    const rContainer = document.createElement('div');
    const data = document.createElement('div');
    const grade = document.createElement('span');
    const desc = document.createElement('p');
    const place = document.createElement('p');
    const showMore = document.createElement('a');

    containerItem.id = id;
    data.classList.add('data');
    place.classList.add('city');
    containerItem.classList.add('restaurant-item');

    img.src = `${CONFIG.API_IMAGE_ENDPOINT(pictureId)}`;
    img.alt = `Picture of ${name} restaurant`;
    title.textContent = name;

    grade.innerHTML = `<span class="material-symbols-outlined">grade</span>${rating}`;
    grade.ariaLabel = 'rating';
    place.innerText = city;

    desc.innerText = description;

    showMore.innerText = 'Show more..';
    showMore.classList.add('show-more');
    showMore.href = `#/detail/${id}`;

    data.appendChild(place);
    data.appendChild(grade);
    rContainer.appendChild(title);
    rContainer.appendChild(data);
    containerItem.appendChild(img);
    containerItem.appendChild(rContainer);
    root.appendChild(containerItem);
    rContainer.appendChild(desc);
    rContainer.appendChild(showMore);
  },

  async render() {
    const data = await RestaurantAPI.getList();

    if (data.error === true) return;

    data.restaurants.map((restaurant) => {
      this._createRestaurant(
        restaurant.name,
        restaurant.description,
        restaurant.id,
        restaurant.city,
        restaurant.pictureId,
        restaurant.rating
      );
    });
  },

  async afterRender() {},
};

export default Homepage;
