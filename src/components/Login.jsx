import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from '@/store/userStore';
import NavItems from './NavItems';
const title='login'
const socialTitle='login with social media'
const btnText='login now'

const socialList = [
  {
    iconName: "icofont-facebook",
    siteLink: "#",
    className: "facebook",
  },
  {
    iconName: "icofont-twitter",
    siteLink: "#",
    className: "twitter",
  },
  {
    iconName: "icofont-linkedin",
    siteLink: "#",
    className: "linkedin",
  },
  {
    iconName: "icofont-instagram",
    siteLink: "#",
    className: "instagram",
  },
  {
    iconName: "icofont-pinterest",
    siteLink: "#",
    className: "pinterest",
  },
];

export default function Login() {
   const { setUser,user } = useUserStore();
   const navigate = useNavigate();
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm();

   const onSubmit = async (data) => {
    console.log("dubmitted data",data)
     try {
       const response = await axios.post("login", {
         email: data?.email,
         password: data?.password,
       });
       if (response?.status === 200) {
        localStorage.setItem("token", response.data.token);
        // setUser(response.data);
         console.log(response.data);
         toast.success(`${response.data.message}`);
         setTimeout(() => {
         if (response.data.role_id === 1) {
           navigate("/dasboard");
         } else {
           navigate("/");
         }
         }, 3000);
       }
     } catch (error) {
       console.log(error);
       toast.error(`${error.response.data.message}`);
     }
   };

  //  const fetchConnectedUser = async () => {
  //    try {
  //      const response = await axios.get("user",{
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //      });
  //      console.log("logged user",response.data);
  //      if (response?.status === 200) {
  //        setUser(response.data);
  //      }
  //    } catch (error) {
  //      console.error(error);
  //    }
  //  };

  //  useEffect(() => {
    
  //     fetchConnectedUser();
  //  }, [user])
   
  return (
    <>
    <NavItems />
    <div className='login-section padding-tb section-bg'>
      <div className="container">
        <div className="account-wrapper">
            <h5 className='title'>{title}</h5>
            <form className="account-form"
              onSubmit={handleSubmit(onSubmit)}
            >
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email"
                    {...register("email", { required: true })}
                    />                  
                </div>
                {/* password */}
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password"
                    {...register("password", { required: true })}
                    />
                </div>
                <div className="form-group">
                    <div className='d-flex justify-content-between flex-wrap pt-sm-2'>
                        <div className="checkgroup">
                            <input type="checkbox" id="remember" name="remember" />
                            <label htmlFor="remember">remember me </label>
                        </div>
                        <Link to='/forgotpass'>Forgot password</Link>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="lab-btn lab-btn"><span>{btnText}</span></button>
                </div>
            </form>

            {/* accoiunt button */}
            <div className="account-bottom">
              <span className="d-flex cate pt-10">
                dont have a account ? 
                <Link to='/register'>register now</Link>
              </span>

              <span className="or">
                <span>or</span>
              </span>
              {/* social icons */}
              <h5 className='subtitle'>
                {socialTitle}
              </h5>
              <ul className="lab-ul social-icons justify-content-center">
                <li>
                  <button className='github'>
                    <i className="icofont-github"></i>
                  </button>
                </li>
                <li><a href="" className="facebook">
                  <i className="icofont-facebook"></i>
                  </a>
                  </li>

                <li><a href="" className="twitter">
                  <i className="icofont-twitter"></i>
                  </a>
                  </li>

                <li><a href="" className="linkedin">
                  <i className="icofont-linkedin"></i>
                  </a>
                  </li>
                  
              </ul>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
