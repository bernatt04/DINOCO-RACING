import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Scene from '../components/Scene';
import Hero from '../components/Hero'
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Dynoco Racing</title>
        <meta name="description" content="Página principal de Dinoco Racing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />

      <main className="pt-20">
        <Hero />
        <Scene />
        <Footer/>
      </main>
    </>
  );
};

export default HomePage;
