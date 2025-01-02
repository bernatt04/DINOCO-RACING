// pages/sponsorships.tsx

import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { motion } from 'framer-motion';

const Sponsorships: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // Handles form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handles form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can integrate an API to process the form
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Sponsorships - Dynoco Racing</title>
        <meta name="description" content="Join Dynoco Racing as a sponsor and take your brand to the next level." />
      </Head>
      <Header />
      <main className="mt-20">
        {/* Hero Section */}
        <section
          className="bg-cover bg-center h-96 flex items-center justify-center"
          style={{ backgroundImage: 'url(/images/sponsorship-hero.jpg)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white bg-black bg-opacity-50 p-8 rounded"
          >
            <h1 className="text-4xl font-bold mb-4">Become Our Sponsor</h1>
            <p className="text-lg mb-6">Associate your brand with Dynoco Racing and reach new heights.</p>
            <a href="#contact" className="bg-[#ff8049] hover:bg-orange-600 text-white px-6 py-3 rounded-full transition duration-300">
              Request Information
            </a>
          </motion.div>
        </section>

        {/* Sponsorship Levels */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Sponsorship Levels
            </motion.h2>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
              {/* Level 1: Platinum */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 flex-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Platinum</h3>
                <p className="text-gray-700 mb-4">$10,000+</p>
                <ul className="list-disc list-inside mb-6">
                  <li>Logo on the car and uniforms</li>
                  <li>Mentions on social media</li>
                  <li>Advertising at events</li>
                  <li>VIP access to races</li>
                </ul>
                <a href="#contact" className="bg-[#25b7f7] hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300">
                  Sponsor
                </a>
              </motion.div>

              {/* Level 2: Gold */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 flex-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Gold</h3>
                <p className="text-gray-700 mb-4">$5,000 - $9,999</p>
                <ul className="list-disc list-inside mb-6">
                  <li>Logo on the car</li>
                  <li>Mentions on social media</li>
                  <li>Advertising at events</li>
                </ul>
                <a href="#contact" className="bg-[#25b7f7] hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300">
                  Sponsor
                </a>
              </motion.div>

              {/* Level 3: Silver */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 flex-1"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Silver</h3>
                <p className="text-gray-700 mb-4">$2,000 - $4,999</p>
                <ul className="list-disc list-inside mb-6">
                  <li>Logo on the back of the car</li>
                  <li>Mentions on social media</li>
                </ul>
                <a href="#contact" className="bg-[#25b7f7] hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300">
                  Sponsor
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits for Sponsors */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Benefits for Our Sponsors
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Benefit 1 */}
              <motion.div
                className="flex flex-col items-center text-center"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img src="/icons/visibility.svg" alt="Visibility" className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2">High Visibility</h3>
                <p className="text-gray-600">Your brand will be present at all our activities and events.</p>
              </motion.div>

              {/* Benefit 2 */}
              <motion.div
                className="flex flex-col items-center text-center"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img src="/icons/networking.svg" alt="Networking" className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Networking Opportunities</h3>
                <p className="text-gray-600">Connect with other industry leaders and professionals.</p>
              </motion.div>

              {/* Benefit 3 */}
              <motion.div
                className="flex flex-col items-center text-center"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <img src="/icons/branding.svg" alt="Branding" className="w-16 h-16 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Brand Strengthening</h3>
                <p className="text-gray-600">Associate your brand with excellence and passion for racing.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              What Our Sponsors Say
            </motion.h2>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
              {/* Testimonial 1 */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 flex-1"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-700 mb-4">
                  "Sponsoring Dynoco Racing has been one of the best decisions for our brand. The visibility and team commitment are exceptional."
                </p>
                <h4 className="text-lg font-semibold">Juan Pérez</h4>
                <span className="text-gray-500">CEO of XYZ Company</span>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 flex-1"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-gray-700 mb-4">
                  "Collaborating with Dynoco Racing has allowed us to reach a wider audience and strengthen our market presence."
                </p>
                <h4 className="text-lg font-semibold">María López</h4>
                <span className="text-gray-500">Marketing Director at ABC Company</span>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 flex-1"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-gray-700 mb-4">"Come work with us."</p>
                <h4 className="text-lg font-semibold">Sergio Choví</h4>
                <span className="text-gray-500">Team Director</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Contact Us for More Information
            </motion.h2>
            <div className="max-w-lg mx-auto">
              {submitted ? (
                <motion.div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <strong className="font-bold">Thanks!</strong>
                  <span className="block sm:inline"> We have received your request and will be contacting you soon.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="you@domain.com"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Tell us how we can collaborate"
                      rows={5}
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="bg-[#ff8049] hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Partners / Logos Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Our Sponsors
            </motion.h2>
            <div className="flex flex-wrap justify-center items-center space-x-6 space-y-6">
              {/* Sponsor Logos */}
              <motion.img
                src="/logos/company1.png"
                alt="Company 1"
                className="h-16 object-contain"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.img
                src="/logos/company2.png"
                alt="Company 2"
                className="h-16 object-contain"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <motion.img
                src="/logos/company3.png"
                alt="Company 3"
                className="h-16 object-contain"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              <motion.img
                src="/logos/company4.png"
                alt="Company 4"
                className="h-16 object-contain"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              {/* Add more logos as needed */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Sponsorships;
