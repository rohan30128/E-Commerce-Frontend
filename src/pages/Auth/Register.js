import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Backend } from "../../Backend";

export default function Register() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [address,setAddress] = useState("");
    const [answer,setAnswer] = useState("");
    const navigate = useNavigate();
    //form submit
    const handleSubmit = async (e)=>{
        e.preventDefault()
       try {
        const res = await axios.post(`${Backend}/api/v1/auth/register`,{name,email,phone,password,address,answer});
        if(res && res.data.success){
          toast.success(res.data && res.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          
        }else{
          toast.error(res.data.message)
        }
       } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
       }
    }

  return (
    <Layout title="Register - Ecommer App">
    <div className="form-container ">
      <form onSubmit={handleSubmit}>
        <h4 className="title">REGISTER FORM</h4>
        <div className="mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Enter Your Name"
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Enter Your Email "
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            placeholder="Enter Your Phone"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            placeholder="Enter Your Address"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="form-control"
            placeholder="What is your Favorite sports"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  </Layout>
  );
}
