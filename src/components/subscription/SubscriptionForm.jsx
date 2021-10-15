import { Grid, Button } from "@mui/material";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextArea from "../formComponents/TextArea";
import DatePicker from "../formComponents/DatePicker";
import TimePicker from "../formComponents/TimePicker";
import Select from "../formComponents/Select";
import {
  useAddServiceRequest,
  useLocationOptions,
  useServiceNameOptions,
} from "../../api/hooks";

const initialValues = {
  date: Date.now(),
  time: new Date().setHours(0, 0, 0, 0),
  location: "",
  serviceName: "",
  notes: "",
};

const validationSchema = Yup.object().shape({
  date: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  serviceName: Yup.string().required("Required"),
  notes: Yup.string().required("Required"),
});

const SubscriptionForm = () => {
  const { locationOptions, isLoading: locationsLoading } = useLocationOptions();
  const { serviceNameOptions, isLoading: serviceNameLoading } =
    useServiceNameOptions();
  const { mutateServiceRequest } = useAddServiceRequest();

  const onSubmit = (values, { resetForm }) => {
    mutateServiceRequest(values);
    resetForm(initialValues);
  };
  if (locationsLoading || serviceNameLoading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          w: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  return (
    <Grid sx={{ mx: 4, mb: 2 }} container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ height: 30, bgcolor: "primary.main" }}></Box>
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
                  <Grid item xs={6} md={6}>
                    <DatePicker name="date" label="Service Date" />
                  </Grid>

                  <Grid item xs={6}>
                    <TimePicker name="time" label="Service Time" />
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      name="location"
                      label="Service Location"
                      options={locationOptions}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Select
                      name="serviceName"
                      label="Service Name"
                      options={serviceNameOptions}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextArea
                      name="notes"
                      label="Please write details about the service required"
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
                        width: [150, 150, 200],
                        fontSize: [16, null, 20],
                      }}
                      size="large"
                    >
                      SEND
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
