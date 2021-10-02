import { useState } from "react";
//Styles
import "./Donation.styles.scss";

//Components
import Header from "../components/header/Header";
import ServicesTable from "../components/table/ServicesTable";

//API
import { useGetAllDonationOptions, useGetUserDetails } from "../api/api";
import "antd/dist/antd.css";
// import { Input, Form, Button, Modal, Table } from "antd";

//Constants
import { COLUMNS } from "../utils/Constants";
import PaymentModal from "../components/modals/PaymentModal";
import { Formik, Form } from "formik";
import { Grid, Button, Typography, Skeleton, Alert } from "@mui/material";
import InputField from "../components/formComponents/InputField";
import NotRegisteredModal from "../components/modals/NotRegisteredModal";
import CartModal from "../components/modals/CartModal";
import * as Yup from "yup";

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
  // email: Yup.string().email("Invalid email"),

  phone: Yup.string().when("email", {
    is: (email) => !email || email.length === 0,
    then: Yup.string().required("Required"),
  }),
});

function Donation() {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openPayModal, setOpenPayModal] = useState(false);
  const [openNotRegisteredModal, setOpenNotRegisteredModal] = useState(false);
  const { donationOptions, isLoading, isError } = useGetAllDonationOptions();
  const [userDetails, setUserDetails] = useState(initialUserValues);

  const { mutate } = useGetUserDetails(
    setUserDetails,
    setOpenNotRegisteredModal
  );
  const onSubmit = (values) => {
    mutate({
      phone: values.phone,
      email: values.email,
    });
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
      />
      <>
        <Header />
        <Grid container spacing={2}>
          <Grid sx={{ margin: "0 auto" }} item xs={8}>
            <Typography
              sx={{ textAlign: "center", margin: "0.5rem" }}
              variant="h4"
            >
              Donor Profile
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
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>Contact Information</Typography>
                      </Grid>
                      <Grid item xs={6} sm={4}>
                        <InputField name="phone" label="Phone" />
                      </Grid>
                      <Grid item xs={6} sm={5}>
                        <InputField name="email" label="Email" />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Button
                          sx={{ height: "3.5rem" }}
                          fullWidth
                          variant="contained"
                          type="submit"
                        >
                          Get Details
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Alert severity="info">
                          Please enter either your e-mail or phone number above
                          so that we can fetch your details
                        </Alert>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography>Donor Profile</Typography>
                          </Grid>
                          <Grid item xs={9}>
                            <InputField name="name" label="Name" disabled />
                          </Grid>
                          <Grid item xs={3}>
                            <InputField name="age" label="Age" disabled />
                          </Grid>
                          <Grid item xs={7}>
                            <InputField
                              name="nakshatra"
                              label="Nakshatra"
                              disabled
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <InputField name="gotra" label="Gotra" disabled />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography>Address</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <InputField
                              name="address"
                              label="Address"
                              disabled
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <InputField name="city" label="City" disabled />
                          </Grid>

                          <Grid item xs={8}>
                            <InputField name="state" label="State" disabled />
                          </Grid>
                          <Grid item xs={4}>
                            <InputField name="zip" label="ZIP Code" disabled />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
          <Grid item xs={12}>
            {!isLoading ? (
              <>
                <ServicesTable
                  onCheckboxChange={
                    (rows, keys) => {}
                    // onCheckboxChange(rows, keys)
                  }
                  columns={COLUMNS}
                  tabsArr={donationOptions}
                ></ServicesTable>
                <div className="h-center-inputs">
                  <Button
                    type="primary"
                    variant="contained"
                    onClick={() => setOpenCartModal(true)}
                    style={{ margin: 20 }}
                    className="btn-cls"
                    size="large"
                  >
                    Cart
                  </Button>
                  <Button
                    type="primary"
                    variant="contained"
                    className="btn-cls"
                    style={{ margin: 20 }}
                    size="large"
                    onClick={() => setOpenPayModal(true)}
                  >
                    Checkout
                  </Button>
                </div>
              </>
            ) : isError ? (
              "Oops! There was an error!"
            ) : (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="full"
                sx={{ borderRadius: "5px" }}
                height={250}
              />
            )}
          </Grid>
        </Grid>
      </>
    </>
  );
}

export default Donation;
