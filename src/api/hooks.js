import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router";
import { v4 as uudi } from "uuid";
import { CustomToast } from "../utils/CustomToast";
import {
  getAllDonationOptionsApi,
  getCityOptionsApi,
  getGotraOptionsApi,
  getNakshatraOptionsApi,
  getStateOptionsApi,
  getUserDetailsApi,
  registerApi,
} from "./api";

export const useGetUserDetails = (
  setUserDetails,
  setOpenNotRegisteredModal
) => {
  const { mutate } = useMutation(
    "getUserDetails",
    async (values) => {
      const res = await getUserDetailsApi(values);
      const data = {
        ...res.data.data[0],
        email: values.email ? values.email : "",
        phone: values.phone ? values.phone : "",
      };
      return data;
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setUserDetails(data);
        console.log(data);
        localStorage.setItem("productId", data.productId);
      },
      onError: (error) => {
        setOpenNotRegisteredModal(true);
      },
    }
  );
  return { mutate };
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

export const useRegister = (setShowNewProject) => {
  //to refetch details on register
  const { mutate: getUserDetails } = useGetUserDetails();
  const { mutate } = useMutation(
    async (values) => {
      await registerApi(values);
      return values;
    },
    {
      onMutate: () => {},
      onSuccess: (data) => {
        setShowNewProject(false);
        //once the user is registered, we're refetching the details to prepopulate
        getUserDetails(data);
        CustomToast("You've been registered");
      },
      onError: (error) => {
        console.log(error);

        CustomToast(error.response.data.message);
      },
    }
  );
  return { mutate };
};
