import React, { useState, useEffect } from 'react';
import '../css/Location.css';

const Location = () => {
  const [locations, setLocations] = useState([
    {
      id: 1,
      name: 'Nairobi CBD',
      address: 'Moi Avenue, Nairobi',
      phone: '+254 718483892',
      hours: 'Mon-Sat: 8AM-6PM, Sun: 9AM-4PM',
      services: ['Car Rental', 'Airport Pickup', 'Long Term Rental']
    },
    {
      id: 2,
      name: 'Jomo Kenyatta Airport',
      address: 'JKIA Terminal 1, Nairobi',
      phone: '+254 718483892',
      hours: '24/7 Available',
      services: ['Airport Pickup', 'Car Rental', 'VIP Service']
    },
    {
      id: 3,
      name: 'Westlands',
      address: 'Waiyaki Way, Nairobi',
      phone: '+254 718483892',
      hours: 'Mon-Sat: 8AM-6PM, Sun: 10AM-3PM',
      services: ['Car Rental', 'Corporate Services', 'Delivery']
    },
    {
      id: 4,
      name: 'Thika Road',
      address: 'Thika Road Mall, Nairobi',
      phone: '+254 718483892',
      hours: 'Mon-Sat: 7AM-7PM, Sun: 9AM-5PM',
      services: ['Car Rental', 'Maintenance', 'Test Drive']
    },
    {
      id: 5,
      name: 'Kisumu',
      address: 'Oginga Street, Kisumu',
      phone: '+254 718483892',
      hours: 'Mon-Sat: 8AM-5PM, Sun: 9AM-2PM',
      services: ['Car Rental', 'Lake Tours', 'Airport Transfer']
    }
  ]);

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyBranch, setNearbyBranch] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Get user's current location
  const getUserLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          findNearestBranch(latitude, longitude);
          setIsLocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      setIsLocating(false);
    }
  };

  // Find nearest branch based on user coordinates
  const findNearestBranch = (userLat, userLng) => {
    const branchCoordinates = [
      { id: 1, lat: -1.2921, lng: 36.8219 }, // Nairobi CBD
      { id: 2, lat: -1.3192, lng: 36.9278 }, // JKIA Airport
      { id: 3, lat: -1.2685, lng: 36.8030 }, // Westlands
      { id: 4, lat: -1.0370, lng: 37.0715 }, // Thika Road
      { id: 5, lat: -0.0917, lng: 34.7678 }  // Kisumu
    ];

    let nearestBranch = null;
    let minDistance = Infinity;

    branchCoordinates.forEach(branch => {
      const distance = calculateDistance(userLat, userLng, branch.lat, branch.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestBranch = branch;
      }
    });

    if (nearestBranch) {
      const branch = locations.find(loc => loc.id === nearestBranch.id);
      setNearbyBranch(branch);
    }
  };

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  // Get directions to a branch
  const getDirections = (branch) => {
    if (branch) {
      const address = encodeURIComponent(branch.address);
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
    }
  };

  // Call branch
  const callBranch = (phone) => {
    window.open(`tel:${phone}`);
  };

  return (
    <div className='location-container'>
      {/* Hero Section */}
      <section className='location-hero'>
        <div className='hero-content'>
          <h1 className='hero-title'>Find Our Locations</h1>
          <p className='hero-subtitle'>Visit any of our conveniently located branches across Kenya</p>
          
          {/* Location Finder */}
          <div className='location-finder'>
            <button 
              className='locate-btn' 
              onClick={getUserLocation}
              disabled={isLocating}
            >
              {isLocating ? (
                <span className='btn-content'>
                  <span className='spinner'></span>
                  Locating...
                </span>
              ) : (
                <span className='btn-content'>
                  <span className='btn-icon'>📍</span>
                  Find Nearest Branch
                </span>
              )}
            </button>
            
            {userLocation && (
              <div className='user-location'>
                <span className='location-text'>Your Location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}</span>
              </div>
            )}
            
            {nearbyBranch && (
              <div className='nearest-branch'>
                <span className='nearest-icon'>🎯</span>
                <div className='nearest-info'>
                  <h4>Nearest Branch: {nearbyBranch.name}</h4>
                  <p>{nearbyBranch.address}</p>
                  <p>Distance: ~{Math.round(calculateDistance(userLocation.latitude, userLocation.longitude, 
                    locations.find(loc => loc.id === nearbyBranch.id).lat, 
                    locations.find(loc => loc.id === nearbyBranch.id).lng
                  ))} km</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className='locations-section'>
        <div className='container'>
          <h2 className='section-title'>Our Branches</h2>
          <div className='locations-grid'>
            {locations.map((location) => (
              <div 
                key={location.id} 
                className='location-card'
                onClick={() => setSelectedLocation(location.id === selectedLocation ? null : location.id)}
              >
                <div className='location-header'>
                  <div className='location-icon'>📍</div>
                  <h3 className='location-name'>{location.name}</h3>
                </div>
                
                <div className='location-details'>
                  <div className='detail-item'>
                    <span className='detail-icon'>📍</span>
                    <span className='detail-text'>{location.address}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='detail-icon'>📞</span>
                    <span className='detail-text'>{location.phone}</span>
                  </div>
                  <div className='detail-item'>
                    <span className='detail-icon'>⏰</span>
                    <span className='detail-text'>{location.hours}</span>
                  </div>
                </div>

                {/* Services */}
                <div className='location-services'>
                  <h4 className='services-title'>Available Services</h4>
                  <div className='services-list'>
                    {location.services.map((service, index) => (
                      <span key={index} className='service-tag'>{service}</span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='location-actions'>
                  <button className='action-btn primary' onClick={() => callBranch(location.phone)}>
                    <span className='btn-icon'>📞</span>
                    Call Now
                  </button>
                  <button className='action-btn secondary' onClick={() => getDirections(location)}>
                    <span className='btn-icon'>🗺️</span>
                    Get Directions
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedLocation === location.id && (
                  <div className='expanded-details'>
                    <div className='expanded-content'>
                      <h4>Branch Information</h4>
                      <p>Visit our {location.name} branch for premium car rental services. Our friendly staff is ready to assist you with all your vehicle needs.</p>
                      <div className='branch-features'>
                        <div className='feature-item'>
                          <span className='feature-icon'>✅</span>
                          <span>Premium Vehicles</span>
                        </div>
                        <div className='feature-item'>
                          <span className='feature-icon'>✅</span>
                          <span>Professional Staff</span>
                        </div>
                        <div className='feature-item'>
                          <span className='feature-icon'>✅</span>
                          <span>Quick Service</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className='map-section'>
        <div className='container'>
          <h2 className='section-title'>Find Us on Map</h2>
          <div className='map-placeholder'>
            <div className='map-content'>
              <div className='map-icon'>🗺️</div>
              <h3>Interactive Map</h3>
              <p>Click on any location marker to get detailed directions</p>
              <button className='map-btn'>
                <span className='btn-icon'>🗺️</span>
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className='contact-section'>
        <div className='container'>
          <div className='contact-content'>
            <div className='contact-info'>
              <h2 className='contact-title'>Need Help?</h2>
              <p className='contact-subtitle'>Contact our customer service team</p>
              <div className='contact-details'>
                <div className='contact-item'>
                  <span className='contact-icon'>📞</span>
                  <span>Hotline: +254 712 345600</span>
                </div>
                <div className='contact-item'>
                  <span className='contact-icon'>✉️</span>
                  <span>Email: info@mrengacarhire.com</span>
                </div>
                <div className='contact-item'>
                  <span className='contact-icon'>💬</span>
                  <span>WhatsApp: +254 712 345600</span>
                </div>
              </div>
            </div>
            <div className='contact-form'>
              <h3>Send us a Message</h3>
              <form className='message-form'>
                <input type='text' placeholder='Your Name' className='form-input' />
                <input type='email' placeholder='Your Email' className='form-input' />
                <textarea placeholder='Your Message' className='form-textarea' rows='4'></textarea>
                <button type='submit' className='submit-btn'>
                  <span className='btn-icon'>📤</span>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Location;
