<<<<<<< HEAD
import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
=======
// import React from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { motion } from "framer-motion";

// const Login = () => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted");
//   };

//   return (
//     <GoogleOAuthProvider clientId="765503244124-dab77ompbo1jjpiq6cr93dahq45fun83.apps.googleusercontent.com">
//       <div className="flex justify-center items-center min-h-screen bg-gray-900">
//         <motion.div
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
//         >
//           <h3 className="text-center text-white text-2xl font-bold mb-6">
//             Login
//           </h3>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block text-gray-400 text-sm font-medium mb-1"
//               >
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
//                 placeholder="Enter email"
//                 required
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-gray-400 text-sm font-medium mb-1"
//               >
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500"
//                 placeholder="Password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
//             >
//               Login
//             </button>
//           </form>

//           <div className="text-center my-4 text-gray-400">or</div>

//           <div className="flex justify-center">
//             <GoogleLogin
//               onSuccess={(response) =>
//                 console.log("Google Login Success:", response)
//               }
//               onError={(error) =>
//                 console.log("Google Login Error:", error)
//               }
//               useOneTap
//             />
//           </div>

//           <div className="text-center mt-4 text-gray-400">
//             Don't have an account?{" "}
//             <a href="/signup" className="text-blue-500 hover:underline">
//               Sign Up
//             </a>
//           </div>
//         </motion.div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (response) => {
    // Extract the token from the response
    const token = response.credential;
>>>>>>> 6dfcb7f9ebd8a4636c8083cb0cc17c03d44ffcbf
    
    // Use the token to fetch user details
    fetchUserDetails(token);
  };

<<<<<<< HEAD
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
    // Extract the token from the response
    const token = response.credential;
    const decoded = jwtDecode(token);
    googleLogin(decoded);
  };

  const handleError = (error) => {
    alert('Google Login Error:', error.message);
  };
=======

  const fetchUserDetails = (token) => {
    // Make an API request to fetch user details
    fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        // Store user details in the state
        setUser({
          name: data.name,
          email: data.email,
          profilePic: data.picture,
        });
      })
      .catch((err) => console.error('Error fetching user details:', err));
  };

  const handleLoginError = (error) => {
    console.log('Google Login Error:', error);
  };

  const openWindow = ()=>{
    window.open('http://localhost:8000/api/v1/oauth/google-screen', '_self');
  }
>>>>>>> 6dfcb7f9ebd8a4636c8083cb0cc17c03d44ffcbf

  return (
<>

<button onClick={openWindow} className='bg-blue-500 p-6 m-4'>Sign in with Google</button>
<GoogleOAuthProvider clientId="765503244124-dab77ompbo1jjpiq6cr93dahq45fun83.apps.googleusercontent.com">
    <div>
      {!user ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          ux_mode= "redirect"
          
          
        />
      ) : (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <img src={user.profilePic} alt="Profile" />
          <p>Email: {user.email}</p>
        </div>
<<<<<<< HEAD

        
        <div className="d-flex justify-content-center mt-4">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <GoogleLogin 
      onSuccess={handleSuccess}
      onError={handleError}/>
    </GoogleOAuthProvider>
        </div>

        <div className="text-center mt-3">
          <span>Don't have an account? <Link to="/register">Sign Up</Link></span>
        </div>
      </Card>
=======
      )}
>>>>>>> 6dfcb7f9ebd8a4636c8083cb0cc17c03d44ffcbf
    </div>
    </GoogleOAuthProvider>
</>
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