import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Field } from "formik";
const CheckBoxGroup = ({ name, label, options, ...rest }) => {
  return (
    <Field name={name}>
      {({ form, field }) => {
        const { setFieldValue } = form;
        const { value } = field;
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              defaultValue="female"
              name="radio-buttons-group"
              value={value}
              onChange={(e) => setFieldValue(name, e.target.value)}
            >
              {options.map((option, i) => (
                <FormControlLabel
                  key={i}
                  value={option.value}
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 35,
                        },
                      }}
                      {...rest}
                    />
                  }
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default CheckBoxGroup;
