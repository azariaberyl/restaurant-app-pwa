import CONFIG from '../../global/config';

const RestaurantTemplates = {
  createRestaurantCard(name, pictureId, rating, id) {
    return `
      <div class="restaurant-card">
        <div class="img-container">
          <img alt="Image of ${name}" src="${CONFIG.API_IMAGE_ENDPOINT(pictureId)}" />
        </div class="img-container">
        <div>
          <p class="bold judul">${name}</p>
          <p class="rating">Rating: ${rating}</p>
        </div>
        <a href="#/detail/${id}" class="detail-button">Show more..</a>
      </div>
    `;
  },

  createRestaurantItem(name, description, id, city, pictureId, rating) {
    const jumbotron = document.querySelector('.jumbotron');
    jumbotron.classList.remove('none');
    const root = document.querySelector('main');
    const containerItem = document.createElement('div');
    const imgContainer = document.createElement('div');
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

    // img.src = `${CONFIG.API_IMAGE_ENDPOINT(pictureId)}`;
    img.classList.add('lazyload');
    img.setAttribute('data-src', CONFIG.API_IMAGE_ENDPOINT(pictureId));
    img.alt = `Picture of ${name} restaurant`;
    // img.loading = 'lazy';
    img.width = 300;
    title.textContent = name;
    imgContainer.appendChild(img);

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
    containerItem.appendChild(imgContainer);
    containerItem.appendChild(rContainer);
    root.appendChild(containerItem);
    rContainer.appendChild(desc);
    rContainer.appendChild(showMore);
  },
};

export default RestaurantTemplates;
