import React from 'react';
import FadeIn from '../components/FadeIn';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';
import ParallaxImage from '../components/ParallaxImage';
const About = () => {
  return (
    <PageTransition className="about-page">
      {/* Header */}
      <section className="page-header bg-sand text-center">
        <div className="container">
          <AnimatedText text="Our Story" delay={100} el="h1" />
          <FadeIn delay={500}>
            <p className="subtitle">Rooted in tradition, crafted for today.</p>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section philosophy-section">
        <div className="container philosophy-grid">
          <div className="philosophy-image-wrapper">
            <ParallaxImage 
              src="/4.png" 
              alt="Chef cooking" 
              speed={0.4}
              delay={200}
            />
          </div>
          <div className="philosophy-text">
            <AnimatedText text="The Philosophy" delay={0} el="h2" justify="flex-start" />
            <FadeIn delay={400} direction="up">
              <p>
                MANA FOOD began with a simple idea: that dining should be an honest expression of the seasons. 
                We work tirelessly alongside local growers, foragers, and artisans who share our dedication to quality. 
              </p>
              <p>
                By embracing open-fire cooking, fermentation, and heritage techniques, we coax the maximum flavor 
                from humble ingredients. Our cuisine is not meant to be overcomplicated, but rather, a celebration 
                of nature's intrinsic beauty.
              </p>
              <p>
                Our space is designed to reflect this ethos—minimalist, organic, and grounded. Whether you are 
                joining us for a casual Tuesday supper or a celebratory feast, our goal is to provide a sense of 
                warmth and genuine hospitality.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Space Section */}
      <section className="section bg-olive text-warm-white text-center">
        <div className="container">
          <AnimatedText text="The Space" delay={0} el="h2" className="text-warm-white" />
          <FadeIn delay={400} direction="up">
            <p className="max-w-prose text-warm-white">
              Designed with earthly textures—raw stone, terracotta, and brushed oak—our dining room is an escape from the outside world. Bathed in natural light during the day, it transforms into a cozy, candle-lit haven by evening.
            </p>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
};

export default About;
