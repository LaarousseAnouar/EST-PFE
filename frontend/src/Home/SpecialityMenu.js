import './SpecialMenu.css';
import { specialityData } from '../Data'
import { Link } from 'react-router-dom'

function SpecialityMenu() {
    return (
        <section className="container-fluid" id='menu-special' >
            <div className='container'>
                <div className="specialitymenu-title">
                    <h1 className='title-menu'>Find by Speciality</h1>
                    <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                </div>
                <div className="row" id='menu-img'>
                    {
                        specialityData.map((item, index) => {
                            return (
                                <Link key={index} to="/" className='col-6 col-md-2'>
                                    <img src={item.image} alt='img-special' className='img-fluid' />
                                    <p>{item.speciality}</p>
                                </Link>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}
export default SpecialityMenu