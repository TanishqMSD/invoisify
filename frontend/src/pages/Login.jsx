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
    
    // Use the token to fetch user details
    fetchUserDetails(token);
  };


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
      )}
    </div>
    </GoogleOAuthProvider>
</>
  );
};

export default Login;
