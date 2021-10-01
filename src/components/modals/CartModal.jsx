import { Modal, Typography } from "@mui/material";

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
      <Typography>Hello from cart</Typography>
    </Modal>
  );
};

export default CartModal;
