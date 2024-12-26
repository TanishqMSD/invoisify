import React, {useState} from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted');
  };

  const loginUser = async (e)=>{
    e.preventDefault();

    if(!email || !password){
        alert("all fields are required");
        return;
    }

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/v1/user/login`,
            {
                email: email,
                password: password
            },
            {
                withCredentials: true
            }
        );
        alert(response.data.message);
        navigate("/")
    } catch (error) {
        alert(error.response?.data.message || error.message);
    }
};

  const googleLogin = async (token) => {

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/oauth/google-login`,
        {
          name: token.name,
          email: token.email,
          profilePic: token.picture,
        },
        {
          withCredentials: true,
        }
      );
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data.message || error.message);
    }
  };

  const handleSuccess = (response) => {
    const token = response.credential;
    const decoded = jwtDecode(token);
    googleLogin(decoded);
  };

  const handleError = (error) => {
    alert('Google Login Error:', error.message);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card style={{ width: '400px' }} className="p-4 shadow-lg">
        <h3 className="text-center mb-4">Login</h3>
        
        <Form onSubmit={loginUser}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required onChange={(e)=>setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)}/>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Login
          </Button>
        </Form>

        <div className="text-center mt-4">
          <span>or</span>
        </div>

        
        <div className="d-flex justify-content-center mt-4">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <GoogleLogin 
      onSuccess={handleSuccess}
      onError={handleError}/>
    </GoogleOAuthProvider>
        </div>

        <div className="text-center mt-2">
          <span> <Link to="/forgot-password">Forgot Password?</Link></span>
        </div>

        <div className="text-center mt-3">
          <span>Don't have an account? <Link to="/register">Sign Up</Link></span>
        </div>
      </Card>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import {jwtDecode} from 'jwt-decode';
// import axios from 'axios';
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

  // const handleSuccess = (response) => {
  //   // Extract the token from the response
  //   const token = response.credential;
  //   const decoded = jwtDecode(token);
  //   googleLogin(decoded);
  //   console.log(decoded.email);
  //   console.log(decoded.name);
  //   console.log(decoded.picture);
  // };

  // const handleError = (error) => {
  //   alert('Google Login Error:', error);
  // };

  // const googleLogin = async (token) => {

  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/api/v1/oauth/login`,
  //       {
  //         name: token.name,
  //         email: token.email,
  //         profilePic: token.picture,
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     alert(response.data.message);
  //     navigate("/");
  //   } catch (error) {
  //     alert(error.response?.data.message || error.message);
  //   }
  // };

//   return (
// <>
//     <GoogleOAuthProvider clientId='72066621908-74ugth8bpk2f54kidn6ucimnjqle1mku.apps.googleusercontent.com'>
//       <GoogleLogin 
//       onSuccess={handleSuccess}
//       onError={handleError}/>
//     </GoogleOAuthProvider>
// </>
//   );
// };

// export default Login;