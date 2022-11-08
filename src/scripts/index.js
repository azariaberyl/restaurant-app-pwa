import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import data from '../DATA.json';

function createRestaurant(name, description, id, city, pictureId, rating, menu) {
  const root = document.querySelector('main');
  const containerItem = document.createElement('div');
  const img = document.createElement('img');
  const title = document.createElement('h3');
  const rContainer = document.createElement('div');
  const data = document.createElement('div');
  const grade = document.createElement('span');
  const desc = document.createElement('p');
  const place = document.createElement('p');

  containerItem.id = id;
  data.classList.add('data');
  place.classList.add('city');
  containerItem.classList.add('restaurant-item');

  img.src = pictureId;
  img.alt = `Picture of ${name}`;
  title.textContent = name;

  grade.innerHTML = `<span class="material-symbols-outlined">grade</span>${rating}`;
  grade.ariaLabel = 'rating';
  place.innerText = city;

  desc.innerText = description;

  data.appendChild(place);
  data.appendChild(grade);
  rContainer.appendChild(title);
  rContainer.appendChild(data);
  containerItem.appendChild(img);
  containerItem.appendChild(rContainer);
  root.appendChild(containerItem);
  rContainer.appendChild(desc);

  const menuLabel = document.createElement('p');
  menuLabel.classList.add('menu-label');
  menuLabel.innerText = 'Menu Populer';
  root.appendChild(menuLabel);

  const menuContainer = document.createElement('div');
  menuContainer.classList.add('menu-container');
  root.appendChild(menuContainer);

  menu.forEach((item) => {
    const itemElement = popularMenu(item);
    menuContainer.appendChild(itemElement);
  });
}
data.restaurants.map((restaurant) => {
  createRestaurant(
    restaurant.name,
    restaurant.description,
    restaurant.id,
    restaurant.city,
    restaurant.pictureId,
    restaurant.rating,
    restaurant.menu
  );
});

function popularMenu(name) {
  const nameElm = document.createElement('p');
  nameElm.innerText = name;
  return nameElm;
}

const drawer = document.querySelector('.drawer');
const sideBar = document.querySelector('.sideBar');

drawer.addEventListener('click', () => {
  sideBar.classList.toggle('width-half');
});
