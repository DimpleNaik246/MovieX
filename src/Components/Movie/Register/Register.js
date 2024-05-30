import React, { useState } from "react";
import eyeOff from '../../../Images/eyeOff.svg';
import eyeOn from '../../../Images/eyeOn.svg';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


import './Register.css';

export function RegisterPage(){
    const [emailR, setEmailR] = useState("");
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errorR, setErrorR] = useState({ emailR: "", pass: "", confirm: "" });
    const [showPass, setShowPass] = useState(false);
    
    const navigate = useNavigate();

    const handleNotify = () => {
        toast.success("Registration successful!");
        navigate('/');
    };

    

    const handleRegister = (e) => {
        e.preventDefault();
        let IsError = false;
    
        if (emailR.trim() === "") {
            setErrorR(prevState => ({ ...prevState, emailR: "Email is required" }));
            IsError = true;
        } else if (!handleEmailR(emailR)) {
            IsError = true;
        }
    
        if (pass.trim() === "") {
            setErrorR(prevState => ({ ...prevState, pass: "Password is required" }));
            IsError = true;
        } else if (!handlePass()) {
            IsError = true;
        }
    
        if (confirm.trim() === "") {
            setErrorR(prevState => ({ ...prevState, confirm: "Confirm your password please" }));
            IsError = true;
        } else if (pass !== confirm) {
            setErrorR(prevState => ({ ...prevState, confirm: "Passwords do not match" }));
            IsError = true;
        }
    
        if (IsError) {
            return;
        }
    
        const newUser = {
            email: emailR,
            password: pass
        };
    
        axios.get('http://localhost:5000/users')
            .then(response => {
                const existingUser = response.data.find(user => user.email === emailR);
                if (existingUser) {
                    toast.error("User already exists!");
                } else {
                    axios.post('http://localhost:5000/users', newUser)
                        .then(response => {
                            console.log("User added successfully:", response.data);
                            handleNotify();
                            
                            setEmailR("");
                            setPass("");
                            setConfirm("");
                        })
                        .catch(error => {
                            console.error('error: ', error);
                            toast.error("Registration failed!");
                        });
                }
            })
            .catch(error => {
                console.error('error: ', error);
                toast.error("Error checking user existence!");
            });
    };

    const handleEmailR = (value) => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!isValidEmail) {
            setErrorR(prevState => ({ ...prevState, emailR: "Please enter a valid email address" }));
            return false;
        } else {
            setErrorR(prevState => ({ ...prevState, emailR: "" }));
            return true;
        }
    };

    const handlePass = () => {
        const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(pass);
        if (!validPassword) {
            setErrorR(prevState => ({ ...prevState, pass: "Please write a strong password" }));
            return false;
        } else {
            setErrorR(prevState => ({ ...prevState, pass: "" }));
            return true;
        }
    };

    return(
        <>
            <div className="body-register">
                <div className="register-form">
                    <form onSubmit={handleRegister}>
                        <div className="register-content">
                            <h2 style={{color:"whitesmoke"}}>Registration Form</h2>

                            <div className="register-group">
                                <label>Email Id:</label>
                                <input type="email" placeholder="..." value={emailR} onChange={(e)=>setEmailR(e.target.value)}/><br></br>
                                {errorR.emailR && <span className="errors">{errorR.emailR}</span>}<br></br>
                            </div>

                            <div className="register-group">
                                <label>Password: </label>
                                <div className="password-container">
                                    <input type={showPass ? "text" : "password"} placeholder="..." value={pass} onChange={(e) => setPass(e.target.value)} onBlur={handlePass}/>
                                    <img
                                        src={showPass ? eyeOn : eyeOff}
                                        alt="eye-icon"
                                        className="eye-icon"
                                        onClick={() => setShowPass(!showPass)}
                                    />
                                </div>
                                {errorR.pass && <span className="errors">{errorR.pass}</span>} <br></br>
                            </div>

                            <div className="register-group">
                                <label>Confirm Password: </label>
                                <div className="confirm-container">
                                    <input type="password" placeholder="..." value={confirm} onChange={(e)=>setConfirm(e.target.value)}/><br></br>
                                    {errorR.confirm && <span className="errors">{errorR.confirm}</span>}
                                </div>
                            </div>

                            <button type="submit" className="register-btn">Register</button>
                            <ToastContainer/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
