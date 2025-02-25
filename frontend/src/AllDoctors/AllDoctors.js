import { useContext, useEffect, useState } from 'react';
import './AllDoctors.css'
import '../Home/TopDoctors.css'
import { AppContext } from '../Context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
function AllDoctors() {
    // useParams for accesesing parameter
    const { speciality } = useParams()
    // create navigate const to navigate diffrent link
    const navigate = useNavigate()
    // create useState for storing doctors Data
    const [filterDoc, setFilterDoc] = useState([])
    // use context to get data from Data.js file
    const { doctors } = useContext(AppContext)
    // create function to filter doctors according function

    useEffect(() => {
        const applyFilter = () => {
            if (speciality) {
                setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
            } else {
                setFilterDoc(doctors);
            }
        };

        applyFilter();
    }, [doctors, speciality]); // Only depend on doctors and speciality



    return (
        <section className="container-fluid" id="alldoctor-section">
            <div className='container'>
                <p>Browse through the doctors specialist.</p>
                <div className='row'>
                    <div class="col-12 col-md-3 col-lg-2 specialities">
                        <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}>General physician</p>
                        <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}>Gynecologist</p>
                        <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}>Dermatologist</p>
                        <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}>Pediatricians</p>
                        <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}>Neurologist</p>
                        <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}>Gastroenterologist</p>
                    </div>
                    <div className='col-12 col-md-9 col-lg-10 all-doctors'>
                        {
                            filterDoc.map((item, index) => {

                                return (
                                    <div key={index} className="col-12 col-md-5 col-lg-3" id="doctor-card">
                                        <img src={item.image} alt="docimg" className="img-fluid" />
                                        <div className="doctor-info">
                                            <div className="available">
                                                <p></p><p>Available</p>
                                            </div>
                                            <p className="doctor-name">{item.name}</p>
                                            <p className="doctor-speciality">{item.speciality}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}
export default AllDoctors;