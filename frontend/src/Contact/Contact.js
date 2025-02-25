// About.js
import React from 'react';
import './Contact.css'; // Importing the CSS file for styling
import contactimg from '../assets/images/contact_image.png'; // Replace with your actual image path

function Contact() {
    return (
        <section className="container-fluid" id="contact-section">
            <div className='container py-4'>
                <div className='contact-title'>
                    <h1>Contact Us</h1>
                </div>
                <div className="row contact-row">
                    <div className="col-12 col-md-6 col-lg-4 contact-image">
                        <img src={contactimg} alt="About Prescripto" className="img-fluid" />
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 contact-info">
                        <p>OUR OFFICE</p>
                        <p>00000 Willms Station <br /> pune 000, pune, India</p>
                        <p>Tel: (000) 000-0000 <br /> Email: rautonkar228@gmail.com</p>
                        <p>CAREERS AT HOSPITAL</p>
                        <p>Learn more about our teams and job openings.</p>
                        <button>Explore Jobs</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
