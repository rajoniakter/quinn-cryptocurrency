import { Box, Center, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const  Essence = ({isNotSmallerScreen}) => {
  return (
    <Box p={5} width={isNotSmallerScreen ? "60%" : "100%"}>
    <Center >
      <Stack spacing={4} width={'90%'} margin={'auto'}>
      <Text  
        fontSize={isNotSmallerScreen ? "2xl" : "1xl"}
        fontWeight="bold"
        bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
        bgClip="text"
      >
        A Journey of Learning and Innovation: The Essence of QUINN
      </Text>
      <Text>
      It is imperative to stress that QUINN, alongside this ICO, has been meticulously crafted for educational and research purposes exclusively.  <br />
      It is not purposed for trading or commercial activities. Our mission is to share insights, foster conscientious blockchain development, and inspire fresh prospects within the cryptocurrency domain. Your support and engagement contribute profoundly to a more enlightened and informed future.
      </Text>

      </Stack>

    </Center>

  </Box>
  )
}

export default  Essence