// src/HorizontalScroller.js

import React, { useRef, useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useTheme } from '@emotion/react';

const HorizontalScroller = ({ children }) => {
  const scrollerRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  const theme = useTheme();


  useEffect(() => {
    const handleResize = () => {
      if (scrollerRef.current) {
        setShowArrows(scrollerRef.current.scrollWidth > scrollerRef.current.clientWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction) => {
    if (scrollerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box display="flex" alignItems="center" position={"relative"}>
      <Box
        ref={scrollerRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for Chrome, Safari, and Opera
          },
        }}
      >
        {React.Children.map(children, (child, index) => (
          <Box
            key={index}
            sx={{
              minWidth: 230,
              minHeight: 130,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mx: 1,
              borderRadius: 1,
            }}
          >
            {child}
          </Box>
        ))}
      </Box>
      {showArrows && (
        <IconButton 
          onClick={() => scroll('right')} 
          sx={{
            borderRadius: "30px",
            background: "white",
            width: "50px",
            height: "50px",
            marginBottom: "30px",
            alignItems: "center",
            boxShadow: theme.customShadows.z1,
            position: "absolute", 
            color: "black",
            right: 0
          }}
        >
          <IoArrowForward />
        </IconButton>
      )}
      {showArrows && (
        <IconButton 
          onClick={() => scroll('left')}
          sx={{
            borderRadius: "30px",
            background: "white",
            width: "50px",
            height: "50px",
            marginBottom: "30px",
            alignItems: "center",
            boxShadow: theme.customShadows.z1,
            position: "absolute", 
            color: "black",
            left: 0
          }}
        >
          <IoArrowBack style={{color: "black"}}/>
        </IconButton>
      )}
    </Box>
  );
};

export default HorizontalScroller;
