import { Modal, Typography, Box } from "@mui/material";

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

const CartModal = ({ openCartModal, setOpenCartModal }) => {
  return (
    // <div className=""></div>
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      open={openCartModal}
      onClose={() => setOpenCartModal(false)}
      aria-labelledby="cart-modal"
      aria-describedby="Open Cart"
    >
      <Box sx={modalCardStyle}>
        <Typography>Hello from cart</Typography>
      </Box>
    </Modal>
  );
};

export default CartModal;
