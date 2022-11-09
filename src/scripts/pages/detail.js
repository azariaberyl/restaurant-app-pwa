import RestaurantAPI from '../data/restaurant-data';
import CONFIG from '../global/config';
import UrlParser from '../routes/url-parser';
import '../../styles/detail.css';
import FavoriteButtonInitiator from '../utils/favoriteButtonInitiator';

const Detail = {
  _createDetailPage(imgId, name, address, city, description) {
    const root = document.querySelector('main');
    root.innerHTML = `
      <div class="detail-page">
        <img src="${CONFIG.API_IMAGE_ENDPOINT(imgId)}" alt="Image of ${name}"/>
        <div class="header">
          <h2>${name}</h2>
          <button id="favorite-button" type="button" class="show-more favorite">Favorite</button>
        </div>
        <div class="detail">
          <p class="bold">Address</p>
          <p class="bold">:</p>
          <p>${address}</p>
        </div>
        <div class="detail">
          <p class="bold">City</p>
          <p class="bold">:</p>
          <p>${city}</p>
        </div>
        <p>${description}</p>
        <div class="menu">
          <div>
            <p class="bold">Foods</p>
            <ul class="food-list"></ul>
          </div>
          <div>
            <p class="bold">Drinks</p>
            <ul class="drink-list"></ul>
          </div>
        </div>
        <div class="review">
          <h2>Review</h2>
      </div>
    `;
  },

  async render() {
    const jumbroton = document.querySelector('.jumbotron');
    jumbroton.classList.add('none');

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const response = await RestaurantAPI.getDetail(url.id);
    if (response.error === true) {
      alert('Data gagal ditampilkan, silahkan muat ulang');
      return;
    }

    const {pictureId, name, address, city, description, menus, customerReviews, rating} =
      response.restaurant;

    this._createDetailPage(pictureId, name, address, city, description, customerReviews);

    const foodList = document.querySelector('.detail-page .food-list');
    menus.foods.forEach((food) => {
      const li = document.createElement('li');
      li.innerText = food.name;
      foodList.appendChild(li);
    });

    const drinkList = document.querySelector('.detail-page .drink-list');
    menus.drinks.forEach((drink) => {
      const li = document.createElement('li');
      li.innerText = drink.name;
      drinkList.appendChild(li);
    });

    const reviews = document.querySelector('.review');
    customerReviews.forEach((review) => {
      const root = document.createElement('div');
      root.classList.add('review-item');
      const name = document.createElement('h3');
      name.innerText = review.name;

      const dateContainer = document.createElement('div');
      dateContainer.classList.add('detail');
      dateContainer.innerHTML = '<p>Date</p>';
      const colon = document.createElement('p');
      colon.innerText = ':';
      dateContainer.appendChild(colon);
      const date = document.createElement('p');
      date.innerText = review.date;
      dateContainer.appendChild(date);

      const userReview = document.createElement('p');
      userReview.classList.add('user-review');
      userReview.innerText = review.review;

      root.appendChild(name);
      root.appendChild(dateContainer);
      root.appendChild(userReview);
      reviews.appendChild(root);
    });

    await FavoriteButtonInitiator.init(url.id, {
      id: url.id,
      name,
      pictureId,
      rating,
    });
  },

  afterRender() {},
};

export default Detail;
