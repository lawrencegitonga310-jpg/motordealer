import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import '../css/Getproducts.css';



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

    // 6. update the products hook with response given from the API
      // If API returns empty, use our enhanced car collection
      if (!response.data || response.data.length === 0) {
        console.log('API returned empty, using enhanced car collection');
        const enhancedCars = [
          {
            id: 1,
            product_name: 'Mercedes-Benz C-Class',
            product_description: 'Experience luxury and comfort with our premium sedan featuring leather interior, advanced safety features, and smooth performance.',
            product_cost: '8500',
            product_photo: 'mercedes_c_class.jpg'
          },
          {
            id: 2,
            product_name: 'Toyota RAV4',
            product_description: 'Perfect for families and adventure seekers with spacious interior, all-wheel drive, and excellent fuel efficiency.',
            product_cost: '6000',
            product_photo: 'toyota_rav4.jpg'
          },
          {
            id: 3,
            product_name: 'Nissan Patrol',
            product_description: 'Conquer any terrain with our rugged off-road SUV featuring 4x4 capability, high ground clearance, and towing capacity.',
            product_cost: '7500',
            product_photo: 'nissan_patrol.jpg'
          },
          {
            id: 4,
            product_name: 'Honda Accord',
            product_description: 'Affordable reliability without compromising on comfort with our fuel-efficient sedan featuring modern tech and comfortable ride.',
            product_cost: '4000',
            product_photo: 'honda_accord.jpg'
          },
          {
            id: 5,
            product_name: 'Ford Ranger',
            product_description: 'Built for work and play with our versatile pickup truck featuring high payload capacity, durable build, and towing capability.',
            product_cost: '5500',
            product_photo: 'ford_ranger.jpg'
          },
          {
            id: 6,
            product_name: 'BMW X5',
            product_description: 'Luxury SUV with advanced technology, premium materials, and exceptional performance for discerning drivers.',
            product_cost: '9000',
            product_photo: 'bmw_x5.jpg'
          },
          {
            id: 7,
            product_name: 'Mazda CX-5',
            product_description: 'Stylish crossover SUV with sleek design, efficient performance, and advanced safety features for modern families.',
            product_cost: '5200',
            product_photo: 'mazda_cx5.jpg'
          },
          {
            id: 8,
            product_name: 'Volkswagen Tiguan',
            product_description: 'Compact SUV with German engineering, spacious interior, and versatile design perfect for urban and highway driving.',
            product_cost: '4800',
            product_photo: 'volkswagen_tiguan.jpg'
          },
          {
            id: 9,
            product_name: 'Hyundai Elantra',
            product_description: 'Economy sedan with impressive features, excellent fuel economy, and reliable performance for budget-conscious drivers.',
            product_cost: '3500',
            product_photo: 'hyundai_elantra.jpg'
          },
          {
            id: 10,
            product_name: 'Subaru Outback',
            product_description: 'All-wheel drive wagon with rugged capability, spacious cargo area, and proven reliability for outdoor enthusiasts.',
            product_cost: '5800',
            product_photo: 'subaru_outback.jpg'
          },
          {
            id: 11,
            product_name: 'Audi A4',
            product_description: 'Premium compact sedan with sophisticated design, advanced technology, and refined driving experience.',
            product_cost: '7200',
            product_photo: 'audi_a4.jpg'
          },
          {
            id: 12,
            product_name: 'Jeep Wrangler',
            product_description: 'Iconic off-road vehicle with unmatched capability, removable doors, and adventurous spirit for explorers.',
            product_cost: '6500',
            product_photo: 'jeep_wrangler.jpg'
          }
        ];
        setProducts(enhancedCars);
      } else {
        setProducts(response.data);
      }

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
    <div className='getproducts-container'>
          {/* Hero Section */}
          <section className='hero-section'>
            <div className='hero-overlay'>
              <div className='hero-content'>
                <h1 className='hero-title'>Premium Car Rental Services</h1>
                <p className='hero-subtitle'>Experience luxury and convenience with our fleet of premium vehicles</p>
                <button className='hero-btn' onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
                  Explore Our Fleet
                </button>
              </div>
            </div>
            <img src="images/num.jpg" alt="Hero" className='hero-image' />
          </section>
      
      

          
          {/* Features Section */}
          <section className='features-section'>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='features-card'>
                    <h2 className='features-title'>Why Choose Us</h2>
                    <div className='features-grid'>
                      <div className='feature-item'>
                        <div className='feature-icon'>🚗</div>
                        <div className='feature-content'>
                          <h4>Convenience</h4>
                          <p>Book your car rental online in just a few clicks, anytime and anywhere</p>
                        </div>
                      </div>
                      <div className='feature-item'>
                        <div className='feature-icon'>🔄</div>
                        <div className='feature-content'>
                          <h4>Flexibility</h4>
                          <p>Cancel or modify your booking up to 24 hours before the start time</p>
                        </div>
                      </div>
                      <div className='feature-item'>
                        <div className='feature-icon'>🛡️</div>
                        <div className='feature-content'>
                          <h4>Peace of Mind</h4>
                          <p>Take a self-drive vehicle, or add a driver for peace of mind</p>
                        </div>
                      </div>
                      <div className='feature-item'>
                        <div className='feature-icon'>💰</div>
                        <div className='feature-content'>
                          <h4>Competitive Pricing</h4>
                          <p>Get the best deals on car rentals without compromising on quality</p>
                        </div>
                      </div>
                      <div className='feature-item'>
                        <div className='feature-icon'>📞</div>
                        <div className='feature-content'>
                          <h4>24/7 Support</h4>
                          <p>Our team is always ready to assist you with any questions or concerns</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='features-image'>
                    <img src="images/bnb.PNG" alt="Features" className='img-fluid rounded' />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* How It Works Section */}
          <section className='how-it-works-section'>
            <div className='container'>
              <h2 className='section-title'>How It Works</h2>
              <div className='steps-grid'>
                <div className='step-card'>
                  <div className='step-number'>1</div>
                  <h3>Select Car</h3>
                  <p>Browse our wide selection of cars and choose the one that suits your needs and preferences</p>
                </div>
                <div className='step-card'>
                  <div className='step-number'>2</div>
                  <h3>Verify Identity</h3>
                  <p>To ensure a smooth rental process, we require all customers to verify their identity with a valid ID and driver's license</p>
                </div>
                <div className='step-card'>
                  <div className='step-number'>3</div>
                  <h3>Payment</h3>
                  <p>Pay securely online with a credit card, or mobile money. We also have an option for cash payment</p>
                </div>
                <div className='step-card'>
                  <div className='step-number'>4</div>
                  <h3>Confirmation</h3>
                  <p>Once your booking is confirmed, you will receive a confirmation email with all the details of your rental</p>
                </div>
              </div>
              <div className='cta-section'>
                <h3 className='cta-title'>Ready to hit the road?</h3>
                <button className='cta-btn' onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
                  Browse Available Cars
                </button>
              </div>
            </div>
          </section>
          {/* Products Section */}
          <section id='products' className='products-section'>
            <div className='container'>
              <div className='section-header'>
                <h2 className='section-title'>Available Cars</h2>
                <p className='section-subtitle'>Choose from our premium selection of vehicles</p>
              </div>

              {loading && <Loader/> }
              {error && <div className='error-message'>{error}</div>}
              
              <div className='products-grid'>
                {products.map((product) => (
                  <div className='product-card' key={product.id}>
                    <div className='product-image-container'>
                      <img 
                        src={img_url + product.product_photo}
                        alt={product.product_name} 
                        className='product-image'
                      />
                      <div className='product-overlay'>
                        <button className='overlay-btn' onClick={() => navigate("/makepayment", {state : {product}})}>
                          Quick View
                        </button>
                      </div>
                    </div>
                    <div className='product-details'>
                      <h3 className='product-name'>{product.product_name}</h3>
                      <p className='product-description'>{product.product_description?.slice(0, 70)}...</p>
                      <div className='product-footer'>
                        <div className='product-price'>
                          <span className='price-label'>From</span>
                          <span className='price-amount'>Kes {product.product_cost}</span>
                        </div>
                        <button className='hire-btn' onClick={() => navigate("/makepayment", {state : {product}})}>
                          Hire Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

      

    

     
    </div>
  )
}

export default Getproducts;
