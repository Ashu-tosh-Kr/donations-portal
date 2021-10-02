import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router";
import { v4 as uudi } from "uuid";

const getUserDetailsApi = (data) =>
  axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/services/fetchUserDetails`,
    data,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

const getAllDonationOptionsApi = () =>
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
const getRashiOptionsApi = () =>
  axios.get(`${process.env.REACT_APP_BASE_URL}/business/services/getRashi`, {
    productId: "895892fa-127e-4dbf-941e-3e4486a834af",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2MzI0NjY5NjgsImV4cCI6MTYzNTA1ODk2OH0.KtyCxcHXONm2zuvcg4of9cYsl44r95HfHM7QRJm-ucM",
  });
/**
 * @returns Fetches the data from DB and Formatts donations data for tabs and tables
 */
export const GET_DONATION_TYPES = () => {
  return new Promise((resolve, reject) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `${BASE_URL}/user/services/getCommonData`;
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          actionId: "businesstypeprofile",
          product: "895892fa-127e-4dbf-941e-3e4486a834af",
          dataJson: { aspectType: "Donation Setup" },
        },
      })
      .then((res) => {
        const resData = res.data || {};
        let data = resData.data || [];
        let donationsData = [];
        data.forEach((rec) => {
          let index = donationsData.findIndex(
            (item) => item.typeName === rec.typeName
          );
          if (index === -1) {
            donationsData.push({
              typeName: rec.typeName,
              types: [
                {
                  name: rec.refDataName || "",
                  amount: rec.amount || 0,
                  key: uudi(),
                },
              ],
            });
          } else {
            donationsData[index].types.push({
              name: rec.refDataName || "",
              amount: rec.amount || 0,
              key: uudi(),
            });
          }
        });
        resolve(donationsData || []);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/**
 * Fetches user data based on email or phone
 */
export const GET_USER_DETAILS = (values) => {
  const data = { ...values };
  return new Promise((resolve, reject) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `${BASE_URL}/user/services/fetchUserDetails`;
    axios
      .post(url, data)
      .then((res) => {
        resolve(res.data && res.data.length > 0 ? res.data[0] : {});
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * @returns userdetails based on email or phone number
 */

export const useGetUserDetails = (
  setUserDetails,
  setOpenNotRegisteredModal
) => {
  const history = useHistory();
  const { mutate } = useMutation(
    "getUserDetails",
    async (values) => {
      const data = new FormData();
      data.append("productId", "895892fa-127e-4dbf-941e-3e4486a834af");
      data.append("email", values.email);
      data.append("phone", values.phone);
      data.append(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE2MzI0NjY5NjgsImV4cCI6MTYzNTA1ODk2OH0.KtyCxcHXONm2zuvcg4of9cYsl44r95HfHM7QRJm-ucM"
      );
      const res = await getUserDetailsApi(values);
      return res.data;
    },
    {
      onSuccess: (data) => {
        setUserDetails(data);
      },
      onError: (error) => {
        setOpenNotRegisteredModal(true);
      },
    }
  );
  return { mutate };
};

/**
 * @returns all the dotions options
 */
export const useGetAllDonationOptions = () => {
  const history = useHistory();
  const {
    data: donationOptions,
    isLoading,
    isError,
  } = useQuery(
    "allDonation",
    async () => {
      const res = await getAllDonationOptionsApi();

      let donationsData = [];
      res.data.data.forEach((rec) => {
        let index = donationsData.findIndex(
          (item) => item.typeName === rec.typeName
        );
        if (index === -1) {
          donationsData.push({
            typeName: rec.typeName,
            types: [
              {
                name: rec.refDataName || "",
                amount: rec.amount || 0,
                key: uudi(),
              },
            ],
          });
        } else {
          donationsData[index].types.push({
            name: rec.refDataName || "",
            amount: rec.amount || 0,
            key: uudi(),
          });
        }
      });
      return donationsData;
    },
    {
      onError: (error) => {
        history.replace(history.location.pathname, {
          errorStatusCode: error.response ? error.response.status : 500,
        });
      },
    }
  );
  return { donationOptions, isLoading, isError };
};

export const useGetRashiOptions = () => {
  const history = useHistory();
  const {
    data: rashiOptions,
    isLoading,
    isError,
  } = useQuery(
    "rashiOptions",
    async () => {
      const res = await getRashiOptionsApi();

      return res.data.data;
    },
    {
      onError: (error) => {
        history.replace(history.location.pathname, {
          errorStatusCode: error.response ? error.response.status : 500,
        });
      },
    }
  );
  return { rashiOptions, isLoading, isError };
};
