import './Herosection.css';

import SpecialityMenu from './SpecialityMenu';
import React from 'react';
import Herosection from './Herosection';
import TopDoctors from './TopDoctors';
import Banner from './Banner';

function Home() {
    return (
        <React.Fragment>
            <Herosection />
            <SpecialityMenu />
            <TopDoctors />
            <Banner />
        </React.Fragment>
    );
}
export default Home;