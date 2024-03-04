import { BrowserRouter } from "react-router-dom";

import Header from "./pages/header/Header";

import { ToastContainer } from "react-toastify";
import AllRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AllRoutes />
      {/* <ToastContainer /> */}
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce,
      />
    </BrowserRouter>
  );
}

export default App;
