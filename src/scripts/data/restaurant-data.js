import CONFIG from '../global/config';

const RestaurantAPI = {
  async getList() {
    const response = await fetch(`${CONFIG.API_ENDPOINT}/list`);
    const responseJson = await response.json();

    if (responseJson.error === true) {
      alert(responseJson.message);
      return {error: true, restaurants: []};
    }

    return responseJson;
  },

  async getDetail(id) {
    const response = await fetch(`${CONFIG.API_ENDPOINT}/detail/${id}`);
    const responseJson = await response.json();

    if (responseJson.error === true) {
      alert(responseJson.message);
      return {error: true, restaurants: []};
    }

    return responseJson;
  },
};

export default RestaurantAPI;
