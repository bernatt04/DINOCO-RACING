// components/TypewriterText.tsx

import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // Velocidad en milisegundos por carácter
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    setDisplayText('');
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + text.charAt(currentIndex));
      currentIndex++;
      if (currentIndex >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <p className="text-white text-lg">{displayText}</p>;
};

export default TypewriterText;
