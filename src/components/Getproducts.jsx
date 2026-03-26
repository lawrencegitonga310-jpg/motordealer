import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Mycarousel from './components/Mycarousel';

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
      <Mycarousel>
          <h3 className='text-primary'>Available Cars</h3>
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
          <button className='btn btn-outline-info' onClick={() => navigate("/makepayment", {state : {product}})}>purchase Now </button>
        </div>
      </div>

     </div>
      )  )}

      </Mycarousel>

    

     
    </div>
  )
}

export default Getproducts;
