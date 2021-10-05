import { Modal, Box, Typography, Button, Stack } from "@mui/material";
import Table from "antd/es/table";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const modalCardStyle = {
  minWidth: "20rem",
  width: { xs: "90%", sm: "70%", md: "60%", lg: "40%" },
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
        <Typography sx={{ fontSize: [19, 22, 24] }} variant="h4">
          Service Name
        </Typography>
      ),
      dataIndex: "name",
      key: "donationType",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: (
        <Typography sx={{ fontSize: [19, 22, 24] }} variant="h4">
          Amount
        </Typography>
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
          <Stack spacing={4}>
            <CloseOutlinedIcon
              onClick={() => setOpenCartModal(false)}
              sx={{ marginLeft: "auto", marginTop: "1rem" }}
            />
            <Button
              sx={{ textAlign: "center", fontSize: 30, margin: "0 13rem" }}
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
            >
              {cartItems.length}
            </Button>
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
                        <Typography
                          color="primary"
                          sx={{ textAlign: "right" }}
                          variant="h5"
                        >{`$ ${totalAmount}.00`}</Typography>
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
              sx={{ fontSize: [16, 18, 20] }}
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
