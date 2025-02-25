// import './Herosection.css';
import './Banner.css'


import Bannerimg from "../assets/images/appointment_img.png";

function Banner () {
    return(
        <section className="container" id='banner'>
                <div className="container" id='banner-container'>
                    <div className='row'>
                        <div className='col-6 col-md-7 banner-title-div'>
                            <p className='banner-title'>
                            Book Appointment With 100+ Trusted Doctors
                            </p>
                            <a href='book-btn' className='rounded-pill'>
                                Create account
                            </a>
                        </div>
                        <div className='col-6 col-md-5 banner-img'>
                            <img src={Bannerimg} alt='heroimage' className='img-fluid' />
                        </div>
                    </div>
                </div>
            </section>
    );
}
export default Banner