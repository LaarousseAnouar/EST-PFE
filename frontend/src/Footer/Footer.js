import logoimg from '../assets/images/logo-hospital.png';
import './Footer.css';

function Footer() {
    return (
        <section className="container-fluid" id='footer'>
            <div className="container" id='footer-container' >
                <div className="row footer-info">
                    <div className='col-12 col-md-5 footer-logo'>
                        <img src={logoimg} alt='logoimg' className='img-fluid' />
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                    <div className='col-12 col-md-3 company'>
                        <p>COMPANY</p>
                        <ul class="p-0">
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>
                    <div className='col-12 col-md-3 touch'>
                        <p class="text-xl font-medium mb-3">GET IN TOUCH</p>
                        <ul class="flex flex-col gap-2 p-0">
                            <li>+0-000-000-000</li>
                            <li>rautonkar228@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <hr/>
                    <p class="py-2 text-sm text-center">Copyright 2024 @ rautomkar - All Right Reserverd.
                    </p>
                </div>
            </div>
        </section>
    );
}
export default Footer;