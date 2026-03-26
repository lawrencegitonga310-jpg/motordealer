import React, { useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const Signin = () => {
    //Initialize the hooks
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

//Define the three states an application will move to during the signup process
const [loading, setLoading] = useState("");
const [success, setSuccess] = useState("");
const [error, setError] = useState("");

//below we have the useNavigate hook to rediirect us to another page on success login/signin
const navigate = useNavigate()


//Below is the function that will handle the submission of the signup form
 const handleSubmit = async (e) => {
    //Below we preventt the default behavior of the form which is to refresh the page when submitted
    e.preventDefault(); 
    //Update our loading hook that will be displayed to the users when they click the signup button
    setLoading("Please wait as registration is in progress...");
    try {
        //Create a form-data object that will enable you to capture the form details entered on the form
        const formdata = new FormData();
        //Insert the four details in terms of key-value pairs
        
        formdata.append("email", email);
        formdata.append("password", password);
        

        //By use of axios, we can access the method post
        const response =await axios.post("https://gitongalawrence.alwaysdata.net/api/signin", formdata)
        //set back the loading to default

        setLoading("");
        //Just incase everything goes on well update the success hook with a message
        if(response.data.message){
            //if user is there definitly the details during signin are correct
            //console.loge(response.data.user)
            //setsuccess("login successful")

             localStorage.setItem("user", JSON.stringify(response.data.user));
             // if it is successful let the user be redirected to another page
            navigate("/");
        }
        else{
            //use not found that means the creditial entered on the form is incorrect
            setError("Login Failed.please try again...")
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
    <div className='row justify-content-center mt-4'>
        <div className="card col-md-6 shadow p-4">
            <h1 className='text-primary'>Sign in</h1>

            <h5 className="text-info">{loading}</h5>
            <h3 className="text-success">{success}</h3>
            <h4 className="text-danger">{error}</h4>


            <form onSubmit={handleSubmit}>
                <input type="email" 
                placeholder='Enter the email Address'
                className='form-control' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required /> <br />
                    {/*Email Address */}


                <input type="password" 
                placeholder='Enter the password'
                className='form-control' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required /> <br />
                    {/*Password */}

        

                <input type="submit" 
                 value="Signin"
                 className='btn btn-primary'/>
                <br /><br />

                Don't have an account? <Link to={"/signup"}>Register</Link>

                
            </form>
        </div>
    </div>
  )
}

export default Signin;