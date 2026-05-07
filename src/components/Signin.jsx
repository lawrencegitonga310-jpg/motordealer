import React, { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import '../css/Signin.css';

const Signin = () => {
    //Initialize hooks
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    //Define states for form handling
    const [loading, setLoading] = useState("");
    const [success] = useState("");
    const [error, setError] = useState("");

    // Navigate hook for redirection
    const navigate = useNavigate()

    //Below is function that will handle the submission of the signin form
    const handleSubmit = async (e) => {
        //Below we prevent the default behavior of the form which is to refresh the page when submitted
        e.preventDefault(); 
        //Update our loading hook that will be displayed to users when they click the signin button
        setLoading("Please wait while we sign you in...");
        try {
            //Create a form-data object that will enable you to capture the form details entered on the form
            const formdata = new FormData();
            //Insert the form details in terms of key-value pairs
            formdata.append("email", email);
            formdata.append("password", password);
            
            //By use of axios, we can access the method post
            const response = await axios.post("https://gitongalawrence.alwaysdata.net/api/signin", formdata)
            
            //set back the loading to default
            setLoading("");
            
            //Just incase everything goes on well update the success hook with a message
            if(response.data.message){
                //if user is there definitely the details during signin are correct
                localStorage.setItem("user", JSON.stringify(response.data.user));
                // if it is successful let the user be redirected to another page
                navigate("/");
            }
            else{
                //user not found that means the credentials entered on the form is incorrect
                setError("Login Failed. Please try again...")
            }
        }
        catch (error) {
            //set back the loading hook to default
            setLoading("");
            //Update the error hook with the error message from the response
            setError("Oops something went wrong. Try again...");
        }
    };


  return (
    <div className='signin-container'>
      <div className='signin-background'>
        <div className='signin-overlay'></div>
      </div>
      
      <div className='signin-content'>
        <div className='signin-card'>
          {/* Header Section */}
          <div className='signin-header'>
            
            
              <div className='logo'>
                <span className='logo-icon'>🚗</span>
              </div>
              <h1 className='signin-title'>Welcome Back</h1>
              <p className='signin-subtitle'>Sign in to access your account</p>
            </div>
          </div>

          {/* Alert Messages */}
          {loading && (
            <div className='alert alert-info'>
              <div className='alert-content'>
                <span className='alert-icon'>⏳</span>
                <span>{loading}</span>
              </div>
            </div>
          )}
          
          {success && (
            <div className='alert alert-success'>
              <div className='alert-content'>
                <span className='alert-icon'>✅</span>
                <span>{success}</span>
              </div>
            </div>
          )}
          
          {error && (
            <div className='alert alert-danger'>
              <div className='alert-content'>
                <span className='alert-icon'>❌</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Signin Form */}
          <form onSubmit={handleSubmit} className='signin-form'>
            <div className='form-group'>
              <label htmlFor='email' className='form-label'>
                <span className='label-icon'>📧</span>
                Email Address
              </label>
              <div className='input-wrapper'>
                <input 
                  type="email" 
                  id="email"
                  placeholder='Enter your email address'
                  className='form-input' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
                <span className='input-focus-border'></span>
              </div>
            </div>

            <div className='form-group'>
              <label htmlFor='password' className='form-label'>
                <span className='label-icon'>🔒</span>
                Password
              </label>
              <div className='input-wrapper'>
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  placeholder='Enter your password'
                  className='form-input' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className='password-toggle'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </button>
                <span className='input-focus-border'></span>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className='form-options'>
              <label className='checkbox-label'>
                <input type="checkbox" className='checkbox-input' />
                <span className='checkbox-custom'></span>
                <span className='checkbox-text'>Remember me for 30 days</span>
              </label>
              <Link to="/forgot-password" className='forgot-password-link'>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button type="submit" className='signin-btn' disabled={loading}>
              {loading ? (
                <span className='btn-content'>
                  <span className='spinner'></span>
                  Signing in...
                </span>
              ) : (
                <span className='btn-content'>
                  <span className='btn-icon'>🔐</span>
                  Sign In
                </span>
              )}
            </button>
          </form>

          {/* Social Login Options */}
          <div className='divider'>
            <span className='divider-text'>Or continue with</span>
          </div>

          <div className='social-login'>
            <button className='social-btn google'>
              <span className='social-icon'>🔍</span>
              Google
            </button>
            <button className='social-btn facebook'>
              <span className='social-icon'>📘</span>
              Facebook
            </button>
            <button className='social-btn twitter'>
              <span className='social-icon'>🐦</span>
              Twitter
            </button>
          </div>

          {/* Signup Link */}
          <div className='signup-section'>
            <p className='signup-text'>
              Don't have an account? 
              <Link to="/signup" className='signup-link'>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin;