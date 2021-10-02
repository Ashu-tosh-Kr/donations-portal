import { Button, Modal, Typography, Box, Alert, Grid } from "@mui/material";
import { useState } from "react";
import RegisterModal from "./RegisterModal";

const modalCardStyle = {
  minWidth: "20rem",
  width: "40%",
  overflowY: "scroll",
  maxHeight: "95vh",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const NotRegisteredModal = ({
  openNotRegisteredModal,
  setOpenNotRegisteredModal,
}) => {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  return (
    <>
      <RegisterModal
        openRegisterModal={openRegisterModal}
        setOpenRegisterModal={setOpenRegisterModal}
      />
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={openNotRegisteredModal}
        onClose={() => setOpenNotRegisteredModal(false)}
        aria-labelledby="register-modal"
        aria-describedby="Prompt user to register"
      >
        <Box sx={modalCardStyle}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Alert severity="error">
                Oops! It seems like you are not registered. Would you like to
                register? proceed
              </Alert>
            </Grid>
            <Grid item xs={2} sx={{ margin: "0 auto" }}>
              <Button
                onClick={() => setOpenRegisterModal(true)}
                variant="contained"
                color="primary"
              >
                Yes
              </Button>
            </Grid>
            <Grid item xs={2} sx={{ margin: "0 auto" }}>
              <Button variant="contained" color="secondary">
                No
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default NotRegisteredModal;
