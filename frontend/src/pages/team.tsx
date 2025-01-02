// pages/team.tsx

import React, { useState, useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaTimes } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

// Interface for team members
interface TeamMember {
  name: string;
  role: string;
  career: string;
  linkedin: string;
  image: string;
}

// Interface for sub-sections (if any)
interface SubSection {
  subSection: string;
  members: TeamMember[];
}

// Interface for team sections
interface TeamSection {
  section: string;
  subSections?: SubSection[];
  members?: TeamMember[];
}

// Data for team members
const teamSections: TeamSection[] = [
  {
    section: 'Finance Team',
    subSections: [
      {
        subSection: 'Sponsorships',
        members: [
          {
            name: 'Jose Gochon',
            role: 'Sponsorships',
            career: 'Responsible for managing and securing sponsorships for the team.',
            linkedin: 'https://www.linkedin.com/in/josegochon',
            image: '/images/team/jose_gochon.png',
          },
          {
            name: 'Federico Hernandez',
            role: 'Sponsorships',
            career: 'In charge of maintaining relationships with sponsors and strategic partners.',
            linkedin: 'https://www.linkedin.com/in/federicohernandez',
            image: '/images/team/federico_hernandez.png',
          },
        ],
      },
      {
        subSection: 'Engineer',
        members: [
          {
            name: 'Camden Outlaw',
            role: 'Engineer',
            career: 'Engineer specializing in financial and budget optimization.',
            linkedin: 'https://www.linkedin.com/in/camdenoutlaw',
            image: '/images/team/camden_outlaw.png',
          },
          {
            name: 'Yash Muppidi',
            role: 'Engineer',
            career: 'Responsible for financial engineering and cost analysis.',
            linkedin: 'https://www.linkedin.com/in/yashmuppidi',
            image: '/images/team/yash_muppidi.png',
          },
        ],
      },
    ],
  },
  {
    section: 'Media Team',
    members: [
      {
        name: 'Karina Knohr',
        role: 'Graphic Design',
        career: 'Graphic designer responsible for the team’s visual identity.',
        linkedin: 'https://www.linkedin.com/in/karinaknohr',
        image: '/images/team/karina_knohr.png',
      },
      {
        name: 'Vanessa Gomez',
        role: 'Media Manager',
        career: 'Manages the team’s social media and online presence.',
        linkedin: 'https://www.linkedin.com/in/vanessagomez',
        image: '/images/team/vanessa_gomez.png',
      },
      {
        name: 'Elina Shah',
        role: 'UI/UX Design',
        career: 'Responsible for interface design and user experience for the team’s platforms.',
        linkedin: 'https://www.linkedin.com/in/elina-shah',
        image: '/images/team/elina_shah.png',
      },
      {
        name: 'Elisa Gonzalez',
        role: 'Human Resources',
        career: 'Responsible for human resources management and team well-being.',
        linkedin: 'https://www.linkedin.com/in/elisa-gonzalez',
        image: '/images/team/elisa_gonzalez.png',
      },
      {
        name: 'Domenica Forno',
        role: 'Human Resources',
        career: 'In charge of recruitment and talent development within the team.',
        linkedin: 'https://www.linkedin.com/in/domenicaforno',
        image: '/images/team/domenica_forno.png',
      },
    ],
  },
  {
    section: 'Dynoco Board',
    members: [
      {
        name: 'Sergio Chovi',
        role: 'CEO',
        career: 'Chief Executive Officer overseeing the team’s vision and overall direction.',
        linkedin: 'https://www.linkedin.com/in/sergiochovi',
        image: '/images/team/sergio_chovi.png',
      },
      {
        name: 'Creighton Bennett',
        role: 'President',
        career: 'President responsible for supervising daily operations.',
        linkedin: 'https://www.linkedin.com/in/creighton-bennett',
        image: '/images/team/creighton_bennett.png',
      },
      {
        name: 'Kaden Jackson-Dittman',
        role: 'Vice President',
        career: 'Vice President in charge of team strategy and expansion.',
        linkedin: 'https://www.linkedin.com/in/kaden-jackson-dittman',
        image: '/images/team/kaden_jackson_dittman.png',
      },
      {
        name: 'Aaditya Nair',
        role: 'CIO',
        career: 'Chief Information Officer responsible for the team’s technological infrastructure.',
        linkedin: 'https://www.linkedin.com/in/aadityanair',
        image: '/images/team/aaditya_nair.png',
      },
      {
        name: 'Cale Bennett',
        role: 'Treasurer',
        career: 'Treasurer responsible for financial and budget management.',
        linkedin: 'https://www.linkedin.com/in/cale-bennett',
        image: '/images/team/cale_bennett.png',
      },
    ],
  },
  {
    section: 'Technical Team',
    subSections: [
      {
        subSection: 'Group 1',
        members: [
          {
            name: 'Athary Bhatter',
            role: 'Lead Engineer',
            career: 'Lead engineer responsible for the team’s technical development and maintenance.',
            linkedin: 'https://www.linkedin.com/in/atharybhatter',
            image: '/images/team/athary_bhatter.png',
          },
          {
            name: 'Grant Sims',
            role: 'Flight Specialist',
            career: 'Flight specialist responsible for optimizing trajectories and performance.',
            linkedin: 'https://www.linkedin.com/in/grantsims',
            image: '/images/team/grant_sims.png',
          },
          {
            name: 'Yash Mishra',
            role: 'Research & Development',
            career: 'Responsible for researching and developing new technologies for the team.',
            linkedin: 'https://www.linkedin.com/in/yashmishra',
            image: '/images/team/yash_mishra.png',
          },
          {
            name: 'Massimo Lapina',
            role: 'Research & Development',
            career: 'Responsible for innovation and continuous improvement of the team’s technical systems.',
            linkedin: 'https://www.linkedin.com/in/massimolapina',
            image: '/images/team/massimo_lapina.png',
          },
        ],
      },
      {
        subSection: 'Group 2',
        members: [
          {
            name: 'Javier Aldana',
            role: 'Engineer',
            career: 'Engineer responsible for implementing and maintaining technical systems.',
            linkedin: 'https://www.linkedin.com/in/javieraldana',
            image: '/images/team/javier_aldana.png',
          },
          {
            name: 'Stathis Kokkevis',
            role: 'Engineer',
            career: 'Specialist in electronic systems and telemetry for the team.',
            linkedin: 'https://www.linkedin.com/in/stathiskokkevis',
            image: '/images/team/stathis_kokkevis.png',
          },
          {
            name: 'Jake Schroeder',
            role: 'Engineer',
            career: 'Responsible for integrating new technical components into the vehicles.',
            linkedin: 'https://www.linkedin.com/in/jakeschroeder',
            image: '/images/team/jake_schroeder.png',
          },
          {
            name: 'Soumil Verma',
            role: 'Engineer',
            career: 'Engineer responsible for optimizing aerodynamics and performance.',
            linkedin: 'https://www.linkedin.com/in/soumilverma',
            image: '/images/team/soumil_verma.png',
          },
        ],
      },
    ],
  },
  // You can add more sections or sub-sections as needed
];

