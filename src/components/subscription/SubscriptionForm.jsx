import { Grid, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useAddSubscriber } from "../../api/hooks";
import InputField from "../formComponents/InputField";
import RadioGroup from "../formComponents/RadioGroup";

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .when(["phoneRequired", "subscriptionRequired"], {
      is: (phoneRequired, subscriptionRequired) =>
        phoneRequired === "YES" && subscriptionRequired === "YES",
      then: Yup.string().required("Required"),
    })
    .matches(
      /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
      "Invalid Phone Number"
    ),
  alternativePhone: Yup.string().matches(
    /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
    "Invalid Phone Number"
  ),
  email: Yup.string()
    .email("Invalid email")
    .when(["emailRequired", "subscriptionRequired"], {
      is: (emailRequired, subscriptionRequired) =>
        emailRequired === "YES" && subscriptionRequired === "YES",
      then: Yup.string().required("Required"),
    }),
  alternativeEmail: Yup.string().email("Invalid email"),
  emailRequired: Yup.string().required("Required"),
  phoneRequired: Yup.string().required("Required"),
  subscriptionRequired: Yup.string().required("Required"),
});

const options = [
  { label: "YES", value: "YES" },
  { label: "NO", value: "NO" },
];

const SubscriptionForm = ({ userDetails }) => {
  const initialValues = {
    phone: userDetails.phone,
    alternativePhone: "",
    email: userDetails.email,
    alternativeEmail: "",
    phoneRequired: "YES",
    emailRequired: "YES",
    subscriptionRequired: "YES",
  };

  const { mutateSubscribe } = useAddSubscriber();

  const onSubmit = (values, { resetForm }) => {
    mutateSubscribe(values);
    resetForm(initialValues);
  };

  return (
    <Grid sx={{ mx: 4, mb: 2 }} container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ height: 40, bgcolor: "primary.main" }}>
          <Typography sx={{ textAlign: "center", color: "white" }} variant="h4">
            Communication Preferences
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            // console.log(formik.values);
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                      Subscribe To Our Temple Communications
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "center" }}
                    xs={12}
                  >
                    <RadioGroup
                      name="subscriptionRequired"
                      // label="Email"
                      options={options}
                    />
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <InputField
                      name="email"
                      label="Email"
                      disabled={formik.values.subscriptionRequired !== "YES"}
                    />
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <InputField
                      name="alternativeEmail"
                      label="Alternate Email"
                      disabled={formik.values.subscriptionRequired !== "YES"}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "center" }}
                    xs={12}
                    md={2}
                  >
                    <RadioGroup
                      name="emailRequired"
                      // label="Email"
                      options={options}
                      disabled={formik.values.subscriptionRequired !== "YES"}
                    />
                  </Grid>

                  <Grid item xs={6} md={5}>
                    <InputField
                      name="phone"
                      label="Phone"
                      onChange={(e) => {
                        formik.handleChange(e);
                        let x = e.target.value;
                        var index = x.lastIndexOf("-");
                        var test = x.substr(index + 1);
                        if (test.length === 3 && x.length < 8) x = x + "-";
                        formik.setFieldValue("phone", x);
                      }}
                      disabled={formik.values.subscriptionRequired !== "YES"}
                    />
                  </Grid>
                  <Grid item xs={6} md={5}>
                    <InputField
                      name="alternativePhone"
                      label="Alternate Phone"
                      onChange={(e) => {
                        formik.handleChange(e);
                        let x = e.target.value;
                        var index = x.lastIndexOf("-");
                        var test = x.substr(index + 1);
                        if (test.length === 3 && x.length < 8) x = x + "-";
                        formik.setFieldValue("alternativePhone", x);
                      }}
                      disabled={formik.values.subscriptionRequired !== "YES"}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "center" }}
                    xs={12}
                    md={2}
                  >
                    <RadioGroup
                      name="phoneRequired"
                      // label="Email"
                      options={options}
                      disabled={formik.values.subscriptionRequired !== "YES"}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{ display: "flex", justifyContent: "center", w: 100 }}
                    xs={12}
                  >
                    <Button
                      type="primary"
                      variant="contained"
                      sx={{
                        mt: 5,
                        width: [150, 175, 250],
                        fontSize: [16, null, 20],
                      }}
                      size="large"
                    >
                      Save Preferences
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default SubscriptionForm;
