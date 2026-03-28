import React from 'react';
import FadeIn from '../components/FadeIn';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';

const Contact = () => {
  return (
    <PageTransition className="contact-page bg-warm-white">
      <section className="page-header text-center bg-sand">
        <div className="container">
          <AnimatedText text="Visit Us" delay={100} el="h1" />
          <FadeIn delay={500}>
            <p className="subtitle">Walk-ins always welcome.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section py-lg contact-section">
        <div className="container contact-grid">
          <div className="contact-info">
            <AnimatedText text="Location & Hours" delay={0} el="h2" justify="flex-start" />
            <FadeIn delay={400}>
              <div className="info-block">
                <h3>Address</h3>
                <p>Janapriya Apartment, back gate, Ambience Fort, Radha Krishna Nagar, Hyderguda, Hyderabad, Telangana 500048.</p>
              </div>

              <div className="info-block">
                <h3>Hours</h3>
                <p><strong>Mon - Thu:</strong> 10:00 AM - 10:00 PM</p>
                <p><strong>Fri - Sun:</strong> 10:00 AM - 11:00 PM</p>
              </div>

              <div className="info-block">
                <h3>Get In Touch</h3>
                <p className="mb-md">For inquiries, large groups, or private events, please reach out by phone or email.</p>
                <p>Phone: <a href="tel:+917207667827">+91 7207667827</a></p>
                <p>Email: <a href="mailto:manafood@gmail.com">manafood@gmail.com</a></p>
              </div>
              <div className="info-block mt-4">
                <p className="highlight">
                  Please note: We do not accept online reservations. Tables are seated on a first-come, first-served basis to emphasize spontaneous gatherings.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={200} className="contact-map">
            <iframe
              src="https://maps.google.com/maps?q=Janapriya%20Apartment,%20Hyderguda,%20Hyderabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen=""
              loading="lazy"
              title="MANA FOOD Location"
            ></iframe>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
