import { useState } from "react";
//Styles
import "./Donation.styles.scss";

//Components
import Header from "../components/header/Header";
import ServicesTable from "../components/table/ServicesTable";

//API
import { useGetAllDonationOptions, useGetUserDetails } from "../api/api";

//Constants
import { COLUMNS } from "../utils/Constants";
import PaymentModal from "../components/modals/PaymentModal";
import { Formik, Form } from "formik";
import { Grid, Button, Typography } from "@mui/material";
import InputField from "../components/formComponents/InputField";
import CheckBoxGroup from "../components/formComponents/CheckBoxGroup";
import RegisterModal from "../components/modals/RegisterModal";
import CartModal from "../components/modals/CartModal";
import * as Yup from "yup";

const initialUserValues = {
  refDataName: "",
  dob: "",
  gender: "",
  gotraName: "",
  nakshatraName: "",
  entrpAddressLine1: "",
  entrpCityName: "",
  entrpStateName: "",
  entrpZIPCode: "",
};
const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid email"),
});

const onSubmit = (values) => {
  console.log(values);
};
function Donation() {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openPayModal, setOpenPayModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const { donationOptions, isLoading, isError } = useGetAllDonationOptions();

  return (
    <>
      <PaymentModal
        openPayModal={openPayModal}
        setOpenPayModal={setOpenPayModal}
      />
      <RegisterModal
        openRegisterModal={openRegisterModal}
        setOpenRegisterModal={setOpenRegisterModal}
      />
      <CartModal
        openCartModal={openCartModal}
        setOpenCartModal={setOpenCartModal}
      />
      <div>
        <Header />
        <Grid container spacing={2}>
          <Grid sx={{ margin: "0 auto" }} item xs={8}>
            <Typography sx={{ textAlign: "center" }} variant="h4">
              Donations
            </Typography>
            <Formik
              initialValues={initialUserValues}
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
                        >
                          Get Details
                        </Button>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography>Donor Profile</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <InputField name="name" label="Name" />
                          </Grid>
                          <Grid item xs={7}>
                            <InputField
                              name="nakshatraName"
                              label="Nakshatra"
                            />
                          </Grid>
                          <Grid item xs={5}>
                            <InputField name="gotraName" label="Gotra" />
                          </Grid>
                          <Grid item xs={12}>
                            <CheckBoxGroup />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography>Address</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <InputField name="street" label="Street" />
                          </Grid>
                          <Grid item xs={12}>
                            <InputField name="city" label="City" />
                          </Grid>

                          <Grid item xs={8}>
                            <InputField name="state" label="State" />
                          </Grid>
                          <Grid item xs={4}>
                            <InputField name="zip" label="ZIP Code" />
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
                    onClick={() => setOpenCartModal(true)}
                    style={{ margin: 20 }}
                    className="btn-cls"
                    size="large"
                  >
                    Cart
                  </Button>
                  <Button
                    type="primary"
                    className="btn-cls"
                    style={{ margin: 20 }}
                    size="large"
                  >
                    Checkout
                  </Button>
                </div>
              </>
            ) : isError ? (
              "Oops! There was an error!"
            ) : null}
          </Grid>
        </Grid>
        <Button onClick={() => setOpenPayModal(true)}>Open</Button>
      </div>
    </>
  );
}

export default Donation;
