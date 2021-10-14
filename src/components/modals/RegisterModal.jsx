import {
  Button,
  Modal,
  Typography,
  Box,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  useGetCityOptions,
  useGetGotraOptions,
  useGetNakshatraOptions,
  useGetStateOptions,
  useRegister,
} from "../../api/hooks";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Select from "../formComponents/Select";
import InputField from "../formComponents/InputField";
import { useState } from "react";
import Header from "../header/Header";

const modalCardStyle = {
  width: ["90%", "60%", "40%", "30%"],
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
  firstName: "",
  lastName: "",
  age: "",
  gotra: "",
  nakshatra: "",
  memberType: "Volunteer",
  address: "",
  city: "",
  state: "",
  zip: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .required("Required")
    .matches(
      /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
      "Invalid Phone Number"
    ),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  age: Yup.string().required("Required"),
  nakshatra: Yup.string().required("Required"),
  gotra: Yup.string().required("Required"),
  memberType: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string().required("Required"),
});

const RegisterModal = () => {
  const { nakshatraOptions, isLoading: nakshatraLoading } =
    useGetNakshatraOptions();
  const { gotraOptions, isLoading: gotaLoading } = useGetGotraOptions();
  const { stateOptions, isLoading: stateLoading } = useGetStateOptions();
  const [selectedState, setSelectedState] = useState("VIRGINIA");
  const { cityOptions, isLoading: cityLoading } =
    useGetCityOptions(selectedState);
  const { mutateRegister } = useRegister();
  const onSubmit = (values, { resetForm }) => {
    mutateRegister(values);
    resetForm(initialValues);
  };
  if (cityLoading || stateLoading || gotaLoading || nakshatraLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          w: "100vw",
          border: 1,
        }}
      >
        <CircularProgress />
      </Box>
    );
  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      open={true}
      aria-labelledby="register-modal"
      aria-describedby="Prompt user to register"
    >
      <Box sx={modalCardStyle}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Typography
              color="primary"
              variant="h4"
              sx={{ textAlign: "center", marginBottom: "1rem" }}
            >
              Volunteer Registration Form
            </Typography>
          </Grid>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              // console.log(formik.values.expires);
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <InputField name="firstName" label="First Name" />
                    </Grid>
                    <Grid item xs={6}>
                      <InputField name="lastName" label="Last Name" />
                    </Grid>
                    <Grid item xs={12}>
                      <InputField name="email" label="Email" />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
                          <InputField
                            name="phone"
                            label="Phone"
                            onChange={(e) => {
                              formik.handleChange(e);
                              let x = e.target.value;
                              var index = x.lastIndexOf("-");
                              var test = x.substr(index + 1);
                              if (test.length === 3 && x.length < 8)
                                x = x + "-";
                              formik.setFieldValue("phone", x);
                            }}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <InputField name="age" label="Age" />
                        </Grid>

                        <Grid item xs={5}>
                          <Select
                            label="Gotra"
                            name="gotra"
                            options={gotraOptions}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Select
                            label="Nakshatra"
                            name="nakshatra"
                            options={nakshatraOptions}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <InputField
                            disabled
                            name="memberType"
                            label="Member Type"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <InputField name="address" label="Address" />
                        </Grid>
                        <Grid item xs={12}>
                          <Select
                            label="State"
                            name="state"
                            options={stateOptions}
                            setSelectedState={setSelectedState}
                          />
                        </Grid>

                        <Grid item xs={8}>
                          <Select
                            label="City"
                            name="city"
                            options={cityOptions ? cityOptions : [""]}
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
                    sx={{
                      marginTop: "1.5rem",
                      padding: "0.5rem",
                      fontSize: 20,
                    }}
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
        </Grid>
      </Box>
    </Modal>
  );
};

export default RegisterModal;
