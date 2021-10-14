import { useField } from "formik";
import { TextField } from "@mui/material";

const InputField = ({ name, ...rest }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    name,
    ...field,
    ...rest,
    fullWidth: true,
    variant: "outlined",
    multiline: true,
    minRows: 4,
  };
  return (
    <TextField
      {...configTextField}
      minRows={4}
      sx={{ w: 100 }}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  );
};
export default InputField;
