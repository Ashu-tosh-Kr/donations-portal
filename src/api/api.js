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
    `${process.env.REACT_APP_BASE_URL}/business/services/nonprofit/addVolunteerDetails`,
    data
  );
export const getAllDonationOptionsApi = () =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/user/services/getCommonData`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      actionId: "businesstypeprofile",
      product: localStorage.getItem("productId"),
      dataJson: { aspectType: "Donation Setup" },
    },
  });
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

export const addToCartApi = (data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/business/services/nonprofit/addCartData`,
    data
  );
