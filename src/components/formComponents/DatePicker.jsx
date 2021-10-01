import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import { Field, useField } from "formik";
const DatePicker = ({ name, ...rest }) => {
  const [field, meta] = useField(name);
  const configDatePicker = {
    ...rest,
  };
  return (
    <Field name={name}>
      {({ form, field }) => {
        const { setFieldValue } = form;
        const { value } = field;
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              {...configDatePicker}
              renderInput={(params) => <TextField {...params} />}
              value={value}
              onChange={(val) => setFieldValue(name, val)}
              error={meta.touched && !!meta.error}
            />
          </LocalizationProvider>
        );
      }}
    </Field>
  );
};

export default DatePicker;
