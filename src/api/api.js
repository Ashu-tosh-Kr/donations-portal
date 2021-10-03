import axios from "axios";

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
export const getAllDonationOptionsApi = () =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/user/services/getCommonData`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      actionId: "businesstypeprofile",
      product: "895892fa-127e-4dbf-941e-3e4486a834af",
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
