import React from 'react';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import InfoSection from '../components/InfoSection';
import GallerySection from '../components/GallerySection';
import LocationSection from '../components/LocationSection';

const LandingPage = () => {
    return (
        <Layout>
            <section id="home">
                <HeroSection />
            </section>

            <section id="info">
                <InfoSection />
            </section>

            <section id="gallery">
                <GallerySection />
            </section>

            <section id="location">
                <LocationSection />
            </section>
        </Layout>
    );
};

export default LandingPage;
