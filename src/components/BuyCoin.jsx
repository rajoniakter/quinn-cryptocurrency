import { Button, Center, FormControl, Heading, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import CoinDetails from './CoinDetails'
import FooterNotice from './FooterNotice'

const BuyCoin = ({isNotSmallerScreen,userAccountTokenBalance,buyNumber,saleContractBalance,handleBuyNumberChanged,buyTokens,tokenPrice,tokenContractAddress,tokenSaleContractAddress,userAccount,coinAvailable,coinsSold} ) => {


  return (
    <>
      <Center>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
          ml={isNotSmallerScreen ? "30" : "0"}

        >

          <Heading lineHeight={1.1} fontSize={{ base: "1xl", md: "2xl" }}>
          You currently have {userAccountTokenBalance} QUINN
          </Heading>
          <Text fontSize={{ base: "sm", sm: "md" }}>Buy some more?</Text>
          <FormControl>
            <NumberInput
              defaultValue={1}
              min={1}
              max={coinAvailable}
              onChange={handleBuyNumberChanged}
            >
              <NumberInputField/>
              <NumberInputStepper>
                <NumberIncrementStepper/>
                <NumberDecrementStepper/>
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        
          <Button isDisabled={buyNumber > coinAvailable || buyNumber < 1} colorScheme="blue" onClick={buyTokens}>
            Invest in Quinn
          </Button>

          {buyNumber > coinAvailable? <Text color='red'> You can't buy more Quinn then availability </Text> : null}

          {buyNumber <1 ? <Text color='red'> You can't buy Negative number of Quinn </Text> : null}

        </Stack>


      </Center>

      <CoinDetails 
        tokenPrice={tokenPrice}
        tokenContractAddress={tokenContractAddress}
        userAccount={userAccount}
        coinAvailable={coinAvailable}
        coinsSold={coinsSold}
        />

      <FooterNotice isNotSmallerScreen={isNotSmallerScreen}/>
    </>
  )
}

export default BuyCoin