import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';
import ParallaxImage from '../components/ParallaxImage';

// Hero-specific fade: uses animate (mount-triggered) NOT whileInView
const HeroFade = ({ children, delay = 0, duration = 0.8 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    <PageTransition className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: 'url(/2.png)' }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <AnimatedText text="Experience Elevated Dining" delay={100} el="h1" animate={true} />
          <HeroFade delay={0.5} duration={0.8}>
            <p>Where modern technique meets earthy, natural ingredients. A sanctuary for the senses.</p>
          </HeroFade>
          <HeroFade delay={0.7} duration={0.6}>
            <div className="hero-cta-wrapper">
              <Link to="/menu" className="btn-elegant interactive">
                <span className="btn-text">Discover Our Menu</span>
                <span className="btn-line"></span>
              </Link>
            </div>
          </HeroFade>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section bg-sand intro-section">
        <div className="container intro-grid">
          <div className="intro-text">
            <AnimatedText text="A Taste of the Earth" delay={0} el="h2" justify="flex-start" />
            <FadeIn delay={300}>
              <p>At MANA FOOD, we believe that the best meals are rooted in simplicity. Our menu is a testament to the bounty of the seasons, showcasing ingredients sourced with intention and prepared with a modern sensibility. From fire-roasted vegetables to perfectly seared cuts, every dish tells a story of the land.</p>
              <Link to="/about" className="link-arrow interactive">Discover Our Story &rarr;</Link>
            </FadeIn>
          </div>
          <div className="intro-image-wrapper">
            <ParallaxImage
              src="/1.png"
              alt="Restaurant dining room"
              className="intro-image-container"
              speed={0.4}
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Gallery/Atmosphere Section */}
      <section className="section atmosphere-section">
        <div className="container">
          <div className="text-center">
            <AnimatedText text="The Atmosphere" delay={0} el="h2" />
            <FadeIn delay={300}>
              <p className="subtitle">Light, earthy, and perfectly curated.</p>
            </FadeIn>
          </div>
          <div className="gallery-grid">
            <ParallaxImage
              delay={100}
              className="gallery-item lg"
              src="/3.png"
              alt="Restaurant Interior"
              speed={0.5}
            />
            <ParallaxImage
              delay={300}
              className="gallery-item sm"
              src="/4.png"
              alt="Chef preparing"
              speed={0.3}
            />
            <ParallaxImage
              delay={500}
              className="gallery-item sm"
              src="/5.png"
              alt="Plated dish"
              speed={0.4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-bg"></div>
        <div className="cta-overlay"></div>
        <div className="container cta-content">
          <AnimatedText text="Join Us for Dinner" delay={0} el="h2" />
          <FadeIn delay={400}>
            <p>We welcome walk-ins and phone inquiries.</p>
            <Link to="/contact" className="btn-elegant interactive">
              <span className="btn-text">Get Directions</span>
              <span className="btn-line"></span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
