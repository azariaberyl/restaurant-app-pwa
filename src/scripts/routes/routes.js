import Detail from '../pages/detail';
import Homepage from '../pages/homepage';
import Favorites from '../pages/favorites';

const routes = {
  '/': Homepage, // default page
  '/detail/:id': Detail,
  '/favorites': Favorites,
};

export default routes;
