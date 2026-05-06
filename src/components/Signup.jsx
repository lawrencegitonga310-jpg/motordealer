import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/Signup.css';

const Signup = () => {
    //Initialize hooks
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");

    //Define states for form handling
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Password strength checker
    const checkPasswordStrength = (password) => {
        if (!password) return "";
        if (password.length < 6) return "Weak";
        if (password.length < 10 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return "Medium";
        return "Strong";
    };

    // Handle password change
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(checkPasswordStrength(newPassword));
    };

    //Below is function that will handle the submission of signup form
    const handleSubmit = async (e) => {
        //Below we prevent the default behavior of the form which is to refresh the page when submitted
        e.preventDefault(); 
        //Update our loading hook that will be displayed to users when they click the signup button
        setLoading("Creating your account...");
        try {
            //Create a form-data object that will enable you to capture form details entered on the form
            const formdata = new FormData();
            //Insert the four details in terms of key-value pairs
            formdata.append("username", username);
            formdata.append("email", email);
            formdata.append("password", password);
            formdata.append("phone", phone);

            //By use of axios, we can access the method post
            const response = await axios.post("https://gitongalawrence.alwaysdata.net/api/signup", formdata)
            
            //set back loading to default
            setLoading("");
            
            //Just in case everything goes well update the success hook with a message
            setSuccess(response.data.message)

            //Clear your hooks 
            setUsername("");
            setEmail("");
            setPassword("");
            setPhone("");   
            setPasswordStrength("");
        }
        catch (error) {
            //set back loading hook to default
            setLoading("");
            //Update the error hook with the error message from the response
            setError(error.message || "Something went wrong. Please try again.");
        }
    };


    return (
        <div className='signup-container'>
            <div className='signup-background'>
                <div className='signup-overlay'></div>
            </div>
            
            <div className='signup-content'>
                <div className='signup-card'>
                    {/* Header Section */}
                    <div className='signup-header'>
                        <div className='logo-section'>
                            <div className='logo'>
                                <span className='logo-icon'>🚗</span>
                            </div>
                            <h1 className='signup-title'>Create Account</h1>
                            <p className='signup-subtitle'>Join us and start your journey</p>
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

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className='signup-form'>
                        <div className='form-row'>
                            <div className='form-group'>
                                <label htmlFor='username' className='form-label'>
                                    <span className='label-icon'>👤</span>
                                    Username
                                </label>
                                <div className='input-wrapper'>
                                    <input 
                                        type="text" 
                                        id="username"
                                        placeholder='Choose a username'
                                        className='form-input' 
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required 
                                    />
                                    <span className='input-focus-border'></span>
                                </div>
                            </div>

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
                        </div>

                        <div className='form-row'>
                            <div className='form-group'>
                                <label htmlFor='password' className='form-label'>
                                    <span className='label-icon'>🔒</span>
                                    Password
                                </label>
                                <div className='input-wrapper'>
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        id="password"
                                        placeholder='Create a strong password'
                                        className='form-input' 
                                        value={password}
                                        onChange={handlePasswordChange}
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
                                {passwordStrength && (
                                    <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
                                        <div className='strength-bar'>
                                            <div className={`strength-fill ${passwordStrength.toLowerCase()}`}></div>
                                        </div>
                                        <span className='strength-text'>Password Strength: {passwordStrength}</span>
                                    </div>
                                )}
                            </div>

                            <div className='form-group'>
                                <label htmlFor='phone' className='form-label'>
                                    <span className='label-icon'>📱</span>
                                    Phone Number
                                </label>
                                <div className='input-wrapper'>
                                    <input 
                                        type="tel" 
                                        id="phone"
                                        placeholder='Enter your phone number'
                                        className='form-input' 
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required 
                                    />
                                    <span className='input-focus-border'></span>
                                </div>
                            </div>
                        </div>

                        {/* Terms and Submit */}
                        <div className='form-options'>
                            <label className='checkbox-label'>
                                <input type="checkbox" className='checkbox-input' required />
                                <span className='checkbox-custom'></span>
                                <span className='checkbox-text'>I agree to the Terms of Service and Privacy Policy</span>
                            </label>
                        </div>

                        <button type="submit" className='signup-btn' disabled={loading}>
                            {loading ? (
                                <span className='btn-content'>
                                    <span className='spinner'></span>
                                    Creating Account...
                                </span>
                            ) : (
                                <span className='btn-content'>
                                    <span className='btn-icon'>✨</span>
                                    Create Account
                                </span>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className='signin-section'>
                        <p className='signin-text'>
                            Already have an account? 
                            <Link to="/signin" className='signin-link'>Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;