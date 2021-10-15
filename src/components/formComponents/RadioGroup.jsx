import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Field } from "formik";
const CheckBoxGroup = ({ name, label, ...rest }) => {
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
              onChange={(val) => setFieldValue(name, val)}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default CheckBoxGroup;
