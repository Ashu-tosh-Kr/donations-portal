import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  TextField,
} from "@mui/material";
import { Field, useField } from "formik";
import { useState } from "react";
const Select = ({ name, options, label, ...rest }) => {
  const [tempInput, setTempInput] = useState("");
  const [field, meta] = useField(name);
  return (
    <Field name={name}>
      {({ form, field }) => {
        const { setFieldValue } = form;
        const { value } = field;
        return (
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setFieldValue(name, newValue ? newValue : "");
            }}
            inputValue={tempInput}
            onInputChange={(event, newInputValue) => {
              setTempInput(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
                label={label}
              />
            )}
          />
        );
      }}
    </Field>
  );
};

export default Select;
