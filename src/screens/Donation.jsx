import { useEffect, useState } from "react";
//Styles
import "./Donation.styles.scss";
import "antd/dist/antd.css";

//Components
import Header from "../components/header/Header";
import ServicesTable from "../components/table/ServicesTable";

//Antd
import { Input, Table } from "antd";

//API
import { GET_USER_DETAILS, useGetAllDonationOptions } from "../api/api";

//Constants
import { COLUMNS } from "../utils/Constants";
import PaymentModal from "../components/modals/PaymentModal";
import { Formik, Form } from "formik";
import { Grid, Button, Typography } from "@mui/material";
import InputField from "../components/formComponents/InputField";

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

function Donation() {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openPayModal, setOpenPayModal] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [fetchBtnDisabled, setFetchBtnDisabled] = useState(true);

  const { donationOptions, isLoading, isError } = useGetAllDonationOptions();

  /**
   * Triggers on top form submit button click
   * @param {*} values - form values
   */
  const onTopFormFinish = async (values) => {
    const userDetails = await GET_USER_DETAILS(values);
    setUserDetails(userDetails);
  };

  /**
   * Triggers on table check box change
   * @param {*} selectedRows
   * @param {*} selectedRowKeys
   */
  const onCheckboxChange = (selectedRows) => {
    setCartItems([...cartItems, ...selectedRows]);
  };

  /**
   * Triggers on inputs value change
   * @param {*} event
   */
  const handleInputChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  /**
   * Triggers on email or phone input blur input
   * @param {*} event
   */
  const onEmailPhoneBlur = (event) => {
    if (event.target.value) setFetchBtnDisabled(false);
  };

  return (
    <>
      <PaymentModal
        openPayModal={openPayModal}
        setOpenPayModal={setOpenPayModal}
      />
      <div>
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ textAlign: "center" }} variant="h4">
              Donor Details
            </Typography>
            <Formik>
              {(formik) => {
                // console.log(formik.values.expires);
                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography>Get Donor </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <InputField name="street" label="Street" />
                      </Grid>
                      <Grid item xs={6}>
                        <InputField name="city" label="City" />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={8}>
                            <InputField name="state" label="State" />
                          </Grid>
                          <Grid item xs={4}>
                            <InputField name="zip" label="ZIP Code" />
                          </Grid>

                          <Grid item xs={12}>
                            <Typography>Contact Info</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <InputField name="phone" label="Phone Number" />
                          </Grid>
                          <Grid item xs={12}>
                            <InputField name="email" label="Email" />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                        <Grid spacing={2} container>
                          <Grid item xs={12}>
                            <Typography>Card Details</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <InputField name="cardNumber" label="Card Number" />
                          </Grid>

                          <Grid item xs={6}>
                            <InputField name="firstName" label="First Name" />
                          </Grid>
                          <Grid item xs={6}>
                            <InputField name="lastName" label="Last Name" />
                          </Grid>
                        </Grid>
                        <Button
                          type="submit"
                          size="large"
                          sx={{ marginTop: "1rem" }}
                          variant="contained"
                          fullWidth
                        >
                          Proceed
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
          <Grid item xs={12} md={6}>
            {false ? (
              <>
                <ServicesTable
                  onCheckboxChange={(rows, keys) =>
                    onCheckboxChange(rows, keys)
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
