import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';



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

          <section className='row'>
            <div >
            <img src="images/num.jpg" alt="" height="500px" width="100%" />
            </div>
           

            

          </section>
      
      

          
          <section className='row'>
            <div className='col-md-6 bg-light shadow p-4'>
             <h4><b><u>Why Choose Us</u></b></h4>
    
              <ul> 
              <li><b>Convenience:</b> Book your car rental online in just a few clicks, anytime and anywhere
              .</li>
              <li><b>Flexibility:</b> Cancel or modify your booking up to 24 hours before the start time.</li>
              <li><b>Peace of Mind:</b> Take a self-drive vehicle, or add a driver for peace of mind</li>
              <li><b>Competitive Pricing:</b> Get the best deals on car rentals without compromising on quality</li>
              <li><b>24/7 Customer Support:</b> Our team is always ready to assist you with any questions or concerns.</li>
             </ul>
             <h3><b>How it works</b></h3>
             <section className='row bg-blue shadow p-4'>
              <div className='card col-md-6 shadow'>
                 <p> 1. <b>Select Car:</b>
                  Browse our wide selection of cars and choose the one that suits your needs and preferences.
                </p>
                  
              </div><br />
              <div className='card col-md-6 shadow'>
                 <p>2. <b>Verify Identity:</b>
                  To ensure a smooth rental process, we require all customers to verify their identity with a valid ID and driver's license. 
                  </p>
              </div><br />
            
             </section><br />

             <section className='row'>
                <div className='card col-md-6 shadow'>
                <p>
                 3. <b>Payment:</b>
                  Pay securely online with a credit card, or mobile money. We also have an option for cash payment.
                </p>
              </div><br />
              <div className='card col-md-6 shadow'>
                <p>
                  4. <b>Confirmation:</b>
                  Once your booking is confirmed, you will receive a confirmation email with all the details of your rental.
                </p>

              </div>

             </section>

               
              <h3><i><b>Ready to hit the road?</b></i></h3>


            </div><br />

            <div className='col-md-6'>
               <img src="images/bnb.PNG" alt="" height="650px" width="100%" />

            </div>

          </section> <br /><br />
        <div className='col-md-12 text-center text-danger font-weight-bold mb-4 p-3'>
          <h1><b><i>Available Cars</i></b></h1>
        </div>


         {loading && <Loader/> }
          <h4 className='text-danger'> {error} </h4>
      
         {/*map the product fetched from the API to the user interface */}

          {products.map((product) =>(
          <div className="col-md-3 justify-content-center mb-3" >
          <div className="card shadow">
          <img 
          src={img_url + product.product_photo}
          alt="product name" 
          height="100%" 
          width="100%"
          className='product_img mt-3' />

          <div className="card body bg-yellow p-3">
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
