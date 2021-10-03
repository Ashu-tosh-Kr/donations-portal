import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import Table from "antd/es/table";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentModal from "./PaymentModal";

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

const CartModal = ({
  openCartModal,
  setOpenCartModal,
  cartItems,
  removeFromCart,
  //remove once apis are working
  setOpenPayModal,
  handleCartSubmit,
}) => {
  const COLUMNS = [
    {
      title: (
        <h2>
          <a>Service Name</a>
        </h2>
      ),
      dataIndex: "name",
      key: "donationType",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: (
        <h2>
          <a>Amount</a>
        </h2>
      ),
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (text) => <h4>{`$ ${text}.00`}</h4>,
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (item) => (
        <Button onClick={() => removeFromCart(item)} aria-label="delete">
          <DeleteIcon sk={{ fontSize: "3rem" }} />
        </Button>
      ),
    },
  ];
  return (
    <>
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={openCartModal}
        onClose={() => setOpenCartModal(false)}
        aria-labelledby="cart-modal"
        aria-describedby="Open Cart"
      >
        <Box sx={modalCardStyle}>
          <Stack spacing={2}>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h3"
              color="primary"
            >
              <ShoppingCartIcon sx={{ fontSize: "5rem" }} />
            </Typography>
            <Table
              dataSource={cartItems}
              columns={COLUMNS}
              pagination={false}
              summary={(pageData) => {
                let totalAmount = 0;

                pageData.forEach(({ amount }) => {
                  totalAmount += +amount;
                });

                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell>
                        <Typography color="primary" variant="h5">
                          Total
                        </Typography>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell>
                        <Typography variant="h5">{`$ ${totalAmount}.00`}</Typography>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  </>
                );
              }}
            />

            <Button
              onClick={() => {
                handleCartSubmit();
                //remove once apis are working
                setOpenPayModal(true);
              }}
              variant="contained"
              color="primary"
            >
              Proceed To Checkout
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default CartModal;
