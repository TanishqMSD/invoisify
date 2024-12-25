import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from "@react-oauth/google";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted');
  };

  return (
    
    <GoogleOAuthProvider clientId="765503244124-dab77ompbo1jjpiq6cr93dahq45fun83.apps.googleusercontent.com">
    <div className="d-flex justify-content-center align-items-center min-vh-100 py-10 bg-light">
      <Card style={{ width: '400px' }} className="p-4 shadow-lg">
        <h3 className="text-center mb-4">Login</h3>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Login
          </Button>
        </Form>

        <div className="text-center mt-4">
          <span>or</span>
        </div>

        
        <div className="d-flex justify-content-center mt-4">
          <GoogleLogin
            onSuccess={(response) => console.log('Google Login Success:', response)}
            onError={(error) => console.log('Google Login Error:', error)}
            useOneTap
          />
        </div>

        <div className="text-center mt-3">
          <span>Don't have an account? <a href="/signup">Sign Up</a></span>
        </div>
      </Card>
    </div>
    </GoogleOAuthProvider> 
   
  );
};

export default Login;
