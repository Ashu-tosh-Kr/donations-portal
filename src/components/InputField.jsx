import { Field } from "formik";
import "./InputField.styles.scss";
import { TextField } from "formik-material-ui";
const InputField = ({ name, ...rest }) => {
  return (
    <Field
      style={{ width: "100%" }}
      component={TextField}
      variant="outlined"
      name={name}
      {...rest}
    />
  );
};

export default InputField;
