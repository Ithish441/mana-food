import React from 'react';
import FadeIn from '../components/FadeIn';
import PageTransition from '../components/PageTransition';
import AnimatedText from '../components/AnimatedText';
import PDFMenu from '../components/PDFMenu';

const Menu = () => {
  return (
    <PageTransition className="menu-page bg-warm-white">
      <section className="page-header text-center bg-sand">
        <div className="container">
          <AnimatedText text="Our Menu" delay={100} el="h1" />
          <FadeIn delay={500}>
            <p className="subtitle">Driven by seasons, inspired by earth.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ padding: '80px 0 120px', background: 'var(--color-warm-white)' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <FadeIn delay={200}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #f0ece4 0%, #e8e2d6 100%)',
              borderRadius: '24px',
              padding: '60px 40px',
              boxShadow: '0 8px 60px rgba(0,0,0,0.1)',
              overflow: 'hidden',
            }}>
              <PDFMenu pdfUrl="/Menu.pdf" />
            </div>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
};

export default Menu;
