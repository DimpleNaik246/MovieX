import React, { useState } from "react";
import './Forgot.css'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export function ForgotPassword(){
    const[emailF, setEmailF] = useState('');
    const[newpass, setNewPass] = useState("");
    const[confirmNew, setConfirmNew] = useState('')


    function handleSet(){
        axios.get('http://localhost:5000/users')
        .then(response=>{
            console.log("user data: ", response.data)
            const existingEmail = response.data.find(user=>user.email===emailF)
            if(existingEmail){
                console.log("change password");
                if(newpass!==confirmNew){
                    toast.error("passwords do not match");
                    return;
                }
                const updatedUser ={...existingEmail, password:newpass}

                axios.put(`http://localhost:5000/users/${existingEmail.id}`, updatedUser)
                .then(response=>{
                    console.log("password updated", response.data);
                    toast.success("Password updated successfully!");
                })
                .catch(error=>{
                    toast.error("failed to update password")
                })

            }else{
                alert("Email not found!")
            }
        })
    }

    return(
        <>
        <div className="body-forgot">
            <div className="forgot-form">
                    <form >
                        <div className="forgot-content">
                            <h2 style={{color:"whitesmoke"}}>Create new password</h2>

                            <div className="forgot-group">
                                <label>Email Id: </label>
                                <input type="email" placeholder="..." value={emailF} onChange={(e)=>setEmailF(e.target.value)}/><br></br>
                            </div>

                            <div className="forgot-group">
                                <label>New Password: </label>
                                <input type="password" placeholder="..." value={newpass} onChange={(e)=>setNewPass(e.target.value)}/><br></br>
                            </div>

                            <div className="forgot-group">
                                <label>Confirm Password: </label>
                                <input type="password" placeholder="..." value={confirmNew} onChange={(e)=>setConfirmNew(e.target.value)}/><br></br>
                            </div>

                            <button type="button" className="new-btn" onClick={handleSet}>Set New Password</button>
                        </div>
                    </form>
            </div>
        </div>
        <ToastContainer/>
            
        </>
    )
}