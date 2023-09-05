import { Button, Center, Flex, Heading, Spacer } from '@chakra-ui/react'
import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { ColorModeSwitcher } from '../ColorModeSwitcher'

 
const Nav = ({isWalletConnected,setIsWalletConnected,setUserAccount}) => {


    // const disconnect = useDisconnect()

    // const handleDisconnect = () =>{
    //     setIsWalletConnected(false);
    //     localStorage.setItem('isWalletConnected', JSON.stringify(false));

    //     setUserAccount(null);
    // }
     

    return (
        <Flex w="100%">          
        <Center>
            <Link to='/'>
                <Heading ml="2" size="md" fontWeight="semibold" color="cyan.400">
                    QUINN Launchpad
                </Heading>  
            </Link>
        </Center>
           
            <Spacer/>
            <Spacer/>

        <Center>
            <Link to='/quinn/buy'>            
                <Heading ml="2" size="md" fontWeight="semibold" color="cyan.400">
                    Buy Quinn
                </Heading>     
            </Link>
        </Center>
            <Spacer/>
            
        <Center>
            <Link to='/about-us'>            
                <Heading ml="20" size="md" fontWeight="semibold" color="cyan.400">
                    About Us
                </Heading> 
            </Link>
        </Center>


            <Spacer/>
            {console.log(isWalletConnected, 'state value')}
            {isWalletConnected === null ? null : isWalletConnected && (
                
                <Center>
                    <Link to='/quinn/dashboard'>
                        <Button mr="20" size="md" fontWeight="semibold" color="cyan.400">
                        Dashboard
                        </Button>                    
                    </Link>

                    <ConnectWallet/>

                   

                </Center>
            )}

            <ColorModeSwitcher/>
        
  </Flex>
  )
}

export default Nav