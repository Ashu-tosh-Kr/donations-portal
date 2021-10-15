import { Alert, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useGetTempleDetails } from "../../api/hooks";
import "./Header.css";
function Header({ productId }) {
  const { templeDetails, isLoading, isError } = useGetTempleDetails(productId);
  if (isLoading)
    return (
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
    );
  if (isError)
    return (
      <Alert sx={{ m: 3 }} severity="danger">
        Error
      </Alert>
    );
  return (
    <header className="header-section">
      <img
        width="100"
        height="100"
        alt="logo"
        src={templeDetails?.logo ? templeDetails.logo : null}
      />
      <h1 className="title-cls">{templeDetails?.title}</h1>
    </header>
  );
}

export default Header;
