import { Heading, Stack, Text } from '@chakra-ui/react';
import { ConnectWallet } from '@thirdweb-dev/react';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const ConnectWalletPage = ({isWalletConnected}) => {

  useEffect(() => {
    if(isWalletConnected){
      <Navigate to='/quinn/Dashboard'/>
    }

  }, []);


  const handleClick = () =>{
    console.log("clicked");
  }
  return (
    <>

      <Heading mt={20} mb={-20}>
        Please, Connect Your Wallet To Continue...
      </Heading>


      <Text fontSize={'small'} mt={20} mb={-20}>Your Trusty Wallets Are Our Priority!</Text>
      
      <Stack margin='15%'>   
        

        {isWalletConnected? <Navigate to='/quinn/Dashboard'/> : <ConnectWallet theme='dark'/>}
          
      </Stack>
    </>
  )
}

export default ConnectWalletPage