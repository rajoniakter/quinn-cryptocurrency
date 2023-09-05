import { Box, Progress, SimpleGrid, Stack, Stat, StatHelpText, StatLabel, StatNumber, Text, chakra } from '@chakra-ui/react';
import React from 'react';

const CoinDetails = ({tokenPrice,tokenContractAddress,tokenSaleContractAddress,userAccount,coinsSold,coinAvailable}) => {

    const dates = () => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric' };
        const date = new Date().toLocaleDateString('en-US',options)
    
        return date;
      }


  return (
    <Stack>
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <Text color="white" fontSize="xl" fontWeight="semibold">
              {coinsSold}/{coinAvailable} Quinn sold
      </Text>
      <Progress
          colorScheme={"pink"}
          hasStripe
          value={(coinsSold / coinAvailable ) * 100}
      />
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
      >
        Transparency at Heart 💜 , Unraveling QUINN's Journey 🏯
      </chakra.h1>

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 5, lg: 8 }}>
      <Stat
        p="2"
        rounded={"lg"}
        px={{ base: 4, md: 8 }}
        py={"5"}
        shadow={"xl"}
        border={"1px solid"}
      >
        <StatLabel>QUINN'S PRICE:</StatLabel>
        <StatNumber>{tokenPrice} ETH</StatNumber>
        <StatHelpText>{dates()}</StatHelpText>
      </Stat>

      <Stat
        p="2"
        rounded={"lg"}
        px={{ base: 4, md: 8 }}
        py={"5"}
        shadow={"xl"}
        border={"1px solid"}
      >
        <StatLabel>Quinn Available:</StatLabel>
        <StatNumber mt={4}>
          {coinAvailable} QNN          
        </StatNumber>
      </Stat>


      <Stat
        p="2"
        rounded={"lg"}
        px={{ base: 4, md: 8 }}
        py={"5"}
        shadow={"xl"}
        border={"1px solid"}
      >
        <StatLabel>Token contract address:</StatLabel>
        <StatNumber fontSize={"medium"}>
          {tokenContractAddress}
        </StatNumber>
      </Stat>

      

      <Stat
        p="2"
        rounded={"lg"}
        px={{ base: 4, md: 8 }}
        py={"5"}
        shadow={"xl"}
        border={"1px solid"}
      >
        <StatLabel>Your account address:</StatLabel>
        <StatNumber fontSize={"medium"}>{userAccount}</StatNumber>
      </Stat>
     </SimpleGrid>    
    </Box>
  </Stack>
  )
}

export default CoinDetails