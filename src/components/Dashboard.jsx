import {
  Box,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react';
import React from 'react';
import AccountOverview from './AccountOverview';
import QuinnOverview from './QuinnOverview';


const Dashboard = ({userAccount,userAccountTokenBalance,coinName,coinSymbol,coinTotalSupply,coinsSold,tokenPrice,setIsWalletConnected,setUserAccount,coinAvailable}) => {


  return (
    
    <Tabs  orientation='horizontal' size="md" variant="enclosed" >
      <Box mt={8}>
        <Heading size="xl">Welcome to Quinn ICO Dashboard</Heading>
        <Text mt={4} mb={10}>Manage your Quinn  and explore.</Text>
      </Box>

        
      <TabList  >
        <Tab>Account Overview</Tab>
        <Tab>Quinn Overview</Tab>
        <Tab>Transaction History</Tab>
      </TabList>
      <TabPanels>

        <TabPanel>
          <AccountOverview userAccount={userAccount} userAccountTokenBalance={userAccountTokenBalance}/>
        </TabPanel>

        <TabPanel>
          <QuinnOverview coinName={coinName} coinSymbol={coinSymbol} coinTotalSupply={coinTotalSupply} coinsSold={coinsSold} tokenPrice={tokenPrice} coinAvailable={coinAvailable}/>
        </TabPanel>

        <TabPanel>
          No Transaction yet
        </TabPanel>

      </TabPanels>
    </Tabs>  
  );
};

export default Dashboard;
