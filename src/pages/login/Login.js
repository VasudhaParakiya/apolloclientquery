import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SIGN_IN } from "../../graphql/Mutation";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import {loginValidation} from "./LoginValidation";
import styled from "./login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [logindata] = useMutation(SIGN_IN);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      navigate("/");
    }
  }, [navigate]);


  const [loginUser,setLoginUse]=useState({
    email:"",
    password:"",
  });
  const [error,setError]=useState({});


  const handleChange=(e)=>{

    const validationError = loginValidation(loginUser);
    console.log( validationError);
    setError(validationError);

    setLoginUse({
      ...loginUser,
      [e.target.name]:e.target.value,
    })
    console.log(loginUser);
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const validationError = loginValidation(loginUser);
  setError(validationError);

  if (!validationError.email && !validationError.password) {
      if(Object.keys(validationError).length>=0){
        logindata({
          variables: {
            email:loginUser.email,
            password:loginUser.password,
          },
        }).then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.signIn.token);
          localStorage.setItem("user", JSON.stringify(res.data.signIn.user));
          navigate("/");
          toast.success("Login Successfully")
        })
        .catch((error) => toast.error(error?.message));
      }else{
        toast.error('Please fill all fields correctly')
      }
    }
   
  }
   
  return (
    <>
      <div className={styled.login}>
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="mt-4">
          <input
            type="text"
            className="mt-3"
            name="email"
            placeholder="email"
            value={loginUser.email}
            onChange={handleChange}
          />
          {error.email ? (
            <p className={`${styled.error} mb-0`}>
              {error.email}
            </p>
          ) : (
            ""
          )}
          <br></br>
          <input
            type="password"
            className="mt-3"
            name="password"
            placeholder="password"
            value={loginUser.password}
            onChange={handleChange}
          />
          {error.password ? (
            <p className={`${styled.error} mb-0`}>
             {error.password}
            </p>
          ) : (
            ""
          )}
          <br></br>
          <button className="text-decoration-none py-1 mt-3 px-3 bg-primary text-light fw-bold rounded-3 ms-3 border-0">
            Login
          </button>

          <Link
            to={"/signup"}
            className="text-decoration-none py-1 px-3 bg-primary text-light fw-bold rounded-3 ms-3"
          >
            Sign Up
          </Link>
        </form>
      </div>
    </>
  );
}
