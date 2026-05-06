import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import '../css/Addproducts.css';

const Addproducts = () => {
    // Initialize hooks
    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [product_cost, setProductCost] = useState("");
    const [product_photo, setProductPhoto] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    // Declare additional hooks to manage state of application
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};
        
        if (!product_name.trim()) {
            newErrors.product_name = 'Product name is required';
        }
        if (!product_description.trim()) {
            newErrors.product_description = 'Product description is required';
        }
        if (!product_cost || product_cost <= 0) {
            newErrors.product_cost = 'Valid price is required';
        }
        if (!product_photo) {
            newErrors.product_photo = 'Product photo is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle file selection with preview
    const handleFileSelect = (file) => {
        if (file && file.type.startsWith('image/')) {
            setProductPhoto(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setErrors({ ...errors, product_photo: '' });
        } else {
            setErrors({ ...errors, product_photo: 'Please select a valid image file' });
        }
    };

    // Handle drag and drop
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFileSelect(files[0]);
        }
    };

    // Create a function that will handle the submit action
    const handleSubmit = async (e) => {
        // Prevent site from reloading
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        // Set loading hook with a message (activate it)
        setLoading(true);
        setError("");
        
        try {
            // Create a form data object
            const formdata = new FormData();
            
            // Append details to the form data created
            formdata.append("product_name", product_name);
            formdata.append("product_description", product_description);
            formdata.append("product_cost", product_cost);
            formdata.append("product_photo", product_photo);

            // Interact with axios to help you use the POST method
            const response = await axios.post("https://gitongalawrence.alwaysdata.net/api/add_product", formdata);

            // Set loading hook back to default
            setLoading(false);
            
            // Update success hook with a message
            setSuccess(response.data.message);

            // Clear hooks (setting them back to default/empty)
            setProductName("");
            setProductDescription("");
            setProductCost("");
            setProductPhoto("");
            setImagePreview(null);
            setErrors({});
            e.target.reset();

            // Clear success message after 5 seconds
            setTimeout(() => {
                setSuccess("");
            }, 5000);
        }
        catch (error) {
            // Set loading hook back to default
            setLoading(false);
            
            // Update error hook with a message
            setError(error.response?.data?.message || error.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className='addproducts-container'>
            <div className='addproducts-background'>
                <div className='addproducts-overlay'></div>
            </div>
            
            <div className='addproducts-content'>
                <div className='addproducts-card'>
                    {/* Header Section */}
                    <div className='addproducts-header'>
                        <div className='logo-section'>
                            <div className='logo'>
                                <span className='logo-icon'>📦</span>
                            </div>
                            <h1 className='addproducts-title'>Add New Product</h1>
                            <p className='addproducts-subtitle'>List your vehicle for rental</p>
                        </div>
                    </div>

                    {/* Alert Messages */}
                    {loading && <Loader />}
                    
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

                    {/* Add Product Form */}
                    <form onSubmit={handleSubmit} className='addproducts-form'>
                        <div className='form-grid'>
                            {/* Product Name */}
                            <div className='form-group'>
                                <label htmlFor='product_name' className='form-label'>
                                    <span className='label-icon'>🚗</span>
                                    Product Name
                                </label>
                                <div className='input-wrapper'>
                                    <input 
                                        type="text" 
                                        id="product_name"
                                        placeholder='Enter product name'
                                        className={`form-input ${errors.product_name ? 'error' : ''}`}
                                        value={product_name}
                                        onChange={(e) => {
                                            setProductName(e.target.value);
                                            setErrors({ ...errors, product_name: '' });
                                        }}
                                        required 
                                    />
                                    <span className='input-focus-border'></span>
                                    {errors.product_name && (
                                        <span className='error-message'>{errors.product_name}</span>
                                    )}
                                </div>
                            </div>

                            {/* Product Description */}
                            <div className='form-group full-width'>
                                <label htmlFor='product_description' className='form-label'>
                                    <span className='label-icon'>📝</span>
                                    Product Description
                                </label>
                                <div className='input-wrapper'>
                                    <textarea 
                                        id="product_description"
                                        placeholder='Describe your vehicle features, condition, and specifications'
                                        className={`form-textarea ${errors.product_description ? 'error' : ''}`}
                                        value={product_description}
                                        onChange={(e) => {
                                            setProductDescription(e.target.value);
                                            setErrors({ ...errors, product_description: '' });
                                        }}
                                        rows="4"
                                        required 
                                    />
                                    <span className='input-focus-border'></span>
                                    {errors.product_description && (
                                        <span className='error-message'>{errors.product_description}</span>
                                    )}
                                </div>
                            </div>

                            {/* Product Cost */}
                            <div className='form-group'>
                                <label htmlFor='product_cost' className='form-label'>
                                    <span className='label-icon'>💰</span>
                                    Price (KES)
                                </label>
                                <div className='input-wrapper'>
                                    <input 
                                        type="number" 
                                        id="product_cost"
                                        placeholder='Enter rental price'
                                        className={`form-input ${errors.product_cost ? 'error' : ''}`}
                                        value={product_cost}
                                        onChange={(e) => {
                                            setProductCost(e.target.value);
                                            setErrors({ ...errors, product_cost: '' });
                                        }}
                                        min="0"
                                        step="0.01"
                                        required 
                                    />
                                    <span className='input-focus-border'></span>
                                    {errors.product_cost && (
                                        <span className='error-message'>{errors.product_cost}</span>
                                    )}
                                </div>
                            </div>

                            {/* Product Photo */}
                            <div className='form-group full-width'>
                                <label htmlFor='product_photo' className='form-label'>
                                    <span className='label-icon'>📷</span>
                                    Vehicle Photo
                                </label>
                                <div 
                                    className={`file-upload-area ${dragActive ? 'drag-active' : ''} ${errors.product_photo ? 'error' : ''}`}
                                    onDragEnter={handleDragIn}
                                    onDragLeave={handleDragOut}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    {imagePreview ? (
                                        <div className='image-preview'>
                                            <img src={imagePreview} alt="Preview" className='preview-image' />
                                            <button 
                                                type="button" 
                                                className='remove-image'
                                                onClick={() => {
                                                    setProductPhoto("");
                                                    setImagePreview(null);
                                                    setErrors({ ...errors, product_photo: '' });
                                                }}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='upload-placeholder'>
                                            <div className='upload-icon'>📁</div>
                                            <div className='upload-text'>
                                                <p>Drag & drop your vehicle photo here</p>
                                                <p>or</p>
                                                <button type="button" className='browse-btn'>
                                                    Browse Files
                                                </button>
                                            </div>
                                            <input 
                                                type="file"
                                                id="product_photo"
                                                className='file-input'
                                                accept='image/*'
                                                onChange={(e) => handleFileSelect(e.target.files[0])}
                                                required 
                                            />
                                        </div>
                                    )}
                                </div>
                                {errors.product_photo && (
                                    <span className='error-message'>{errors.product_photo}</span>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className='form-actions'>
                            <button type="submit" className='addproducts-btn' disabled={loading}>
                                {loading ? (
                                    <span className='btn-content'>
                                        <span className='spinner'></span>
                                        Adding Product...
                                    </span>
                                ) : (
                                    <span className='btn-content'>
                                        <span className='btn-icon'>➕</span>
                                        Add Product
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Addproducts;