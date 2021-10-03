import { useState } from "react";
import "./Donation.styles.scss";

import Header from "../components/header/Header";

import {
  useAddToCart,
  useGetAllDonationOptions,
  useGetUserDetails,
} from "../api/hooks";
import "antd/dist/antd.css";
import PaymentModal from "../components/modals/PaymentModal";
import { Formik, Form } from "formik";
import {
  Grid,
  Button,
  Typography,
  Skeleton,
  Alert,
  Divider,
  Badge,
} from "@mui/material";
import InputField from "../components/formComponents/InputField";
import NotRegisteredModal from "../components/modals/NotRegisteredModal";
import CartModal from "../components/modals/CartModal";
import * as Yup from "yup";
import Services from "../components/table/Services";
import { red } from "@mui/material/colors";
import { CustomToast } from "../utils/CustomToast";

const initialUserValues = {
  email: "",
  phone: "",
  name: "",
  age: "",
  gotra: "",
  nakshatra: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  phone: Yup.string().when("email", {
    is: (email) => !email || email.length === 0,
    then: Yup.string().required("Required"),
  }),
});

function Donation() {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openPayModal, setOpenPayModal] = useState(false);
  const [openNotRegisteredModal, setOpenNotRegisteredModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const { donationOptions, isLoading, isError } = useGetAllDonationOptions();
  const [userDetails, setUserDetails] = useState(initialUserValues);
  const { mutateFetchUser } = useGetUserDetails(
    setUserDetails,
    setOpenNotRegisteredModal
  );
  const onSubmit = (values) => {
    mutateFetchUser({
      phone: values.phone,
      email: values.email,
    });
  };
  const addToCart = (item) => {
    const existItem = cartItems.find((itm) => itm.key === item.key);
    if (!existItem) {
      setCartItems([...cartItems, item]);
      CustomToast("Added To Cart");
    } else {
      CustomToast("Already in Cart");
    }
  };
  const removeFromCart = (item) => {
    setCartItems((cartItems) =>
      cartItems.filter((itm) => itm.key !== item.key)
    );
    CustomToast("Removed From Cart");
  };
  const { mutateCart } = useAddToCart(setOpenPayModal);
  const handleCartSubmit = () => {
    mutateCart(cartItems);
  };
  return (
    <>
      <PaymentModal
        openPayModal={openPayModal}
        setOpenPayModal={setOpenPayModal}
      />
      <NotRegisteredModal
        openNotRegisteredModal={openNotRegisteredModal}
        setOpenNotRegisteredModal={setOpenNotRegisteredModal}
      />
      <CartModal
        openCartModal={openCartModal}
        setOpenCartModal={setOpenCartModal}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        setOpenPayModal={setOpenPayModal}
        handleCartSubmit={handleCartSubmit}
      />
      <>
        <Header />
        <Grid container spacing={2}>
          <Grid sx={{ margin: "0 auto" }} item xs={11}>
            <Typography
              sx={{ textAlign: "center", margin: "0.5rem" }}
              variant="h4"
            >
              <Divider
                sx={{
                  "&.MuiDivider-root": {
                    "&:before": {
                      borderTop: `2px solid ${red[900]}`,
                    },
                    "&:after": {
                      borderTop: `2px solid ${red[900]} `,
                    },
                  },
                }}
              >
                DONATIONS
              </Divider>
            </Typography>
            <Formik
              enableReinitialize
              initialValues={userDetails}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                // console.log(formik.values.expires);
                return (
                  <Form>
                    <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
                      <Grid item xs={12}>
                        <Typography>Contact Information</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <InputField name="email" label="Email" />
                      </Grid>
                      <Grid item xs={12} sm={1}>
                        <Typography
                          variant="h5"
                          sx={{ paddingTop: "0.5rem", textAlign: "center" }}
                        >
                          OR
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={5} md={4}>
                        <InputField name="phone" label="Phone" />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Button
                          sx={{ height: "3.3rem", fontSize: 20 }}
                          fullWidth
                          variant="contained"
                          type="submit"
                        >
                          Get Details
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Alert
                          sx={{
                            backgroundColor: "white",
                            border: 1,
                            borderColor: `${red[900]}`,
                          }}
                          severity="info"
                        >
                          Please enter either your e-mail or phone number.
                        </Alert>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>Member Profile</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputField name="name" label="Name" disabled />
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <InputField name="gotra" label="Gotra" disabled />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <InputField
                          name="nakshatra"
                          label="Nakshatra"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12}></Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <InputField name="address" label="Address" disabled />
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <InputField name="state" label="State" disabled />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <InputField name="city" label="City" disabled />
                      </Grid>

                      <Grid item xs={6} md={3}>
                        <InputField name="zip" label="ZIP Code" disabled />
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
          <Grid sx={{ margin: "1rem" }} xs={12}>
            <Divider variant="middle" />
          </Grid>
          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width="full"
              sx={{ borderRadius: "5px" }}
              height={200}
            />
          ) : isError ? (
            <Grid sx={{ margin: "0 auto" }} item xs={11}>
              <Typography>"Oops! There was an error!"</Typography>
            </Grid>
          ) : (
            <>
              <Grid sx={{ margin: "0 auto" }} item xs={11}>
                <Services options={donationOptions} addToCart={addToCart} />
              </Grid>
              <Grid sx={{ margin: "1rem auto" }} item xs={2}>
                <Badge badgeContent={cartItems.length} color="secondary">
                  <Button
                    type="primary"
                    variant="contained"
                    fullWidth
                    onClick={() => setOpenCartModal(true)}
                    sx={{ width: 200, fontSize: 20 }}
                    size="large"
                  >
                    Cart
                  </Button>
                </Badge>
              </Grid>
            </>
          )}
        </Grid>
      </>
    </>
  );
}

export default Donation;
