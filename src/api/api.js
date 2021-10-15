import axios from "axios";

export const getTempleDetailsApi = (data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/business/services/nonprofit/getProductDetails`,
    data
  );

export const getUserDetailsApi = (data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/business/services/nonprofit/getClientDetails`,
    data
  );
export const registerApi = (data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/business/services/nonprofit/addClientDetails`,
    data
  );

export const getNakshatraOptionsApi = () =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/user/services/getNakshatra`, {
    productId: localStorage.getItem("productId"),
  });

export const getGotraOptionsApi = () =>
  axios.post(`${process.env.REACT_APP_BASE_URL}/user/services/getGotra`, {
    productId: localStorage.getItem("productId"),
  });

export const getStateOptionsApi = () =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/business/services/getNewStateCodeTypes`,
    {
      productId: localStorage.getItem("productId"),
    }
  );
export const getCityOptionsApi = (stateName) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/business/services/getNewCityTypes`,
    {
      productId: localStorage.getItem("productId"),
      stateName: stateName,
    }
  );

export const getLocationOptionsApi = () =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/business/services/getLocation`,
    {
      productId: localStorage.getItem("productId"),
    }
  );
export const getServiceNameOptionsApi = () =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/business/services/getServiceName`,
    {
      productId: localStorage.getItem("productId"),
    }
  );
export const addSubscriberApi = (data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/business/services/nonprofit/addSubscriber`,
    data
  );
