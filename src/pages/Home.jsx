import React from 'react'
import HomeHero from '../components/HomeHero';
import HomeNavBar from '../components/HomeNavBar';

function Home() {
    return (
        <div id='home'>
            <HomeNavBar />
            <HomeHero />
        </div>
    )
}

export default Home