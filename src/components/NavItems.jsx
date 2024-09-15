// import { useEffect, useLayoutEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/images/logo/logo.png";
// import { useUserStore } from "@/store/userStore";
// import axios from "axios";
// import { toast } from "react-toastify";

// import {
//   Menubar,
//   MenubarContent,
//   MenubarItem,
//   MenubarMenu,
//   MenubarSeparator,
//   MenubarShortcut,
//   MenubarTrigger,
// } from "@/components/ui/menubar"


// const NavItems = () => {
//   const [menuToggle, setMenuToggle] = useState(false);
//   const [socialToggle, setSocialToggle] = useState(false);
//   const [headerFixed, setheaderFixed] = useState(false);

//   // add event listener
//   window.addEventListener("scroll", () => {
//     if (window.scrollY > 100) {
//       setheaderFixed(true);
//     } else {
//       setheaderFixed(false);
//     }
//   });

//    const { setUser, user } = useUserStore();
//    console.log(user);
//      const navigate = useNavigate();

//   //  logout function
//     const logout = async () => {
//       try {
//          const token = localStorage.getItem("token");
//              const response = await axios.get("/logout", {
//                headers: {
//                  "X-Requested-With": "XMLHttpRequest",
//                  Authorization: `Bearer ${token}`,
//                },
//              });

//              if (response.status===200) {
//                setUser({});
//                localStorage.removeItem("token");
//                 console.log(user);
//                toast.success(`${response.data.message}`);
//                   setTimeout(() => {
//                     navigate("/");
//                   }, 3000);
//              }
       
//       } catch (error) {
//         console.log(error);
//         toast.error(`${error.response.data.message}`);
//       }
//     };

//     console.log(user);
//   // useEffect(() => {

//   // }, [setUser]);

    

//   return (
//     <header
//       className={`header-section style-4 ${
//         headerFixed ? "header-fixed fadeInUp" : ""
//       }`}
//     >
//       {/* header top start */}
//       <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
//         {user !== null && (
//           <div className="container">
//             <div className="header-top-area">
//               <Link to="/signup" className="lab-btn me-3">
//                 <span>{user?.nom}</span>
//               </Link>
//               <Link to="/login">Log out</Link>
//             </div>
//           </div>
//         )}

//         {user === null && (
//           <div className="container">
//             <div className="header-top-area">
//               <Link to="/signup" className="lab-btn me-3">
//                 <span>Create Account</span>
//               </Link>
//               <Link to="/login">Log in</Link>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* header section */}
//       <div className="header-bottom">
//         <div className="container">
//           <div className="header-wrapper">
//             {/* logo */}
//             <div className="logo-search-acte">
//               <div className="logo">
//                 <Link to="/">
//                   <img src={logo} alt="logo" />
//                 </Link>
//               </div>
//             </div>
//             {/* menu area  */}
//             <div className="menu-area">
//               <div className="menu">
//                 <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
//                   <li>
//                     <Link to="/">Home</Link>
//                   </li>
//                   <li>
//                     <Link to="/about">About</Link>
//                   </li>
//                   <li>
//                     <Link to="/services">Services</Link>
//                   </li>
//                   <li>
//                     <Link to="/dasboard">dasboard</Link>
//                   </li>
//                   <li>
//                     <Link to="/contact">Contact</Link>
//                   </li>
//                 </ul>
//               </div>
//               {/* auth buttons */}
//               {user === null && (
//                 <Link to="/register" className="lab-btn me-3 d-none d-md-block">
//                   Create Account
//                 </Link>
//               )}
//               {user === null && (
//                 <Link to="/login" className="d-none d-md-block">
//                   login
//                 </Link>
//               )}
//               {user !== null && (
//                 <Link to="/register" className="lab-btn me-3 d-none d-md-block">
//                   {user?.nom}
//                 </Link>
//               )}
//               {user !== null && (
//                 <span onClick={logout} className="d-none d-md-block">
//                   logout
//                 </span>
//               )}

