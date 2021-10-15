import { useState } from "react";

import Header from "../components/header/Header";

import { useGetUserDetails } from "../api/hooks";
import "antd/dist/antd.css";
import PaymentModal from "../components/modals/PaymentModal";
import { Formik, Form } from "formik";
import { Grid, Button, Typography, Alert, Divider } from "@mui/material";
import InputField from "../components/formComponents/InputField";
import NotRegisteredModal from "../components/modals/NotRegisteredModal";
import * as Yup from "yup";
import { red } from "@mui/material/colors";
import { useParams } from "react-router";
import RequestForm from "../components/requestForm/RequestForm";

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
  phone: Yup.string()
    .when("email", {
      is: (email) => !email || email.length === 0,
      then: Yup.string().required("Required"),
    })
    .matches(
      /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
      "Invalid Phone Number"
    ),
});

function Donation() {
  const [openPayModal, setOpenPayModal] = useState(false);
  //prop drilled to useRegister hook via Nonreg and reg modals
  const [openNotRegisteredModal, setOpenNotRegisteredModal] = useState(false);
  //prop drilled to useRegister hook via NotRegisteredModal and RegisterModal modals
  const [userDetails, setUserDetails] = useState(initialUserValues);
  const { productId } = useParams();

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

  return (
    <>
      <PaymentModal
        openPayModal={openPayModal}
        setOpenPayModal={setOpenPayModal}
      />
      <NotRegisteredModal
        setUserDetails={setUserDetails}
        openNotRegisteredModal={openNotRegisteredModal}
        setOpenNotRegisteredModal={setOpenNotRegisteredModal}
      />

      <>
        <Header productId={productId} />
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
                SEVICE REQUEST
              </Divider>
            </Typography>
            <Formik
              enableReinitialize
              initialValues={userDetails}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                // console.log(formik.values.phone);
                return (
                  <Form>
                    <Grid container spacing={2} sx={{ marginBottom: "1rem" }}>
                      <Grid item xs={12}>
                        <Typography>Contact Information</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} md={4}>
                        <InputField
                          name="email"
                          label="Email"
                          disabled={!!formik.values.phone}
                        />
                      </Grid>
                      <Grid item xs={12} sm={1}>
                        <Typography
                          variant="h5"
                          sx={{
                            paddingTop: "0.5rem",
                            textAlign: "center",
                            fontSize: [16, 17, 20],
                          }}
                        >
                          OR
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={5} md={4}>
                        <InputField
                          name="phone"
                          label="Phone"
                          disabled={!!formik.values.email}
                          onChange={(e) => {
                            formik.handleChange(e);
                            let x = e.target.value;
                            var index = x.lastIndexOf("-");
                            var test = x.substr(index + 1);
                            if (test.length === 3 && x.length < 8) x = x + "-";
                            formik.setFieldValue("phone", x);
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Button
                          sx={{ height: "3.3rem", fontSize: [16, 17, 20] }}
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
          <Grid item sx={{ margin: "1rem" }} xs={12}>
            <Divider variant="middle" />
          </Grid>
          <Grid
            item
            sx={{ display: "flex", justifyContent: "center", w: 100 }}
            xs={12}
          >
            <RequestForm />
          </Grid>
        </Grid>
      </>
    </>
  );
}

export default Donation;
