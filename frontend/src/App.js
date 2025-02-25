import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importation des composants principaux
import Home from './Home/Home.js';
import Navbar from './Navbar/Navbar.js';
import Footer from './Footer/Footer.js';
import About from './About/About.js';
import AllDoctors from './AllDoctors/AllDoctors.js';
import Contact from './Contact/Contact.js';

// Importation des pages d'authentification
import SignUp from './components/SignUp';
import Login from './components/Login';
import Patient from './components/Patient';
import Doctors from './components/Doctors';
import Admins from './components/Admins';

// Importation du contexte de l'application
import AppContextProvider from './Context/AppContext.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContextProvider>
          <Navbar />
          <Routes>
            {/* 🌍 Pages principales */}
            <Route path='/' element={<Home />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/About' element={<About />} />
            <Route path='/AllDoctors' element={<AllDoctors />} />
            <Route path='/doctors' element={<AllDoctors />} />
            <Route path='/doctors/:speciality' element={<AllDoctors />} />
            <Route path='/Contact' element={<Contact />} /> 

            {/* 🔑 Routes d'authentification */}
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/admins" element={<Admins />} />

          </Routes>
        </AppContextProvider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
