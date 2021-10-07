import { Typography } from "@mui/material";
import { useGetTempleDetails } from "../../api/hooks";
import logo from "../../assets/images/SBAT.png";
import "./Header.css";
function Header({ productId }) {
  const { templeDetails, isLoading, isError } = useGetTempleDetails(productId);
  if (isLoading) return <Typography>Loading</Typography>;
  if (isError) return <Typography>Error</Typography>;
  return (
    <header className="header-section">
      <img
        width="100"
        height="100"
        alt="logo"
        src={templeDetails?.logo ? templeDetails.logo : logo}
      />
      <h1 className="title-cls">{templeDetails?.title}</h1>
    </header>
  );
}

export default Header;
