import { Box, Center, Img, Link, SimpleGrid, Spacer, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import logo from './../assets/quinn-logo.png';

const AboutUs = ({isNotSmallerScreen}) => {
  return (
  
    
    <Box p={10} mt={20} width={isNotSmallerScreen ? "60%" : "100%"} >
    <Spacer></Spacer>



    <Text fontSize="2xl" fontWeight="bold" align={'center'} color={'cyan.500'} >
              Who Are We?
    </Text>

    <Stack columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
      <Box>
        <img src={logo} alt="Team" width="50%" m={'auto'} />
      </Box>        
      <Box>
        <Img src={logo} alt="Team" width="50%"  m={'auto'}/>
      </Box>
      </SimpleGrid>

      <Center>
        <Box>
          <Stack spacing={4} align="start">

            <Text>
              We are a dynamic duo consisting of 
              <Link href="https://www.linkedin.com/in/mizanurrahman/" isExternal color={'purple.500'} > Md Mizanur Rahman </Link>

                and 

              <Link href="https://www.linkedin.com/in/rajoniakter/" isExternal color={'purple.500'} > Mst. Rajoni Akter</Link>
                
                . As passionate students of Stamford University Bangladesh, both pursuing degrees in Computer Science and Engineering, we share a vision to pioneer change and innovation.
            </Text>
            <Text>
              Our motivation is to craft the <Link href="#" isExternal color={'purple.500'} > First Cryptocurrency Coin</Link>  representing both our beloved country, Bangladesh, and our esteemed university. With determination and a drive for meaningful impact, we embarked on this journey to contribute to the world of cryptocurrencies and blockchain technology.
            </Text>
          </Stack>
        </Box>
      </Center>
    </Stack>

  </Box>
  
  )
}

export default AboutUs