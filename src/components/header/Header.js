import { Alert } from "@mui/material";
import { useGetTempleDetails } from "../../api/hooks";
import "./Header.css";
function Header({ productId }) {
  const { templeDetails, isLoading, isError } = useGetTempleDetails(productId);
  if (isLoading)
    return (
      <Alert sx={{ m: 3 }} severity="info">
        Loading
      </Alert>
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
