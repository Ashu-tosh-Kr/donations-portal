import { Button, Modal, Typography, Box, Grid } from "@mui/material";
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
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
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

const RegisterModal = ({
  openRegisterModal,
  setOpenRegisterModal,
  setUserDetails,
  setOpenNotRegisteredModal,
}) => {
  const { nakshatraOptions } = useGetNakshatraOptions();
  const { gotraOptions } = useGetGotraOptions();
  const { stateOptions } = useGetStateOptions();
  const [selectedState, setSelectedState] = useState("VIRGINIA");
  const { cityOptions } = useGetCityOptions(selectedState);
  const { mutateRegister } = useRegister(
    setOpenRegisterModal,
    setOpenNotRegisteredModal,
    setUserDetails
  );
  const onSubmit = (values) => {
    mutateRegister(values);
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
        <Grid container spacing={0}>
          <CloseOutlinedIcon
            onClick={() => setOpenRegisterModal(false)}
            sx={{ marginLeft: "auto" }}
          />
          <Grid item xs={12}>
            <Typography
              color="primary"
              variant="h4"
              sx={{ textAlign: "center", margin: "0.75rem 0" }}
            >
              Registration Form
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
                        {/* <Grid item xs={12}>
                        <Typography>Address</Typography>
                      </Grid> */}
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
