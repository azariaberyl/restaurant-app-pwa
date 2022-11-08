import Detail from '../pages/detail';
import Homepage from '../pages/homepage';

const routes = {
  '/': Homepage, // default page
  '/detail/:id': Detail,
};

export default routes;
