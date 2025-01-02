// pages/join.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Join: React.FC = () => {
  // Estados para manejar los inputs del formulario
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    major: '',
    grade: '',
    experience: '',
    experienceDetails: '',
    successfulEvent: '',
    bosoExperience: '',
    additionalInfo: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Manejar cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiar error al cambiar
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Validación básica del formulario
  const validate = () => {
    let tempErrors: { [key: string]: string } = {};
    if (!formData.fullName) tempErrors.fullName = 'Full Name is required.';
    if (!formData.email) {
      tempErrors.email = 'Email Address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) tempErrors.email = 'Email is not valid.';
    }
    if (!formData.major) tempErrors.major = 'Major is required.';
    if (!formData.grade) tempErrors.grade = 'Current Grade is required.';
    if (!formData.experience) tempErrors.experience = 'Experience level is required.';
    if (formData.experience !== 'None' && !formData.experienceDetails)
      tempErrors.experienceDetails = 'Please describe your experience.';
    if (!formData.successfulEvent)
      tempErrors.successfulEvent = 'This field is required.';
    if (!formData.bosoExperience)
      tempErrors.bosoExperience = 'This field is required.';
    if (!formData.additionalInfo)
      tempErrors.additionalInfo = 'This field is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Aquí puedes agregar la lógica para enviar los datos a tu backend
      console.log(formData);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fondo Animado */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-animated"></div>

      <Header />

      {/* Contenido Principal */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Título y Descripción */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl text-center mb-12 text-gray-800"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 font-sans">
            Dynoco Racing Event Planning Interest Form
          </h1>
          <p className="text-lg sm:text-xl">
            Thank you for your interest in joining our team. At Dynoco Racing, we thrive on creativity and commitment.
            This form is your first step towards crafting unforgettable events with us. Please fill out your details
            and share your experiences. We look forward to possibly having you on board!
          </p>
        </motion.div>

        {/* Formulario */}
        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Full Name */}
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="fullName" className="block text-sm font-medium mb-2 text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </motion.div>

            {/* Email Address */}
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </motion.div>

            {/* Major */}
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="major" className="block text-sm font-medium mb-2 text-gray-700">
                Major (Include any minors or certificates)
              </label>
              <input
                type="text"
                name="major"
                id="major"
                value={formData.major}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.major ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300`}
                placeholder="Enter your major"
              />
              {errors.major && (
                <p className="text-red-500 text-xs mt-1">{errors.major}</p>
              )}
            </motion.div>

            {/* Current Grade */}
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="grade" className="block text-sm font-medium mb-2 text-gray-700">
                Current Grade
              </label>
              <select
                name="grade"
                id="grade"
                value={formData.grade}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.grade ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300`}
              >
                <option value="">Select your current grade</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate Student">Graduate Student</option>
              </select>
              {errors.grade && (
                <p className="text-red-500 text-xs mt-1">{errors.grade}</p>
              )}
            </motion.div>

            {/* Experience in Event Planning */}
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="experience" className="block text-sm font-medium mb-2 text-gray-700">
                Experience in Event Planning
              </label>
              <select
                name="experience"
                id="experience"
                value={formData.experience}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.experience ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300`}
              >
                <option value="">Select your experience level</option>
                <option value="A lot">A lot</option>
                <option value="Some">Some</option>
                <option value="Very Little">Very Little</option>
                <option value="None">None</option>
              </select>
              {errors.experience && (
                <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
              )}
            </motion.div>

            {/* If Experience is not None, show additional details */}
            {formData.experience !== 'None' && (
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <label htmlFor="experienceDetails" className="block text-sm font-medium mb-2 text-gray-700">
                  If you have, briefly explain your experience as an event planner.
                </label>
                <textarea
                  name="experienceDetails"
                  id="experienceDetails"
                  value={formData.experienceDetails}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${
                    errors.experienceDetails ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300`}
                  placeholder="Describe your event planning experience"
                  rows={4}
                ></textarea>
                {errors.experienceDetails && (
                  <p className="text-red-500 text-xs mt-1">{errors.experienceDetails}</p>
                )}
              </motion.div>
            )}

            {/* What makes a successful event */}
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="successfulEvent" className="block text-sm font-medium mb-2 text-gray-700">
                What makes a successful event from your perspective?
              </label>
              <textarea
                name="successfulEvent"
                id="successfulEvent"
                value={formData.successfulEvent}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.successfulEvent ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300`}
                placeholder="Share your thoughts on what makes an event successful"
                rows={3}
              ></textarea>
              {errors.successfulEvent && (
                <p className="text-red-500 text-xs mt-1">{errors.successfulEvent}</p>
              )}
            </motion.div>

            {/* Experience with BOSO at Purdue */}
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Do you have any experience dealing with BOSO at Purdue?
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="bosoExperience"
                    value="Yes"
                    checked={formData.bosoExperience === 'Yes'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-orange-500"
                    required
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="bosoExperience"
                    value="No"
                    checked={formData.bosoExperience === 'No'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-orange-500"
                    required
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
              {errors.bosoExperience && (
                <p className="text-red-500 text-xs mt-1">{errors.bosoExperience}</p>
              )}
            </motion.div>

            {/* Additional Information */}
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2 text-gray-700">
                Is there anything else you would like to share about your qualifications for this position?
              </label>
              <textarea
                name="additionalInfo"
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors.additionalInfo ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-300`}
                placeholder="Share any additional information"
                rows={3}
              ></textarea>
              {errors.additionalInfo && (
                <p className="text-red-500 text-xs mt-1">{errors.additionalInfo}</p>
              )}
            </motion.div>

            {/* Botón de Envío */}
            <motion.div
              className="flex justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="submit"
                className="flex items-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
              >
                <FaPaperPlane className="mr-2" /> Submit
              </button>
            </motion.div>
          </motion.form>
        ) : (
          // Mensaje de Confirmación
          <motion.div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-sans text-gray-800">Thank You!</h2>
            <p className="text-lg sm:text-xl text-gray-700">
              Thank you for submitting your interest in joining Dynoco Racing. We will review your application and get back to you soon.
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Estilos para el fondo animado */}
      <style jsx>{`
        .bg-gradient-animated {
          background: linear-gradient(-45deg, #00aaff, #FF681F, #00aaff, #FF681F);
          background-size: 400% 400%;
          animation: gradientAnimation 15s ease infinite;
          z-index: -1;
        }

        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Opcional: Agregar efectos sutiles al fondo */
        .bg-gradient-animated::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 200%;
          height: 200%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transform: translate(-50%, -50%) rotate(0deg);
          animation: rotateBackground 30s linear infinite;
          z-index: -1;
        }

        @keyframes rotateBackground {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Join;
