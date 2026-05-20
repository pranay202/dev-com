import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <Head>
        <title>DevCommerce | A Better Way to Sell Your Code</title>
        <meta name="description" content="Request a free listing of your software code for better reach. Discover high-quality products built by developers, for developers." />
      </Head>

      <div className="container-fluid">
        <main className="hero-section">
          <div className="hero-content">
            <Link href="/products" className="hero-badge">
              <span className="hero-badge-dot"></span>
              Explore Products
            </Link>
            
            <h1 className="hero-title">
              <span>A better way to</span>
              <span className="hero-title-gradient">sell your code</span>
            </h1>
            
            <p className="hero-subtitle">
              Reach more customers and grow your developer business. Request a free showcase of your code and software assets today!
            </p>
            
            <div className="hero-form-wrapper">
              <form
                action="https://api.web3forms.com/submit"
                method="POST"
              >
                <input
                  type="hidden"
                  name="access_key"
                  value="846f30ee-6a6e-4e69-968d-ec744aba982e"
                />
                
                <div className="hero-form">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email address"
                    className="form-control"
                  />
                  <button
                    type="submit"
                    className="hero-form-btn"
                  >
                    Request a Sell
                  </button>
                </div>
                
                <div className="hero-form-footer">
                  Start selling your code with 1 free trial. By submitting, you agree to our{' '}
                  <a href="#">Terms of Service</a>.
                </div>
              </form>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-glow-blob"></div>
            <div className="hero-image-container">
              <img
                className="hero-image"
                src="/devcommerce_hero_mockup.png"
                alt="DevCommerce Developer Dashboard Mockup"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
