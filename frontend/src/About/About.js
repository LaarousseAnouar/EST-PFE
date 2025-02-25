// About.js
import React from 'react';
import './About.css'; // Importing the CSS file for styling
import aboutImage from '../assets/images/about_image.png'; // Replace with your actual image path

function About() {
    return (
        <section className="container-fluid" id="about-section">
            <div className='container py-5'>
                <div className='about-title'>
                    <h1>About Us</h1>
                </div>
                <div className="row about-row">
                    {/* Image Section */}
                    <div className="col-12 col-md-5 col-lg-4 about-image">
                        <img src={aboutImage} alt="About Prescripto" className="img-fluid" />
                    </div>

                    {/* Text Section */}
                    <div className="col-12 col-md-6 col-lg-6 about-info">
                        <p>
                            Welcome to Hospital, your trusted partner in managing your healthcare needs conveniently and efficiently. At Hospital, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
                        </p>
                        <p>
                            Hospital is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Hospital is here to support you every step of the way.
                        </p>
                        <h4 className="about-vision-title">Our Vision</h4>
                        <p>
                            Our vision at Hospital is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
