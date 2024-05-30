// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import eyeOff from '../../../Images/eyeOff.svg';
import eyeOn from '../../../Images/eyeOn.svg';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Img from "../../../Images/Img.jpg";
import loginImg from '../../../Images/loginImg.jpeg';
import { useAuth } from '../AuthContext';
import { GoogleLogin } from "@react-oauth/google";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required")
  });

  const handleLogin = (email) => {
    login(email);
    toast.success("Logged in successfully!");
    setTimeout(() => {
      navigate('/moviefetch');
    }, 1000);
  };

  const responseMessgae=(response) =>{
    console.log(response);
  }

  const errorMessage=(error)=>{
    console.log(error);
  }

  return (
    <>
      <div className="body">
        <div className="form_p">
          <div className="form-content">

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={schema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                axios.get("http://localhost:5000/users")
                  .then((response) => {
                    const user = response.data.find(
                      (user) => user.email === values.email && user.password === values.password
                    );
                    if (user) {
                      handleLogin(user.email);
                    } else {
                      toast.error("Please register with your account!");
                    }
                  })
                  .catch((error) => {
                    console.error("Login failed", error.response);
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              }}
            >
              {({ errors }) => (
                <Form>

                  <h2 style={{ color: "whitesmoke", fontSize: "30px" }}>Login Yourself!</h2>
                  <img src={loginImg} className="loginImage" alt="login" />
                  
                  
                  <div className="form-group">
                    <label>Email Id:</label>
                    <Field type="email" name="email" placeholder="Enter your email address" style={{ borderRadius: "30px", padding: "20px", boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.1)' }} /><br />
                    <ErrorMessage name="email" component="div" className="error" style={{ color: "whitesmoke" }} />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <div style={{ position: 'relative' }}>
                      <Field type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" style={{ borderRadius: "30px", padding: "20px", boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1), 0 6px 20px 0 rgba(0,0,0,0.1)' }} />
                      <img
                        src={showPassword ? eyeOn : eyeOff}
                        alt="eye-icon"
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', filter: "invert(100%)" }}
                      />
                    </div>
                    <ErrorMessage name="password" component="div" className="error" />
                  </div>
                  <button type="submit" className="login-btn" style={{ borderRadius: "30px", padding: "15px" }}>Log In</button><br />
                  <Link to="/register" className="register">Register here!</Link>
                  <Link to="/forgot-password" className="forgot">Forgot Password?</Link>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
