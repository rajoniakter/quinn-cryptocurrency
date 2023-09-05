import { Box, Button } from '@chakra-ui/react';
import React from 'react';

const BackToTop = () => {
  
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box py={10}>
      <Box mx="auto" textAlign="center" py={6}>
        <Button
          border="1px"
          borderColor="#DDDDDD"
          bg="#FAFAFA"
          rounded="xl"
          color="gray"
          py={4}
          px={6}
          onClick={handleClick}
        >
          Back to top
        </Button>
      </Box>
    </Box>
  );
}


export default BackToTop