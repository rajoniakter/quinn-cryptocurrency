import { Alert, AlertIcon, Center, Stack } from '@chakra-ui/react'
import React from 'react'

const FooterNotice = ({isNotSmallerScreen}) => {
  return (
    <Stack>
    <Center>
      <Alert
        status="info"
        marginTop={100}
        width={isNotSmallerScreen ? "70%" : "100%"}
      >
        <AlertIcon />
        QUINN transactions may experience varying speeds due to the current deployment on a test network. Your understanding and patience are greatly appreciated.

      </Alert>
    </Center>
  </Stack>
  )
}

export default FooterNotice