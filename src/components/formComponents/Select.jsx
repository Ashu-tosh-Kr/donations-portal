import { Autocomplete, TextField } from "@mui/material";
import { Field, useField } from "formik";
import { useState } from "react";
const Select = ({ name, options, label, ...rest }) => {
  const [tempInput, setTempInput] = useState("");
  const [, meta] = useField(name);
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
              //once the user selects a new geographical state,
              //we're changing the selectedState state wich is passed in get city use query and it triggers a city options refetch based on the new state
              if (name === "state") rest.setSelectedState(newValue);
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
