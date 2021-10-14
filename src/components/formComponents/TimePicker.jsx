import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePickerMui from "@mui/lab/TimePicker";
import TextField from "@mui/material/TextField";
import { Field, useField } from "formik";
const TimePicker = ({ name, ...rest }) => {
  const [, meta] = useField(name);

  const configTimePicker = {
    ...rest,
  };
  return (
    <Field name={name}>
      {({ form, field }) => {
        const { setFieldValue } = form;
        const { value } = field;
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePickerMui
              {...configTimePicker}
              renderInput={(params) => (
                <TextField sx={{ width: "100%" }} {...params} />
              )}
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

export default TimePicker;
