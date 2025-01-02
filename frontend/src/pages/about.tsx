// pages/about.tsx

import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  return (
    <>
      <Head>
        <title>About Us - Dynoco Racing</title>
        <meta name="description" content="Learn more about Dynoco Racing, a kart racing team built by freshman students at Purdue University." />
      </Head>
      <Header />
      <main className="mt-20">
        {/* Hero Section */}
        <section className="bg-cover bg-center h-96 flex items-center justify-center" style={{ backgroundImage: 'url(/images/about-hero.jpg)' }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white bg-black bg-opacity-50 p-8 rounded"
          >
            <h1 className="text-4xl font-bold mb-4">About Dynoco Racing</h1>
            <p className="text-lg">A passionate kart racing team at Purdue University.</p>
          </motion.div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.h2>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-700 text-lg">
                  Dynoco Racing was founded in [Year] by a group of enthusiastic freshman students at Purdue University. What started as a passion project quickly evolved into a dedicated kart racing team committed to excellence both on and off the track.
                </p>
                <p className="text-gray-700 text-lg mt-4">
                  Our team combines the fresh perspectives of new students with the guidance of experienced mentors, fostering an environment of innovation, teamwork, and relentless pursuit of speed.
                </p>
              </motion.div>
              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img src="/images/team-startup.jpg" alt="Team Startup" className="rounded-lg shadow-lg w-full h-auto" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Mission & Vision
            </motion.h2>
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
              {/* Mission */}
              <motion.div
                className="md:w-1/2 p-6 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To build a competitive kart racing team that fosters innovation, teamwork, and personal growth among Purdue University students.
                </p>
              </motion.div>
              {/* Vision */}
              <motion.div
                className="md:w-1/2 p-6 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To become a leading student-run racing team, inspiring future engineers and motorsport enthusiasts through excellence in design, performance, and community engagement.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Meet the Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Meet the Team
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src="/team/john-doe.jpg" alt="John Doe" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-600">Team Leader</p>
              </motion.div>
              {/* Team Member 2 */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img src="/team/jane-smith.jpg" alt="Jane Smith" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-semibold">Jane Smith</h3>
                <p className="text-gray-600">Lead Engineer</p>
              </motion.div>
              {/* Team Member 3 */}
              <motion.div
                className="bg-white rounded-lg shadow-lg p-6 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <img src="/team/michael-brown.jpg" alt="Michael Brown" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
                <h3 className="text-xl font-semibold">Michael Brown</h3>
                <p className="text-gray-600">Marketing Director</p>
              </motion.div>
              {/* Add more team members as needed */}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Gallery
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.img
                src="/gallery/race1.jpg"
                alt="Race 1"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.img
                src="/gallery/race2.jpg"
                alt="Race 2"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.img
                src="/gallery/race3.jpg"
                alt="Race 3"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              {/* Add more images as needed */}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Join Us on Our Journey
            </motion.h2>
            <p className="text-gray-700 mb-8">
              Whether you're a student looking to get involved, a sponsor interested in supporting our team, or a fan eager to follow our progress, there's a place for you in the Dynoco Racing community.
            </p>
            <a href="/join" className="bg-[#ff8049] hover:bg-orange-600 text-white px-6 py-3 rounded-full transition duration-300">
              Get Involved
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default AboutUs;
