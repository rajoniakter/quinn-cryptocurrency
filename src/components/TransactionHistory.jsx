import { Box, Button, Center, Container, Grid, Heading, Link, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import React from 'react';


const TransactionHistory = ({userAccount,transactionData}) => {
 
    const filteredTransactions = transactionData &&  transactionData.filter((transaction) => {
        return transaction.functionName === "buyTokens(uint256 _numberOfTokens)";
      });

      function formatUnixTimestamp(timestamp) {
        // Create a new Date object using the timestamp (multiply by 1000 for milliseconds)
        const date = new Date(timestamp * 1000);
      
        // Define options for formatting the date and time
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        };
      
        // Format the date and time
        const formattedDate = date.toLocaleDateString('en-US', options);
      
        return formattedDate;
      }

  return (
    <Container width={'full'}>
      
      <Grid mt={8} gap={4} templateColumns="repeat(auto-fill, minmax(300px, 1fr))">

       

        {transactionData && filteredTransactions.map(
            (transaction, index) => (
        <Box p={4} borderWidth={1} borderRadius="lg">
          <Heading size="md">Serial: {index}</Heading>
          <Text mt={4} >Transaction Hash: {transaction.hash}</Text>
          <Text mt={4} >From: {transaction.from}</Text>
          <Text mt={4} >To: {transaction.to}</Text>
          <Text mt={4} >Value: {ethers.utils.formatEther(transaction.value)} ETH</Text>
          <Text mt={4} >Gas Price: {ethers.utils.formatUnits(transaction.gasPrice, 'gwei')} Gwei</Text>
          <Text mt={4} >Time: {formatUnixTimestamp(transaction.timeStamp)}</Text>
          <Center>
          <Link href={`https://sepolia.etherscan.io/tx/${transaction.hash}`}target='_blank' >
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
            )
        )}

      </Grid>



    </Container>
  )
}

export default TransactionHistory