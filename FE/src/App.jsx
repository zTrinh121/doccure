import { RouterProvider } from "react-router-dom";
import router from "./routes";

import HomeLayout from "./layout/HomeLayout";

// import './App.css'

function App() {


  return (
    <>
    
      <RouterProvider router={router} />
        {/* <LoginPage></LoginPage> */}
    </>
  );
}

export default App;
