import React from 'react'
import '../css/Aboutus.css';

const Aboutus = () => {
    return (
        <div className='aboutus-container'>
            <div className='aboutus-background'>
                <div className='aboutus-overlay'></div>
            </div>
            
            <div className='aboutus-content'>
                <div className='aboutus-card'>
                    {/* Hero Section */}
                    <div className='hero-section'>
                        <div className='hero-content'>
                            <div className='hero-logo'>
                                <span className='logo-icon'>🚗</span>
                                <h1 className='hero-title'>Mrenga Carhire</h1>
                            </div>
                            <p className='hero-subtitle'>Your trusted partner for quality car rentals</p>
                        </div>
                    </div>

                    {/* Company Story */}
                    <section className='story-section'>
                        <h2 className='section-title'>Our Story</h2>
                        <div className='story-content'>
                            <p className='story-text'>
                                Founded with a passion for excellence, Mrenga Carhire began its journey with a simple mission: to provide exceptional car rental services that make travel accessible and enjoyable for everyone. What started as a small vision has grown into a trusted name in the car rental industry.
                            </p>
                            <p className='story-text'>
                                Our commitment to quality service and customer satisfaction has been the cornerstone of our growth. We believe that every journey should begin with a reliable vehicle and end with lasting memories.
                            </p>
                        </div>
                    </section>

                    {/* Mission & Values */}
                    <section className='mission-section'>
                        <div className='mission-grid'>
                            <div className='mission-item'>
                                <div className='mission-icon'>🎯</div>
                                <h3 className='mission-title'>Our Mission</h3>
                                <p className='mission-text'>To make car rental easy, convenient, and affordable for everyone while maintaining the highest standards of service and vehicle quality.</p>
                            </div>
                            <div className='mission-item'>
                                <div className='mission-icon'>❤️</div>
                                <h3 className='mission-title'>Our Values</h3>
                                <ul className='values-list'>
                                    <li className='value-item'>
                                        <span className='value-icon'>✓</span>
                                        Customer Satisfaction First
                                    </li>
                                    <li className='value-item'>
                                        <span className='value-icon'>✓</span>
                                        Quality & Reliability
                                    </li>
                                    <li className='value-item'>
                                        <span className='value-icon'>✓</span>
                                        Transparency & Trust
                                    </li>
                                    <li className='value-item'>
                                        <span className='value-icon'>✓</span>
                                        Innovation & Excellence
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Why Choose Us */}
                    <section className='features-section'>
                        <h2 className='section-title'>Why Choose Mrenga Carhire?</h2>
                        <div className='features-grid'>
                            <div className='feature-card'>
                                <div className='feature-icon'>🚗</div>
                                <h3 className='feature-title'>Wide Vehicle Selection</h3>
                                <p className='feature-text'>From compact cars to spacious SUVs, we have the perfect vehicle for every need and budget.</p>
                            </div>
                            <div className='feature-card'>
                                <div className='feature-icon'>💰</div>
                                <h3 className='feature-title'>Competitive Pricing</h3>
                                <p className='feature-text'>Transparent pricing with no hidden fees, offering the best value for your money.</p>
                            </div>
                            <div className='feature-card'>
                                <div className='feature-icon'>🛡️</div>
                                <h3 className='feature-title'>Safety First</h3>
                                <p className='feature-text'>Well-maintained vehicles with comprehensive insurance and 24/7 roadside assistance.</p>
                            </div>
                            <div className='feature-card'>
                                <div className='feature-icon'>🎯</div>
                                <h3 className='feature-title'>Customer Support</h3>
                                <p className='feature-text'>Dedicated support team ready to assist you throughout your rental experience.</p>
                            </div>
                        </div>
                    </section>

                    {/* Statistics */}
                    <section className='stats-section'>
                        <h2 className='section-title'>Our Impact</h2>
                        <div className='stats-grid'>
                            <div className='stat-item'>
                                <div className='stat-number'>5000+</div>
                                <div className='stat-label'>Happy Customers</div>
                            </div>
                            <div className='stat-item'>
                                <div className='stat-number'>100+</div>
                                <div className='stat-label'>Vehicle Fleet</div>
                            </div>
                            <div className='stat-item'>
                                <div className='stat-number'>50+</div>
                                <div className='stat-label'>Locations</div>
                            </div>
                            <div className='stat-item'>
                                <div className='stat-number'>15+</div>
                                <div className='stat-label'>Years Experience</div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className='cta-section'>
                        <div className='cta-content'>
                            <h2 className='cta-title'>Ready to Start Your Journey?</h2>
                            <p className='cta-subtitle'>Join thousands of satisfied customers who trust Mrenga Carhire for their travel needs.</p>
                            <div className='cta-buttons'>
                                <button className='cta-btn primary'>
                                    <span className='btn-icon'>🚗</span>
                                    Browse Our Fleet
                                </button>
                                <button className='cta-btn secondary'>
                                    <span className='btn-icon'>📞</span>
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Aboutus
