import { Modal, Typography } from "@mui/material";

const RegisterModal = ({ openRegisterModal, setOpenRegisterModal }) => {
  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      open={openRegisterModal}
      onClose={() => setOpenRegisterModal(false)}
      aria-labelledby="register-modal"
      aria-describedby="Prompt user to register"
    >
      <Typography>
        Oops! It seems like we don't have your details. Please register to
        proceed
      </Typography>
    </Modal>
  );
};

export default RegisterModal;
