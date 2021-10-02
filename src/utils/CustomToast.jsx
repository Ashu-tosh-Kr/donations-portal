import { toast, ToastContainer } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
// import "../custom-toast/style.scss";

const CustomToast = (msg) => {
  const notify = () =>
    toast.info(msg, {
      position: "bottom-center",
      className: "custom-toast",
      bodyClassName: "custom-toast-body",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  notify();
};

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export { CustomToast, CustomToastContainer };