//               <Menubar>
//                 <MenubarMenu>
//                   <MenubarTrigger>{user?.nom}</MenubarTrigger>
//                   <MenubarContent>
//                     <MenubarItem>
//                       New Tab <MenubarShortcut>⌘T</MenubarShortcut>
//                     </MenubarItem>
//                     <MenubarItem>New Window</MenubarItem>
//                     <MenubarSeparator />
//                     <MenubarItem>Share</MenubarItem>
//                     <MenubarSeparator />
//                     <MenubarItem>Print</MenubarItem>
//                   </MenubarContent>
//                 </MenubarMenu>
//               </Menubar>

//               {/* menu toggler */}
//               <div
//                 onClick={() => setMenuToggle(!menuToggle)}
//                 className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
//               >
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>

//               {/* social toggler */}
//               <div
//                 className="ellepsis-bar d-md-none"
//                 onClick={() => setSocialToggle(!socialToggle)}
//               >
//                 <i className="icofont-info-square"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default NavItems;



import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setheaderFixed] = useState(false);

  const { setUser, user } = useUserStore();
  const navigate = useNavigate();

  // Fonction pour gérer le scroll et fixer le header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setheaderFixed(true);
      } else {
        setheaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Vérifier l'utilisateur dans localStorage
  useEffect(() => {
    if (user === null) {
      
      const token = localStorage.getItem("token");
      if (token) {
        axios
          .get("user", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération de l'utilisateur",
              error
            );
            localStorage.removeItem("token");
          });
      }
    }
  }, [setUser]);

  console.log(user)
  // Fonction pour gérer la déconnexion
const logout = async () => {
        try {
           const token = localStorage.getItem("token");
               const response = await axios.get("/logout", {
                 headers: {
                   "X-Requested-With": "XMLHttpRequest",
                   Authorization: `Bearer ${token}`,
                 },
               });
                  console.log(response);
               if (response.status===200) {
                 setUser(null);
                 localStorage.removeItem("token");
                  console.log(user);
                 toast.success(`${response.data.message}`);
                    setTimeout(() => {
                      navigate("/");
                    }, 3000);
               }

        } catch (error) {
          console.log(error);
          toast.error(`${error.response.data.message}`);
        }
      };

  return (
    <header
      className={`header-section style-4 ${
        headerFixed ? "header-fixed fadeInUp" : ""
      }`}
    >
      {/* header top start */}
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        {user ? (
          <div className="container">
            <div className="header-top-area">
              <Link to="/signup" className="lab-btn me-3">
                <span>{user?.nom}</span>
              </Link>
              <span onClick={logout} className="d-none d-md-block">
                Log out
              </span>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="header-top-area">
              <Link to="/signup" className="lab-btn me-3">
                <span>Create Account</span>
              </Link>
              <Link to="/login">Log in</Link>
            </div>
          </div>
        )}
      </div>

      {/* header section */}
      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            {/* logo */}
            <div className="logo-search-acte">
              <div className="logo">
                <Link to="/">
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>
            {/* menu area */}
            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/services">Services</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                </ul>
              </div>
              {/* auth buttons */}
              {user === null ? (
                <>
                  <Link
                    to="/register"
                    className="lab-btn me-3 d-none d-md-block"
                  >
                    Create Account
                  </Link>
                  <Link to="/login" className="d-none d-md-block">
                    Login
                  </Link>
                </>
              ) : (
                <>
                  {/* <Link
                    to="/profile"
                    className="lab-btn me-3 d-none d-md-block"
                  >
                    {user?.nom}
                  </Link> */}
                    <Menubar
                className="lab-btn me-3 d-none d-md-block">
                <MenubarMenu>
                  <MenubarTrigger>{user?.nom || "Menu"}</MenubarTrigger>
                  <MenubarContent>
                    <MenubarItem>
                         mon profile
                    </MenubarItem>
                    <MenubarItem>Mes commandes</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>panier</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
                  <span onClick={logout} className="d-none d-md-block cursor-pointer">
                    Logout
                  </span>
                </>
              )}
            

              {/* menu toggler */}
              <div
                onClick={() => setMenuToggle(!menuToggle)}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              {/* social toggler */}
              <div
                className="ellepsis-bar d-md-none"
                onClick={() => setSocialToggle(!socialToggle)}
              >
                <i className="icofont-info-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavItems;

