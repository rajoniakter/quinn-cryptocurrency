import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  Heading,
  Text
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const AccountOverview = ({userAccount,userAccountTokenBalance}) => {
  
  const inETH = (n) => {
    return n * 0.001
  }
  const inBDT = (n) =>{
    return 178768 * n
  }
 
  return (
    <Container width={'full'}>


      <Grid mt={8} gap={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">

        <Box p={4} borderWidth={1} borderRadius="lg">
          <Heading size="md">Account Overview</Heading>
          <Text mt={4} >Account Address: {userAccount}</Text>
         
          <Text mt={4} >Your Available Quinn: {userAccountTokenBalance} QNN</Text>

          <Text mt={4} >Your Quinn Value in Ethereum : {inETH(userAccountTokenBalance)} ETH</Text>
          <Text mt={4} >Your Quinn Value in BDT :  {inBDT(inETH(userAccountTokenBalance))} &#2547;</Text>

          <Center mt={4}>
          <Link to='/quinn/buy' >
              <Button              
                height={'5'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                  <Text fontSize={'smaller'} align={'center'}>
                    Buy More QUINN
                  </Text>
              </Button>
            </Link>
            </Center>
          
          

        </Box>
        
      </Grid>

      {/* Other sections go here */}
    </Container>
  );
};

export default AccountOverview;
