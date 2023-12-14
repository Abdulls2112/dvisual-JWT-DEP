import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section
        style={{
          backgroundColor: '#333',
          width: '100%',
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: '40px',
            border: '1px solid #555',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
            backgroundColor: '#1A1A1A',
            color: '#fff',
          }}
        >
          <h1 style={{ fontSize: '3em', marginBottom: '20px', color: '#D7A881' }}>
            Welcome to DVisual
          </h1>
          <p style={{ fontSize: '1.2em', color: '#aaa', marginBottom: '30px' }}>
            A data visualization app that helps you explore and analyze sensor
            consumptions with ease.
          </p>
          <NavLink
            to="/register"
            className="btn"
            style={{
              padding: '12px 24px',
              fontSize: '1.2em',
              textDecoration: 'none',
              borderRadius: '5px',
              backgroundColor: '#D7A881',
              color: '#333',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
              transition: 'background-color 0.3s',
            }}
          >
            Register
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Home;
