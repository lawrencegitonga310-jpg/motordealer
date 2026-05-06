import React, { useState, useEffect } from 'react'
import '../css/Mycarousel.css';

const Mycarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Sample car data - in real app, this would come from API
    const cars = [
        {
            id: 1,
            name: 'Mercedes-Benz C-Class',
            category: 'Luxury Sedan',
            price: 'KES 8,500/day',
            image: 'images/mercedes.jpg',
            features: ['Premium Interior', 'GPS Navigation', 'Leather Seats'],
            description: 'Experience luxury and comfort with our premium sedan offering.'
        },
        {
            id: 2,
            name: 'Toyota RAV4',
            category: 'Compact SUV',
            price: 'KES 6,000/day',
            image: 'images/rav4.jpg',
            features: ['All-Wheel Drive', 'Spacious Interior', 'Fuel Efficient'],
            description: 'Perfect for families and adventure seekers with ample space and reliability.'
        },
        {
            id: 3,
            name: 'Nissan Patrol',
            category: 'Off-Road SUV',
            price: 'KES 7,500/day',
            image: 'images/patrol.jpg',
            features: ['4x4 Capability', 'High Ground Clearance', 'Towing Capacity'],
            description: 'Conquer any terrain with our rugged off-road vehicle built for extreme adventures.'
        },
        {
            id: 4,
            name: 'Honda Accord',
            category: 'Economy Sedan',
            price: 'KES 4,000/day',
            image: 'images/accord.jpg',
            features: ['Fuel Efficient', 'Reliable Engine', 'Comfortable Ride'],
            description: 'Affordable reliability without compromising on comfort and style.'
        },
        {
            id: 5,
            name: 'Ford Ranger',
            category: 'Pickup Truck',
            price: 'KES 5,500/day',
            image: 'images/ranger.jpg',
            features: ['High Payload', 'Durable Build', 'Versatile Usage'],
            description: 'Built for work and play with exceptional towing capacity and durability.'
        }
    ];

    const totalSlides = cars.length;

    // Auto-play functionality
    useEffect(() => {
        let interval;
        if (isAutoPlaying && !isPaused) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % totalSlides);
            }, 3000);
        } else {
            clearInterval(interval);
        }
        
        return () => clearInterval(interval);
    }, [isAutoPlaying, isPaused, totalSlides]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying);
        setIsPaused(false);
    };

    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    return (
        <div className='mycarousel-container'>
            <div className='carousel-background'>
                <div className='carousel-overlay'></div>
            </div>
            
            <div className='carousel-content'>
                <div className='carousel-header'>
                    <h1 className='carousel-title'>Featured Vehicles</h1>
                    <p className='carousel-subtitle'>Explore our premium selection of rental cars</p>
                </div>

                {/* Navigation Controls */}
                <div className='carousel-nav'>
                    <button 
                        className='nav-btn prev-btn' 
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                    >
                        <span className='nav-icon'>‹</span>
                    </button>
                    
                    <div className='slide-indicators'>
                        {cars.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${currentSlide === index ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            >
                            </button>
                        ))}
                    </div>
                    
                    <button 
                        className='nav-btn next-btn' 
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                    >
                        <span className='nav-icon'>›</span>
                    </button>
                </div>

                {/* Auto-play Controls */}
                <div className='autoplay-controls'>
                    <button 
                        className={`autoplay-btn ${isAutoPlaying ? 'playing' : ''}`}
                        onClick={toggleAutoPlay}
                        title={isAutoPlaying ? 'Stop Auto-play' : 'Start Auto-play'}
                    >
                        <span className='play-icon'>{isAutoPlaying ? '❚❚' : '▶'}</span>
                    </button>
                    
                    <button 
                        className={`pause-btn ${isPaused ? 'paused' : ''}`}
                        onClick={togglePause}
                        disabled={!isAutoPlaying}
                        title={isPaused ? 'Resume' : 'Pause'}
                    >
                        <span className='pause-icon'>{isPaused ? '❚❚' : '❚❚'}</span>
                    </button>
                </div>

                {/* Main Carousel */}
                <div className='carousel-main'>
                    <div className='carousel-viewport'>
                        <div 
                            className='carousel-track' 
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {cars.map((car, index) => (
                                <div 
                                    key={car.id} 
                                    className={`carousel-slide ${currentSlide === index ? 'active' : ''}`}
                                >
                                    <div className='slide-content'>
                                        <div className='car-image'>
                                            <img src={car.image} alt={car.name} />
                                            <div className='image-overlay'></div>
                                        </div>
                                        <div className='car-info'>
                                            <h3 className='car-name'>{car.name}</h3>
                                            <p className='car-category'>{car.category}</p>
                                            <div className='car-price'>{car.price}</div>
                                            <p className='car-description'>{car.description}</p>
                                            <div className='car-features'>
                                                {car.features.map((feature, idx) => (
                                                    <span key={idx} className='feature-tag'>{feature}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Info Bar */}
                <div className='quick-info'>
                    <div className='info-item'>
                        <span className='info-label'>Vehicle</span>
                        <span className='info-value'>{cars[currentSlide].name}</span>
                    </div>
                    <div className='info-item'>
                        <span className='info-label'>Category</span>
                        <span className='info-value'>{cars[currentSlide].category}</span>
                    </div>
                    <div className='info-item'>
                        <span className='info-label'>Price</span>
                        <span className='info-value'>{cars[currentSlide].price}</span>
                    </div>
                </div>
            </div>
        </div>
    )  
}

export default Mycarousel;