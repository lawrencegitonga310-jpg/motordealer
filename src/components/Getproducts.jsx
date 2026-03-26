import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Mycarousel from './Mycarousel';


const Getproducts = () => {


  // 2.initialize hook to help you manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //declare the navigate hook
  const navigate = useNavigate()

  //below we specify the image base url
  const img_url ="https://gitongalawrence.alwaysdata.net/static/images/"

  // 3.create a function to help you fetch products from your API
  const fetchProducts = async() =>{
    try{
      // 4. update the loading hook
      setLoading(true)
    // 5. interact with your end point for fetching the products
    const response = await axios.get("https://gitongalawrence.alwaysdata.net/api/get_products")

    // 6. update the products hook with the response given from the API
    setProducts(response.data)

    // 7. setting loading back to default
    setLoading(false)

    }
    catch(error){
      // 8. 
      // if there is an error 
      // set the losding back to default
      setLoading(false)

      //update the error hook with a message 
      setError(error.message)

    }
  }

  // we shall use the effecthook.This hook enables us to automatically re-render new features incase of any change
  useEffect(() =>{
    fetchProducts()
   
  },[])

  // console.log(products)

  return (
    <div className='row'>
      <Mycarousel/>

          
          <section className='row'>
            <div className='col-md-6'>
             <h4><b>SIMPLY A BETTER EXPERIENCE</b></h4>
             <h3>Ease & peace of mind from start to finish</h3>
             <ul>
              <li>Full refund when you cancel 24hrs before start time.</li>
              <li>Meet & greet at the airport, your hotel, the office, etc.</li>
              <li>Take a self-drive vehicle, or add a driver for peace of mind</li>
             </ul>
             <h3><b>How it works</b></h3>
             <section className='row'>
              <div className='card col-md-6 shadow'>
                 <p> 1. <b>Select Car:</b>
                  Browse from hundreds of cars and select the type of car you want for your trip!
                </p>
                  
              </div><br />
              <div className='card col-md-6 shadow'>
                 <p>2. <b>Verify Identity:</b>
                 To keep Otto safe & reliable, we ask all users to quickly verify their identity
                  </p>
              </div><br />
            
             </section><br />

             <section className='row'>
                <div className='card col-md-6 shadow'>
                <p>
                 3. <b>Payment:</b>
                 We allow you to pay with MPESA.
                </p>
              </div><br />
              <div className='card col-md-6 shadow'>
                <p>
                  4. <b>Confirmation:</b>
                  Once rental is confirmed, sign contract & pickup vehicle, or a driver will meet & greet you.
                </p>

              </div>

             </section>

               <h2><b><i>NOTE:</i></b></h2>
              <h3><i><b>The cost is based on 24 hours</b></i></h3>


            </div><br />

            <div className='col-md-6'>
               <img src="images/banner3.webp" alt="" height="500px" width="500px" />

            </div>

          </section>
        <h2><b><i>Available Cars</i></b></h2>


         {loading && <Loader/> }
          <h4 className='text-danger'> {error} </h4>
      
         {/*map the product fetched from the API to the user interface */}

          {products.map((product) =>(
          <div className="col-md-3 justify-content-center mb-3" >
          <div className="card shadow">
          <img 
          src={img_url + product.product_photo}
          alt="product name"
          className='product_img mt-3' />

          <div className="card body">
          <h5 className='text-primary'> {product.product_name} </h5>

          <p className='text-dark'> {product.product_description?.slice(0,70) }... </p>

          <h4 className='text-danger'>Kes {product.product_cost}</h4>
          <button className='btn btn-outline-info' onClick={() => navigate("/makepayment", {state : {product}})}>Hire Now </button>
          </div>
          </div>

          </div>
         )  )}

      

    

     
    </div>
  )
}

export default Getproducts;
