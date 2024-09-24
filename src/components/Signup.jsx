import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import NavItems from './NavItems';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';

const title = "Register";
const socialTitle = "login with social media";
const btnText = "Register now";
export default function Signup() {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    console.log("dubmitted data", data);
    // verfier si les 2 mdp sont identiques
    if (data.password !== data.password2) {
      return alert("passwords do not match");
    }
    try {
      const response = await axios.post("register", {
        nom: data?.name,
        email: data?.email,
        password: data?.password,
        telephone: data?.telephone,
        role_id:2,
      });
      if (response?.status === 201) {
        console.log(response);
        toast.success(`${response.data.message}`);
        reset();
        setTimeout(() => {
            navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`);
    }
  };
  return (
    <>
      <NavItems />
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h5 className="title">{title}</h5>
            <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  {...register("name", { required: true })}
                />
              </div>
              {errors.name && (
                <span className="text-danger">This field is required</span>
              )}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="telephone"
                  {...register("telephone", { required: true })}
                />
              </div>
              {errors.telephone && (
                <span className="text-danger">This field is required</span>
              )}
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </div>
              {errors.email && (
                <span className="text-danger">This field is required</span>
              )}
              {/* password */}
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
              </div>
              {errors.password && (
                <span className="text-danger">This field is required</span>
              )}
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="confirm password"
                  {...register("password2", { required: true })}
                />
              </div>
              {errors.password2 && (
                <span className="text-danger">This field is required</span>
              )}
              <div className="form-group">
                <button type="submit" className="lab-btn lab-btn">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>

            {/* accoiunt button */}
            <div className="account-bottom">
              <span className="d-flex cate pt-10">
                have a account ?<Link to="/login">login now</Link>
              </span>

              <span className="or">
                <span>or</span>
              </span>
              {/* social icons */}
              <h5 className="subtitle">{socialTitle}</h5>
              <ul className="lab-ul social-icons justify-content-center">
                <li>
                  <button className="github">
                    <i className="icofont-github"></i>
                  </button>
                </li>
                <li>
                  <a href="" className="facebook">
                    <i className="icofont-facebook"></i>
                  </a>
                </li>

                <li>
                  <a href="" className="twitter">
                    <i className="icofont-twitter"></i>
                  </a>
                </li>

                <li>
                  <a href="" className="linkedin">
                    <i className="icofont-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
