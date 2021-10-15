import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import Table from "antd/es/table";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { PayPalButton } from "react-paypal-button-v2";
import { useGetTempleDetails } from "../../api/hooks";
import { useParams } from "react-router";

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
      render: (text) => <Typography variant="h6">{text}</Typography>,
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
      render: (text) => (
        <Typography variant="h6">{`$ ${(+text).toLocaleString("en", {
          useGrouping: true,
        })}.00`}</Typography>
      ),
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
  const totalAmt = () => {
    if (cartItems.length === 0) return 0;
    else {
      const amt = cartItems.reduce((total, next) => total + +next.amount, 0);
      return amt;
    }
  };
  const { productId } = useParams();
  const { templeDetails, isLoading, isError } = useGetTempleDetails(productId);

  return (
    <>
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={openCartModal}
        onClose={() => setOpenCartModal(false)}
        aria-labelledby="cart-modal"
        aria-describedby="Open Cart"
      >
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              w: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Alert sx={{ m: 3 }} severity="danger">
            Error
          </Alert>
        ) : (
          <Box sx={modalCardStyle}>
            <Stack spacing={4}>
              <CloseOutlinedIcon
                onClick={() => setOpenCartModal(false)}
                sx={{ marginLeft: "auto", marginTop: "1rem" }}
              />
              <img
                width="100"
                height="100"
                alt="logo"
                style={{ margin: "0 auto" }}
                src={templeDetails?.logo ? templeDetails.logo : null}
              />
              <h1 style={{ margin: "0 auto" }} className="">
                {templeDetails?.title}
              </h1>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 30,
                  margin: "0 13rem",
                  backgroundColor: "primary.main",
                  borderRadius: 3,
                  p: 1,
                  boxShadow: 1,
                }}
                variant="contained"
              >
                <Typography
                  variant="h4"
                  sx={{ color: "white" }}
                  display="inline"
                  component="p"
                >
                  CHECKOUT
                </Typography>
                <Box>
                  <ShoppingCartIcon
                    sx={{ transform: "scale(1.5)", mx: 1, color: "white" }}
                  />
                  <Typography
                    variant="h4"
                    sx={{ color: "white" }}
                    display="inline"
                    component="p"
                  >
                    {cartItems.length}
                  </Typography>
                </Box>
              </Box>
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
                            variant="h6"
                          >{`$ ${(+totalAmount).toLocaleString("en", {
                            useGrouping: true,
                          })}.00`}</Typography>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />

              {/* <Button
              onClick={() => {
                handleCartSubmit();
              }}
              sx={{ fontSize: [16, 18, 20] }}
              variant="contained"
              color="primary"
            >
              Proceed To Checkout
            </Button> */}
              {cartItems.length !== 0 ? (
                <PayPalButton
                  amount={totalAmt()}
                  options={{
                    clientId:
                      "AfyhAU4oKtg93fUxjYTlPbHdeKnyRG6SaTaBMbLlys9kajgc1GP8qcSR9wBNY6CWuZLpht1JkVRYOflA",
                  }}
                  shippingPreference="NO_SHIPPING"
                  onSuccess={(details, data) => {
                    handleCartSubmit(details.status, details.id);
                  }}
                />
              ) : null}
            </Stack>
          </Box>
        )}
      </Modal>
    </>
  );
};

export default CartModal;
