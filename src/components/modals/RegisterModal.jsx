import { Button, Modal, Typography, Box, Grid } from "@mui/material";
import { useGetRashiOptions } from "../../api/api";
import * as Yup from "yup";
import { useState } from "react";
import { Form, Formik } from "formik";
import Select from "../formComponents/Select";
import InputField from "../formComponents/InputField";
const modalCardStyle = {
  minWidth: "20rem",
  width: "30%",
  overflowY: "scroll",
  maxHeight: "95vh",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
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
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  age: Yup.string().required("Required"),
  nakshatra: Yup.string().required("Required"),
  gotra: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
});

const RegisterModal = ({ openRegisterModal, setOpenRegisterModal }) => {
  const [registrationDetails, setRegistrationDetails] = useState(initialValues);
  const { rashiOptions } = useGetRashiOptions();
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      open={openRegisterModal}
      onClose={() => setOpenRegisterModal(false)}
      aria-labelledby="register-modal"
      aria-describedby="Prompt user to register"
    >
      <Box sx={modalCardStyle}>
        <Typography
          color="primary"
          variant="h4"
          sx={{ textAlign: "center", margin: "1rem 0" }}
        >
          Registration Form
        </Typography>
        <Formik
          enableReinitialize
          initialValues={registrationDetails}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            // console.log(formik.values.expires);
            return (
              <Form>
                <Grid container spacing={2}>
                  {/* <Grid item xs={12}>
                    <Typography>Contact Information</Typography>
                  </Grid> */}
                  <Grid item xs={12}>
                    <InputField name="name" label="Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {/* <Grid item xs={12}>
                        <Typography>Donor Profile</Typography>
                      </Grid> */}
                      <Grid item xs={9}>
                        <InputField name="phone" label="Phone" />
                      </Grid>
                      <Grid item xs={3}>
                        <InputField name="age" label="Age" />
                      </Grid>
                      <Grid item xs={7}>
                        <Select
                          label="Nakshatra"
                          name="nakshatra"
                          options={["hi", "hello"]}
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <Select
                          label="Gotra"
                          name="gotra"
                          options={rashiOptions}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      {/* <Grid item xs={12}>
                        <Typography>Address</Typography>
                      </Grid> */}
                      <Grid item xs={12}>
                        <InputField name="address" label="Address" />
                      </Grid>
                      <Grid item xs={12}>
                        <Select
                          label="City"
                          name="city"
                          options={["hi", "hello"]}
                        />
                      </Grid>

                      <Grid item xs={8}>
                        <Select
                          label="State"
                          name="state"
                          options={["hi", "hello"]}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <InputField name="zip" label="ZIP Code" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Register
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
