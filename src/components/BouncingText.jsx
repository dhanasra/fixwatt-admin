import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';

const TypingContainer = styled('div')`
  display: inline-block;
`;

const TypingText = ({ text, speed, delay }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typeText = () => {
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + text[currentIndex-1]);
        currentIndex++;
        if (currentIndex === text.length) {
          clearInterval(interval);
          setIsTyping(false); // Stop typing when done
        }
      }, speed);
    };

    if (isTyping) {
      typeText();
    } else {
      const restartTimeout = setTimeout(() => {
        setDisplayedText(''); // Clear the text
        setIsTyping(true); // Restart the typing
      }, delay);
      return () => clearTimeout(restartTimeout); // Cleanup
    }
    
    return () => clearInterval(typeText); // Cleanup on unmount

  }, [isTyping, text, speed, delay]);

  return <TypingContainer>{displayedText}</TypingContainer>;
};

const TypingAnimation = ({ text }) => {
  return (
    <Typography variant="h3" >
      <TypingText text={` ${text} `} speed={100} delay={2000} />
    </Typography>
  );
};

export default TypingAnimation;
