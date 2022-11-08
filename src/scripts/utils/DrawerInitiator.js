const DrawerInitiator = {
  init() {
    const drawer = document.querySelector('.drawer');
    const sideBar = document.querySelector('.sideBar');
    drawer.addEventListener('click', () => {
      sideBar.classList.toggle('width-half');
    });
  },
};

export default DrawerInitiator;
