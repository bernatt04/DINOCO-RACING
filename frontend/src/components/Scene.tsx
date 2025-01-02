// components/Scene.tsx

import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import * as THREE from 'three';
import { animated, useSpring } from '@react-spring/three';
import {
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaSyncAlt,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import TypewriterText from './TypewriterText'; // Ensure this path is correct

// Dynamically import the Model component with SSR disabled
const Model = dynamic(() => import('./Model'), { ssr: false });

// Define allowed position types
type PositionType = 'left' | 'right' | 'front' | 'back';

// Interface for Info Overlay
interface InfoOverlayProps {
  visible: boolean;
  position: PositionType;
  content: string;
}

// Styled Component for the Info Overlay
const StyledInfoOverlay = styled(motion.div)<{ position: PositionType }>`
  position: absolute;
  ${(props) =>
    props.position === 'front'
      ? 'top: 10%; left: 50%; transform: translateX(-50%);'
      : props.position === 'back'
      ? 'bottom: 10%; left: 50%; transform: translateX(-50%);'
      : props.position === 'left'
      ? 'left: 10%; top: 50%; transform: translateY(-50%);'
      : 'right: 10%; top: 50%; transform: translateY(-50%);'}
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 15px;
  border-radius: 8px;
  max-width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InfoOverlay: React.FC<InfoOverlayProps> = ({
  visible,
  position,
  content,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <StyledInfoOverlay
          position={position}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-blue-800">{content}</p>
        </StyledInfoOverlay>
      )}
    </AnimatePresence>
  );
};

/**
 * RotatableModel Component
 * Handles smooth rotation of the 3D model using react-spring
 */
interface RotatableModelProps {
  targetRotation: THREE.Euler;
}

const RotatableModel: React.FC<RotatableModelProps> = ({ targetRotation }) => {
  const modelRef = useRef<THREE.Group>(null);

  // Use react-spring for smooth rotation transitions on each axis
  const props = useSpring({
    rotationX: targetRotation.x,
    rotationY: targetRotation.y,
    rotationZ: targetRotation.z,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  return (
    <animated.group
      ref={modelRef}
      rotation-x={props.rotationX}
      rotation-y={props.rotationY}
      rotation-z={props.rotationZ}
      position={[0, 0, 0]}
    >
      <Model />
    </animated.group>
  );
};

/**
 * Styled Component for the Model Container with Circular Gradient
 */
const ModelContainer = styled.div`
  position: relative;
  background: radial-gradient(circle at center, #1e3a8a, #60a5fa);
  border-radius: 2rem; /* Equivalent to rounded-3xl */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 40rem; /* Make it reasonably wide for desktops */
  padding: 1.5rem; /* Equivalent to p-6 */
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: 5px solid black; /* Thick black outline */

  /* By default (on mobile), let the height adapt to content.
     On medium screens and above, enforce a more controlled height. */
  @media (min-width: 768px) {
    height: 80%;
  }
`;

/**
 * Styled Component for the Controller Bar
 */
const ControllerBar = styled.div`
  position: absolute;
  /* Center the controls horizontally */
  left: 50%;
  bottom: 1.5rem; /* Equivalent to bottom-6 */
  transform: translateX(-50%);
  display: flex;
  gap: 1rem; /* Equivalent to space-x-4 */
  background-color: rgba(211, 211, 211, 0.8); /* Light gray w/ transparency */
  padding: 0.75rem 1.5rem;
  border-radius: 9999px; /* Fully rounded */
  backdrop-filter: blur(5px);
`;

const Scene: React.FC = () => {
  // Define target rotations for different views
  const [targetRotation, setTargetRotation] = useState<THREE.Euler>(
    new THREE.Euler(0, 0, 0)
  );

  // State to keep track of the current rotation for info display
  const [currentRotation, setCurrentRotation] = useState<THREE.Euler>(
    new THREE.Euler(0, 0, 0)
  );

  // Update currentRotation when targetRotation changes
  useEffect(() => {
    setCurrentRotation(targetRotation);
  }, [targetRotation]);

  // Handler functions for rotation controls with 90 degrees (π/2 radians)
  const rotateLeft = () => {
    setTargetRotation(
      (prev) => new THREE.Euler(prev.x, prev.y + Math.PI / 2, prev.z)
    );
  };

  const rotateRight = () => {
    setTargetRotation(
      (prev) => new THREE.Euler(prev.x, prev.y - Math.PI / 2, prev.z)
    );
  };

  const rotateUp = () => {
    setTargetRotation(
      (prev) => new THREE.Euler(prev.x + Math.PI / 2, prev.y, prev.z)
    );
  };

  const rotateDown = () => {
    setTargetRotation(
      (prev) => new THREE.Euler(prev.x - Math.PI / 2, prev.y, prev.z)
    );
  };

  const resetRotation = () => {
    setTargetRotation(new THREE.Euler(0, 0, 0));
  };

  // Function to determine what information to display based on rotation
  const getInfo = (): { visible: boolean; position: PositionType; content: string } => {
    const yRotation = currentRotation.y % (2 * Math.PI);
    const tolerance = Math.PI / 8; // 22.5 degrees

    if (yRotation > -tolerance && yRotation < tolerance) {
      return {
        visible: true,
        position: 'front',
        content: 'Front View: Check out the sleek headlights and grille.',
      };
    } else if (
      yRotation > Math.PI / 2 - tolerance &&
      yRotation < Math.PI / 2 + tolerance
    ) {
      return {
        visible: true,
        position: 'right',
        content:
          'Right Side: Observe the advanced tire design and side mirrors.',
      };
    } else if (
      yRotation > -Math.PI / 2 - tolerance &&
      yRotation < -Math.PI / 2 + tolerance
    ) {
      return {
        visible: true,
        position: 'left',
        content:
          'Left Side: Explore the durable tires and elegant side panels.',
      };
    } else if (
      yRotation > Math.PI - tolerance ||
      yRotation < -Math.PI + tolerance
    ) {
      return {
        visible: true,
        position: 'back',
        content:
          'Back View: Discover the powerful exhaust system and trunk space.',
      };
    } else {
      return { visible: false, position: 'front', content: '' };
    }
  };

  const info = getInfo();

  // Keyboard controls for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') rotateLeft();
      if (e.key === 'ArrowRight') rotateRight();
      if (e.key === 'ArrowUp') rotateUp();
      if (e.key === 'ArrowDown') rotateDown();
      if (e.key === 'r' || e.key === 'R') resetRotation();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-[#01437d]">
      {/* Left Side: 3D Model and Controls */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <ModelContainer>
          {/* 3D Model Canvas */}
          <Canvas
            className="w-full h-[50vh] md:h-full" /* Make Canvas responsive */
            camera={{ position: [0, 2, 5], fov: 60 }}
            gl={{ alpha: true, antialias: true }}
          >
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />

            {/* Rotatable 3D Model */}
            <RotatableModel targetRotation={targetRotation} />
          </Canvas>

          {/* Rotation Controls */}
          <ControllerBar>
            {/* Rotate Up */}
            <button
              onClick={rotateUp}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110 focus:outline-none"
              aria-label="Rotate Up"
            >
              <FaArrowUp size={16} />
            </button>

            {/* Rotate Left */}
            <button
              onClick={rotateLeft}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110 focus:outline-none"
              aria-label="Rotate Left"
            >
              <FaArrowLeft size={16} />
            </button>

            {/* Reset Rotation */}
            <button
              onClick={resetRotation}
              className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110 focus:outline-none"
              aria-label="Reset Rotation"
            >
              <FaSyncAlt size={16} />
            </button>

            {/* Rotate Right */}
            <button
              onClick={rotateRight}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110 focus:outline-none"
              aria-label="Rotate Right"
            >
              <FaArrowRight size={16} />
            </button>

            {/* Rotate Down */}
            <button
              onClick={rotateDown}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110 focus:outline-none"
              aria-label="Rotate Down"
            >
              <FaArrowDown size={16} />
            </button>
          </ControllerBar>
        </ModelContainer>
      </div>

      {/* Right Side: Information */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 h-auto">
        <div className="bg-blue-100 rounded-3xl shadow-2xl w-full h-auto max-w-xl p-6 flex items-center justify-center">
          {/* Typewriter Text for Info */}
          <TypewriterText
            text={
              info.visible
                ? info.content
                : 'Use the arrows to rotate the car and discover different views!'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Scene;
