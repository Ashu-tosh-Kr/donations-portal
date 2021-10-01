import axios from "axios";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import "./Payment.styles.scss";
import * as Yup from "yup";
import InputField from "../components/InputField";
import BuyButton from "../components/BuyButton";
import creditCard from "../assets/images/creditCard.svg";
import { Grid, Typography } from "@material-ui/core";

const validationSchema = Yup.object({
  cardNumber: Yup.string().required("Required"),
  expires: Yup.string().required("Required"),
  cvv: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  street: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
});

export default function Payment() {
  const [sdkReady, setSdkReady] = useState(false);
  const initialValues = {
    cardNumber: "",
    expires: "",
    cvv: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      // const { data } = await axios.get("/api/config/paypal");
      const data = {
        clientToken: "",
      };
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=AZyy6akAuprcwc7ii-Rd3q7kIl-7HIjIwNJAkMur2jbEb3tAPnAfTTdN7Ciz5xwfGIu4ZxCtBPbeWpFe`;
      script.setAttribute("data-client-token", `${data.clientToken}`);
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    addPayPalScript();
  }, []);

  const onSubmit = (values) => {
    console.log(values);
  };

  if (!sdkReady) {
    return <div className="">Loading</div>;
  }
  // If the payment has been made
  if (false) {
    return <div>Payment successful.!</div>;
  }

  // If any error occurs
  if (false) {
    return <div>Error Occurred in processing payment.! Please try again.</div>;
  }

  // Default Render
  return (
    <div className="payment-container">
      {/* background svg */}
      <div class="custom-shape-divider-top-1633000458">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            class="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="payment-form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              style={{ textAlign: "center", lineHeight: "0.25em" }}
              variant="h4"
            >
              Amount
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ textAlign: "center" }} variant="h2">
              {"$300"}
            </Typography>
          </Grid>
        </Grid>
        <img style={{ height: "12rem" }} src={creditCard} alt="" />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>Billing Address </Typography>
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

                  <Grid item xs={12}>
                    <Typography>Contact Info</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <InputField name="phone" label="Phone Number" />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Card Details</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <InputField name="cardNumber" label="Card Number" />
                  </Grid>
                  <Grid item xs={7}>
                    <InputField name="expires" label="Expires" type="date" />
                  </Grid>
                  <Grid item xs={5}>
                    <InputField name="cvv" label="CVV" />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField name="firstName" label="First Name" />
                  </Grid>
                  <Grid item xs={6}>
                    <InputField name="lastName" label="Last Name" />
                  </Grid>
                </Grid>
                <BuyButton />
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
