import { Center } from '@chakra-ui/react'
import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'

const ConnectWalletBtn = () => {
  return (

    <Center mt={'25%'} mb={'25%'}>
        <ConnectWallet theme='dark'/>
    </Center>
  )
}

export default ConnectWalletBtn