import { useEffect } from "react";
import { useParams } from "react-router";

import RegisterModal from "../components/modals/RegisterModal";

function Donation() {
  const { productId } = useParams();
  useEffect(() => {
    localStorage.setItem("productId", productId);
  }, [productId]);
  return (
    <>
      <RegisterModal />
    </>
  );
}

export default Donation;
