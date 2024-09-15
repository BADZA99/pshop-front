import { Outlet } from 'react-router'
import './App.css'
import NavItems from './components/NavItems'
import Footer from './components/Footer'
import Axios from "axios";
import { useLayoutEffect } from 'react';
import axios from 'axios';
import { useUserStore } from './store/userStore';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Axios.defaults.baseURL = "http://127.0.0.1:8000/api" ;
// pass cookie from the backend
Axios.defaults.withCredentials = true;


function App() {

  const { setUser,user } = useUserStore();
  // useLayoutEffect(() => {
  //   const fetchConnectedUser = async () => {
  //     try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get("/user", {
  //       headers: {
  //         "X-Requested-With": "XMLHttpRequest",
  //       Authorization: `Bearer ${token}`,
  //       },
  //     });
  //       console.log(response.data);
  //       setUser(response.data);
        
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   console.log(user);
  //   fetchConnectedUser();
  // }, [user]);
console.log(user)
  return (
    <>
      {/* <NavItems 
       /> */}
      <div className="min-vh-100">
        <Outlet />
      </div>
      <Footer />

     <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover
         />
    </>
  );
}

export default App

