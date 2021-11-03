import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router";
import { v4 as uudi } from "uuid";
import { CustomToast } from "../utils/CustomToast";
import {
  addToCartApi,
  getAllDonationOptionsApi,
  getCityOptionsApi,
  getGotraOptionsApi,
  getNakshatraOptionsApi,
  getStateOptionsApi,
  getTempleDetailsApi,
  getUserDetailsApi,
  registerApi,
} from "./api";

export const useGetTempleDetails = (productId) => {
  const history = useHistory();
  const {
    data: templeDetails,
    isLoading,
    isError,
  } = useQuery(
    "templeDetails",
    async () => {
      const res = await getTempleDetailsApi({ productId: productId });
      return res.data;
    },
    {
      onSuccess: () => {
        localStorage.setItem("productId", productId);
      },
      onError: (error) => {
        history.replace(history.location.pathname, {
          errorStatusCode: error.response ? error.response.status : 500,
        });
      },
    }
  );
  return { templeDetails, isLoading, isError };
};

export const useRegister = (
  setOpenRegisterModal,
  setOpenNotRegisteredModal,
  setUserDetails
) => {
  const { mutate: mutateRegister } = useMutation(
    async (values) => {
      const payload = {
        ...values,
        productId: localStorage.getItem("productId"),
      };
      const res = await registerApi(payload);
      return res.data;
    },
    {
      onSuccess: (data) => {
        setUserDetails(data);
        localStorage.setItem("email", data.email ? data.email : "");
        localStorage.setItem("phone", data.phone ? data.phone : "");
        setOpenRegisterModal(false);
        setOpenNotRegisteredModal(false);
        CustomToast("You've been registered");
      },
      onError: (error) => {
        console.log(error);
        CustomToast(error.response.data.message);
      },
    }
  );
  return { mutateRegister };
};

export const useGetUserDetails = (
  setUserDetails,
  setOpenNotRegisteredModal
) => {
  const { mutate: mutateFetchUser } = useMutation(
    "getUserDetails",
    async (values) => {
      const payload = {
        ...values,
        productId: localStorage.getItem("productId"),
      };
      const res = await getUserDetailsApi(payload);
      const data = {
        ...res.data.data[0],
      };
      return data;
    },
    {
      onSuccess: (data) => {
        setUserDetails(data);
        console.log(data);
        localStorage.setItem("email", data.email ? data.email : "");
        localStorage.setItem("phone", data.phone ? data.phone : "");
      },
      onError: (error) => {
        setOpenNotRegisteredModal(true);
      },
    }
  );
  return { mutateFetchUser };
};

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
      // console.log(donationsData);
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

export const useGetNakshatraOptions = () => {
  const history = useHistory();
  const {
    data: nakshatraOptions,
    isLoading,
    isError,
  } = useQuery(
    "nakshatraOptions",
    async () => {
      const res = await getNakshatraOptionsApi();
      const data = res.data.data.map((itm) => {
        return itm.nakshatra;
      });
      //adding an extra empty string so that deleting the selection by user doesn't throw an error
      return [...data, ""];
    },
    {
      onError: (error) => {
        history.replace(history.location.pathname, {
          errorStatusCode: error.response ? error.response.status : 500,
        });
      },
    }
  );
  return { nakshatraOptions, isLoading, isError };
};

export const useGetGotraOptions = () => {
  const history = useHistory();
  const {
    data: gotraOptions,
    isLoading,
    isError,
  } = useQuery(
    "gotraOptions",
    async () => {
      const res = await getGotraOptionsApi();
      const data = res.data.data.map((itm) => {
        return itm.gotra;
      });
      return [...data, ""];
    },
    {
      onError: (error) => {
        history.replace(history.location.pathname, {
          errorStatusCode: error.response ? error.response.status : 500,
        });
      },
    }
  );
  return { gotraOptions, isLoading, isError };
};

export const useGetStateOptions = () => {
  const history = useHistory();
  const {
    data: stateOptions,
    isLoading,
    isError,
  } = useQuery(
    "stateOptions",
    async () => {
      const res = await getStateOptionsApi();
      const data = res.data.data.map((itm) => {
        return itm.stateName;
      });
      return [...data, ""];
    },
    {
      onError: (error) => {
        history.replace(history.location.pathname, {
          errorStatusCode: error.response ? error.response.status : 500,
        });
      },
    }
  );
  return { stateOptions, isLoading, isError };
};

export const useGetCityOptions = (state) => {
  const history = useHistory();
  const {
    data: cityOptions,
    isLoading,
    isError,
  } = useQuery(
    ["cityOptions", state],
    async () => {
      const res = await getCityOptionsApi(state);
      const data = res.data.data.map((itm) => {
        return itm.cityName;
      });
      return [...data, ""];
    },
    {
      onError: (error) => {
        history.replace(history.location.pathname, {
          errorStatusCode: error.response ? error.response.status : 500,
        });
      },
    }
  );
  return { cityOptions, isLoading, isError };
};

export const useAddToCart = () => {
  const { mutate: mutateCart } = useMutation(
    async ({ cartItems, status, id }) => {
      const data = {
        email: localStorage.getItem("email"),
        phone: localStorage.getItem("phone"),
        productId: localStorage.getItem("productId"),
        data: cartItems,
        status,
        id,
        totalAmount: cartItems.reduce((total, next) => total + +next.amount, 0),
      };
      const res = await addToCartApi(data);
      return res.data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        CustomToast("Your cart items have been saved!");
      },
      onError: (error) => {
        console.log(error);

        CustomToast(error.response.data.message);
      },
    }
  );
  return { mutateCart };
};
