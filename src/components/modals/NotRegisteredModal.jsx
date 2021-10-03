import { Button, Modal, Box, Alert, Grid, Typography } from "@mui/material";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const modalCardStyle = {
  minWidth: "20rem",
  width: "60%",
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
          <Grid container spacing={3}>
            <CloseOutlinedIcon sx={{ marginLeft: "auto", marginTop: "1rem" }} />
            <Grid item xs={12}>
              <Typography
                sx={{ textAlign: "center" }}
                variant="h3"
                color="primary"
              >
                <ErrorOutlineIcon
                  sx={{ transform: "scale(1.8)", margin: "0 1rem 0.4rem 0" }}
                />
                Alert
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Alert sx={{ fontSize: 20 }} severity="error">
                Incorrect email/phone number. Please input correct email/phone
                number. If you're not registered, would you like to register?
              </Alert>
            </Grid>
            <Grid item xs={2} sx={{ margin: "0 auto" }}>
              <Button
                sx={{ fontSize: 20 }}
                onClick={() => setOpenRegisterModal(true)}
                variant="contained"
                color="primary"
              >
                Yes
              </Button>
            </Grid>
            <Grid item xs={2} sx={{ margin: "0 auto" }}>
              <Button
                sx={{ fontSize: 20 }}
                variant="contained"
                color="secondary"
                onClick={() => setOpenNotRegisteredModal(false)}
              >
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
