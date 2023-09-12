import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  Heading,
  Link,
  Text
} from '@chakra-ui/react';
import React from 'react';

const QuinnOverview = ({coinName,coinSymbol,coinTotalSupply,coinsSold,tokenPrice,coinAvailable,tokenContractAddress,ethPriceUsd}) => {
  return (
    <Container width={'full'}>
      
      <Grid mt={8} gap={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">

        <Box p={4} borderWidth={1} borderRadius="lg">
          <Heading size="md">Quinn Overview</Heading>
          <Text mt={4} >Coin Name: {coinName}</Text>
          <Text mt={4} >Coin Symbol: {coinSymbol}</Text>
          <Text mt={4} >Coin Current Price: {tokenPrice} ETH</Text>
          <Text mt={4} >Per Quinn value in BDT: {ethPriceUsd * 0.001 * 109} &#2547;</Text>
          <Text mt={4} >Coin Total Supply: {coinTotalSupply}</Text>
          <Text mt={4} >Currently Quinn Available: {coinAvailable}</Text>
          <Text mt={4} >Coins Sold: {coinsSold}</Text>
          <Center>
          <Link href={`https://sepolia.etherscan.io/token/${tokenContractAddress}`}target='_blank' >
              <Button              
                height={'5'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                  <Text fontSize={'smaller'} align={'center'}>
                    View on Etherscan
                  </Text>
              </Button>
            </Link>
            </Center>
        </Box>
 
      </Grid>


    </Container>
  );
};

export default QuinnOverview;