const Team: React.FC = () => {
  // Initialize activeSection with the first element of teamSections
  const [activeSection, setActiveSection] = useState<string>(teamSections[0].section);

  // Initialize activeSubSection with the first sub-section if it exists
  const [activeSubSection, setActiveSubSection] = useState<string | null>(
    teamSections[0].subSections ? teamSections[0].subSections![0].subSection : null
  );

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // useEffect to update activeSubSection when activeSection changes
  useEffect(() => {
    const current = teamSections.find(section => section.section === activeSection);
    if (current && current.subSections && current.subSections.length > 0) {
      setActiveSubSection(current.subSections[0].subSection); // Automatically select the first sub-section
    } else {
      setActiveSubSection(null); // No sub-sections
    }
  }, [activeSection]); // Dependency on activeSection

  // Find the active section, ensuring it's always defined
  const currentSection = teamSections.find(section => section.section === activeSection) || teamSections[0];

  // Get the sub-sections if they exist
  const subSections = currentSection.subSections;

  // Filter members based on the active section and sub-section
  const filteredMembers = subSections
    ? currentSection.subSections
        ?.find(sub => sub.subSection === activeSubSection)
        ?.members || []
    : currentSection.members || [];

  return (
    <div className="relative min-h-screen bg-sky-400 text-white overflow-hidden">
      <Header />

      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-500 via-orange-400 to-sky-500 opacity-30"></div>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-12 px-4 md:px-8 lg:px-16">
        {/* Title Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 font-sans">Our Team</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Meet the passionate individuals driving our team towards victory.
          </p>
        </section>

        {/* Main Section Tabs */}
        <section className="mb-16">
          <div className="flex flex-wrap justify-center space-x-2 mb-8">
            {teamSections.map(section => (
              <motion.button
                key={section.section}
                onClick={() => {
                  setActiveSection(section.section);
                  // Reset sub-section when changing section (removed)
                  // Now, useEffect will handle automatic selection
                }}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-colors mb-2 sm:mb-0 ${
                  activeSection === section.section
                    ? 'bg-orange-500 text-white'
                    : 'bg-white bg-opacity-20 text-white hover:bg-orange-400 hover:bg-opacity-30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.section}
              </motion.button>
            ))}
          </div>

          {/* Sub-Section Tabs (if they exist) */}
          {subSections && (
            <div className="flex flex-wrap justify-center space-x-2 mb-12">
              {subSections.map(sub => (
                <motion.button
                  key={sub.subSection}
                  onClick={() => setActiveSubSection(sub.subSection)}
                  className={`px-4 py-1 rounded-full text-base font-medium transition-colors mb-2 sm:mb-0 ${
                    activeSubSection === sub.subSection
                      ? 'bg-orange-400 text-white'
                      : 'bg-white bg-opacity-10 text-white hover:bg-orange-300 hover:bg-opacity-20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {sub.subSection}
                </motion.button>
              ))}
            </div>
          )}

          {/* Filtered Members List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSection}-${activeSubSection || 'no-sub'}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5, type: 'spring', stiffness: 100 }}
                >
                  <div className="relative">
                    {/* Member Image */}
                    <Image
                      src={member.image}
                      alt={`${member.name} Photo`}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    {/* LinkedIn Link */}
                    <motion.a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 bg-orange-500 p-3 rounded-full shadow-md"
                      whileHover={{ scale: 1.3 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      onClick={(e) => e.stopPropagation()} // Prevent opening the modal when clicking on LinkedIn
                    >
                      <FaLinkedin className="text-white w-5 h-5" />
                    </motion.a>
                  </div>
                  {/* Member Information */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 font-sans">{member.name}</h3>
                    <p className="text-orange-300 mb-1 font-medium">{member.role}</p>
                    <p className="text-white text-sm">{member.career}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Member Information Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
                onClick={() => setSelectedMember(null)}
              >
                <FaTimes size={24} />
              </button>
              <Image
                src={selectedMember.image}
                alt={`${selectedMember.name} Photo`}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedMember.name}</h2>
                <p className="text-lg text-orange-500 mb-2">{selectedMember.role}</p>
                <p className="text-gray-700 mb-4">{selectedMember.career}</p>
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <FaLinkedin className="mr-2" /> View LinkedIn Profile
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;
