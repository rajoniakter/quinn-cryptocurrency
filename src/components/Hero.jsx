import { Box, Circle, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Logo } from "../Logo";

const Hero = (isNotSmallerScreen, isDark) => {
  return (
    <Stack w="90%">
          <Circle 
            position="absolute" 
            bg="blue.100" 
            opacity="0.1"
            size="250px"
            alignSelf="flex-end" 
          />
          <Flex 
            direction={isNotSmallerScreen ? "row" : "column"}
            p={isNotSmallerScreen ? "32":"0"}
            alignSelf="flex-start"
          >
            <Box mt={isNotSmallerScreen ? "0": "16"} >
              <Text fontSize={isNotSmallerScreen ? "5xl":"3xl"} fontWeight="semibold" >
              Get Ready for QUINN's Coin Offering!
              </Text>

              <Text
              fontSize={isNotSmallerScreen ? "7xl" : "4xl"}
              fontWeight="bold"
              bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
              bgClip="text"
            >
              Secure Your QUINN Coins Now!
            </Text>
            <Text color={isDark ? "gray.200" : "gray.500"}>
                Introducing QUINN, an advanced ERC-20 token designed to reshape the world of cryptocurrencies. With strong security, smart technology, and fairness at its core, QUINN stands out. Join us in this journey towards a brighter cryptocurrency future, where transparency and innovation lead the way. Embrace QUINN today and be part of the change!

            </Text>
            </Box>
            <Logo
            mt={isNotSmallerScreen ? "0" : "12"}
            mb={isNotSmallerScreen ? "0" : "12"}
            boxSize="250px"
            pointerEvents="none"
            alignSelf="center"
            boxShadow="lg"
            borderRadius="full"
            backgroundColor="transparent"
          />
          </Flex>
        </Stack>
  )
}

export default Hero