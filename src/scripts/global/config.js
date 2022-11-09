const CONFIG = {
  API_ENDPOINT: 'https://restaurant-api.dicoding.dev',
  API_IMAGE_ENDPOINT: (id) => `https://restaurant-api.dicoding.dev/images/large/${id}`,
  DATABASE_NAME: 'restaurants-database',
  DATABASE_VERSION: 1,
  OBJECT_STORE_NAME: 'restaurants',
};

export default CONFIG;
