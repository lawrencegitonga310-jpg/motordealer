import axios from 'axios'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'
import '../css/Makepayment.css'

const Makepayment = () => {
    //distruct the details passed from get product component
    //The uselocation hooks enables us to get/distructure the properties passed from previous component
    const {product} = useLocation().state || {}
    
    //declare the navigate hook
    const navigate = useNavigate()

    //below we specify the image base url
    const img_url ="https://gitongalawrence.alwaysdata.net/static/images/"

    //initialize hooks to manage the state of your application
    const[number, setNumber] = useState("")
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("mpesa");
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    //create a function that will handle the submit action
    const handleSubmit = async (e) =>{
        //prevent the site from reloading 
        e.preventDefault()

        // validate phone number
        if (!number || number.length < 10) {
            setError("Please enter a valid phone number");
            return;
        }

        // update the loading hook
        setLoading(true)
        setError("")
        setSuccess("")

        try{
            //create a form data object
            const formdata = new FormData()

            //append the data to the form data
            formdata.append("phone", number)
            formdata.append("amount", product.product_cost)

            const response = await axios.post("https://gitongalawrence.alwaysdata.net/api/mpesa_payment", formdata)

            //set loading back to default
            setLoading(false)

            //update the success hook with the message
            setSuccess(response.data.message)
            setShowPaymentForm(false)
        }
        catch(error){
            // if there is an error respond to error
            setLoading(false)
            //update the error hook with error message 
            setError(error.response?.data?.message || "Payment failed. Please try again.")
        }
    }

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method)
        setShowPaymentForm(true)
        setError("")
        setSuccess("")
    }

    const formatPhoneNumber = (phone) => {
        // Remove any non-digit characters
        const cleaned = phone.replace(/\D/g, '')
        // Format to 254XXXXXXXXX format
        if (cleaned.startsWith('0')) {
            return '254' + cleaned.substring(1)
        } else if (cleaned.startsWith('254')) {
            return cleaned
        } else if (cleaned.startsWith('+254')) {
            return cleaned.substring(1)
        }
        return cleaned
    }

    const handlePhoneChange = (e) => {
        const formatted = formatPhoneNumber(e.target.value)
        setNumber(formatted)
    }

    return (
        <div className='payment-container'>
            {/* Header */}
            <div className='payment-header'>
                <button className='back-btn' onClick={() => navigate("/")}>
                    <span className='back-icon'>←</span>
                    <span className='back-text'>Back to Products</span>
                </button>
                <h1 className='header-title'>Mrenga Carhire Payment</h1>
            </div>

            {/* Product Summary */}
            <div className='payment-content'>
                <div className='product-summary'>
                    <div className='product-image-container'>
                        <img src={img_url + product.product_photo} alt={product.product_name} className='product-image'/>
                        <div className='product-overlay'>
                            <span className='overlay-badge'>Premium</span>
                        </div>
                    </div>
                    <div className='product-details'>
                        <h2 className='product-name'>{product.product_name}</h2>
                        <p className='product-description'>{product.product_description}</p>
                        <div className='product-price'>
                            <span className='price-label'>Total Amount:</span>
                            <span className='price-amount'>KES {product.product_cost}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className='payment-methods'>
                    <h3 className='section-title'>Choose Payment Method</h3>
                    <div className='method-options'>
                        <button 
                            className={`method-btn ${paymentMethod === 'mpesa' ? 'active' : ''}`}
                            onClick={() => handlePaymentMethodChange('mpesa')}
                        >
                            <span className='method-icon'>💳</span>
                            <div className='method-info'>
                                <h4>M-Pesa</h4>
                                <p>Fast and secure mobile payment</p>
                            </div>
                        </button>
                        
                        <button 
                            className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                            onClick={() => handlePaymentMethodChange('card')}
                        >
                            <span className='method-icon'>💳</span>
                            <div className='method-info'>
                                <h4>Card Payment</h4>
                                <p>Visa, Mastercard, or other cards</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Payment Form */}
                {showPaymentForm && (
                    <div className='payment-form-container'>
                        <div className='form-header'>
                            <h3 className='form-title'>Complete Payment</h3>
                            <p className='form-subtitle'>Enter your payment details to complete the booking</p>
                        </div>

                        <form onSubmit={handleSubmit} className='payment-form'>
                            {/* Alert Messages */}
                            {loading && <Loader />}
                            {success && (
                                <div className='alert alert-success'>
                                    <span className='alert-icon'>✅</span>
                                    <span className='alert-text'>{success}</span>
                                </div>
                            )}
                            {error && (
                                <div className='alert alert-danger'>
                                    <span className='alert-icon'>❌</span>
                                    <span className='alert-text'>{error}</span>
                                </div>
                            )}

                            {paymentMethod === 'mpesa' ? (
                                <div className='mpesa-form'>
                                    <div className='form-group'>
                                        <label className='form-label'>Phone Number</label>
                                        <input 
                                            type="tel"
                                            className='form-input'
                                            placeholder='254XXXXXXXXX'
                                            value={number}
                                            onChange={handlePhoneChange}
                                            required
                                        />
                                        <small className='form-hint'>Enter your M-Pesa registered phone number</small>
                                    </div>
                                    
                                    <div className='payment-summary'>
                                        <div className='summary-row'>
                                            <span className='summary-label'>Vehicle:</span>
                                            <span className='summary-value'>{product.product_name}</span>
                                        </div>
                                        <div className='summary-row'>
                                            <span className='summary-label'>Amount:</span>
                                            <span className='summary-value'>KES {product.product_cost}</span>
                                        </div>
                                        <div className='summary-row total'>
                                            <span className='summary-label'>Total:</span>
                                            <span className='summary-value'>KES {product.product_cost}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='card-form'>
                                    <div className='form-group'>
                                        <label className='form-label'>Card Number</label>
                                        <input 
                                            type="text"
                                            className='form-input'
                                            placeholder='1234 5678 9012 3456'
                                            required
                                        />
                                    </div>
                                    <div className='form-row'>
                                        <div className='form-group'>
                                            <label className='form-label'>Expiry Date</label>
                                            <input 
                                                type="text"
                                                className='form-input'
                                                placeholder='MM/YY'
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <label className='form-label'>CVV</label>
                                            <input 
                                                type="text"
                                                className='form-input'
                                                placeholder='123'
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button 
                                type="submit"
                                className='payment-btn'
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className='btn-content'>
                                        <span className='btn-spinner'></span>
                                        Processing...
                                    </span>
                                ) : (
                                    <span className='btn-content'>
                                        <span className='btn-icon'>💳</span>
                                        Complete Payment - KES {product.product_cost}
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Makepayment;