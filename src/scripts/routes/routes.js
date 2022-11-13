import Detail from '../views/pages/detail';
import Favorites from '../views/pages/favorites';
import Homepage from '../views/pages/homepage';

const routes = {
  '/': Homepage, // default page
  '/detail/:id': Detail,
  '/favorites': Favorites,
};

export default routes;
