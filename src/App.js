import {
  ChakraProvider,
  VStack,
  theme,
  useColorMode,
  useMediaQuery
} from '@chakra-ui/react';
import { ThirdwebProvider, coinbaseWallet, metamaskWallet, rainbowWallet, trustWallet, walletConnect } from '@thirdweb-dev/react';

import { ethers, utils } from "ethers";
import React, { CSSProperties, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuinnAbi from './ABIs/Quinn.json';
import QuinnSaleAbi from './ABIs/QuinnSale.json';
import AboutUs from './components/AboutUs';
import BuyCoin from './components/BuyCoin';
import ConnectWalletPage from './components/ConnectWalletPage';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Nav from './components/Nav';
import PriceTicker from './components/PriceTicker';
import PrivateRoute from './components/PrivateRoute';


function App() {

  // variables
  const [isNotSmallerScreen] = useMediaQuery("(min-width:600px)");

  const {colorMode} = useColorMode()
  const isDark = colorMode === "dark";

  const override: CSSProperties = {
    position:"absolute",
    margin: "-50px ",
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    height: "1050px",
    width: "1980px",
    backgroundColor: "#1A202C",
    zIndex:1111
  };

  // states
  const [userAccountTokenBalance, setUserAccountTokenBalance] = useState(0);
  const [buyNumber, setBuyNumber] = useState(1);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [userAccount, setUserAccount] = useState(null);
  const [QuinnContract, setQuinnContract] = useState(null);
  const [quinnSaleContract, setQuinnSaleContract] = useState(null);
  const [coinName, setCoinName] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinTotalSupply, setCoinTotalSupply] = useState(0);
  const [coinsSold, setCoinsSold] = useState(0);
  const [coinAvailable, setCoinAvailable] = useState(0);
  const [tokenContractAddress, setTokenContractAddress] = useState(null);
  const [saleContractBalance,setSaleContractBalance] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [ethPriceUsd, setEthPriceUsd] = useState(0);
  const [loading, setLoading] = useState(false);

  
  
  // functions
  const handleBuyNumberChanged = async (value) => {
    setBuyNumber(parseInt(value));
    console.log(value);
  };

  const buyTokens = async () => {
    console.log(quinnSaleContract, 'quinn sale contract');
            
    try {
      setLoading(true)
      console.log(tokenPrice, buyNumber);
      console.log(saleContractBalance, "saleContractBalance");
      
      let priceInWei =  utils.parseEther(tokenPrice.toString());
      console.log(priceInWei, "price in wei")

      let totalPrice = buyNumber * priceInWei;
      console.log(totalPrice, "value in try block");

      let totalPriceString = totalPrice.toString();

      let buyer = userAccount.toString()

      console.log(buyer, 'buyer');
      console.log(totalPriceString, 'value in string');
      // Call the buyTokens function

      const tx = await quinnSaleContract.buyTokens(buyNumber, {
        value: totalPriceString,
        gasLimit: 500000,
      });

      await tx.wait();
      console.log('Transaction confirmed:', tx.hash);
      toast.success('🦄 Congratulations! You have successfully purchased QUINN!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });

        setTimeout(() => {
          setLoading(false);
          
          window.location.reload()
        }, 2000);
       
     
    } catch (error) {
      // Handle the error if the transaction reverts
      console.error("Error buying tokens:", error);
      toast.error('Something went wrong, Rejected!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        setLoading(false)
    }
  }

  
 
 // use effects 

 //checking wallet connected or not
 const [isWalletConnected, setIsWalletConnected] = useState(() => {
  const storedState = localStorage.getItem('isWalletConnected');
  return storedState ? JSON.parse(storedState) : false;
});


useEffect(() => {
  if (window.ethereum) {
    console.log('initial effect triggered');
    window.ethereum.on('accountsChanged', (accounts) => {
      try{

        console.log('accountsChanged detected');
      if (accounts.length === 0) {
        setIsWalletConnected(false);
        localStorage.setItem('isWalletConnected', JSON.stringify(false));
        toast.error('Wallet Disconnected!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      } else {
        setIsWalletConnected(true);
        localStorage.setItem('isWalletConnected', JSON.stringify(true));
        toast.success('Wallet Connected!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    }
    catch(error){
      console.log('error setting local storage', error);
    }

    });
  }
}, []);

useEffect(() => {
  const initContractData = async () => {
    if(isWalletConnected){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      console.log(signer, 'signing contract');

      
      try {
        // connecting to smart contract
        const quinnContractAddress = "0xAe5904a44f05976D747acf728Ad4ae0A6b9Ef6E5";
        const quinnContract = new ethers.Contract(quinnContractAddress, QuinnAbi.abi, signer)
        setQuinnContract(quinnContract)
        setTokenContractAddress(quinnContractAddress)  


        const quinnSaleContractAddress = "0x20EDc4f7F89f7C3DaA31822307d0FA0a3d2A2caC";
        const quinnSaleContract = new ethers.Contract(quinnSaleContractAddress, QuinnSaleAbi.abi, signer)
        setQuinnSaleContract(quinnSaleContract);
        
        console.log(quinnContract, 'quin contract')
        console.log(quinnSaleContract, 'quin sale contract')
       

        // fetching initial value

        // fetching quinn information        
        let coinName = await quinnContract.name();
        setCoinName(coinName);
        console.log(coinName, 'coin name');

        let coinSymbol = await quinnContract.symbol();
        setCoinSymbol(coinSymbol);
        console.log(coinSymbol, 'coin symbol');

        let totalSupply = await quinnContract.totalSupply();
        setCoinTotalSupply(Number(totalSupply.toString()));
        console.log(Number(totalSupply.toString()), 'coin total supply');

        let price = await quinnSaleContract.tokenPrice();
        let priceInEth = ethers.utils.formatEther(price)
        setTokenPrice(priceInEth);        
        console.log(priceInEth, 'coin token price in ether');

        let coinsSold = await quinnSaleContract.tokensSold();
        setCoinsSold(Number(coinsSold.toString()))
        console.log(Number(coinsSold.toString()), 'coin token sold');   


        let availableQuinn = totalSupply - coinsSold;
        setCoinAvailable(Number(availableQuinn.toString()));
        console.log(coinAvailable, 'coin availability');


        let saleContractBalance = await quinnContract.balanceOf(quinnSaleContractAddress);
        setSaleContractBalance(Number(saleContractBalance.toString()));
        console.log(Number(saleContractBalance.toString()), 'coin sale balance');
      
        //user information 
        if(window.ethereum.selectedAddress){
          const accounts = await window.ethereum.selectedAddress;
          
          setUserAccount(accounts);
          console.log(accounts, 'account');
        }

        if (userAccount && /^0x[a-fA-F0-9]{40}$/.test(userAccount)) {
          const balance = await quinnContract.balanceOf(userAccount);
          setUserAccountTokenBalance(Number(balance.toString()));
          console.log('User account balance:', Number(balance.toString()));

         //fetching the transaction history
          const historyApi =  `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${userAccount}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=PRAIR8HT29XAKC6P7D13KE5HAGQGHQE7XT`;

          const response = await fetch(historyApi);
          const data = await response.json();
          setTransactionData(data.result);
          console.log(data.result, 'transaction data');
         
        } 

        const ethPrice = 'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=PRAIR8HT29XAKC6P7D13KE5HAGQGHQE7XT';

        const response = await fetch(ethPrice);
        const data = await response.json();
        setEthPriceUsd(data.result.ethusd);
        console.log(data.result.ethusd, 'eth price usd');
        


      } catch (error) {
        console.log(error)
      }
    }
  }

  initContractData()

}, [isWalletConnected,userAccount,coinsSold,coinAvailable]);


  return (
    <ThirdwebProvider clientId='26c6b436458b688136f398a7a7377c4a' activeChain="ethereum" supportedWallets={
      [metamaskWallet(),
      coinbaseWallet(),
      walletConnect(),
      trustWallet(),
      rainbowWallet(),]}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <VStack p={5}>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <ClimbingBoxLoader 
            color="#36d7b7"   
            loading={loading}
            cssOverride={override}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />

            <PriceTicker/>

            <Nav isWalletConnected={isWalletConnected} setIsWalletConnected={setIsWalletConnected} setUserAccount={setUserAccount} />
   
            <Routes>
              <Route exact path='/' element={<Home isNotSmallerScreen={isNotSmallerScreen} isDark={isDark} />}/>  

              <Route exact path='/connect' element={<ConnectWalletPage isWalletConnected={isWalletConnected}/>} />

              <Route exact path='/about-us' element={<AboutUs/>} />

              <Route path='quinn' element={<PrivateRoute isWalletConnected={isWalletConnected}/>}>                             
                <Route exact path='buy' element={<BuyCoin                
                  isNotSmallerScreen={isNotSmallerScreen}
                  userAccountTokenBalance={userAccountTokenBalance}
                  buyNumber={buyNumber}                  
                  handleBuyNumberChanged={handleBuyNumberChanged}
                  buyTokens={buyTokens} 
                  tokenPrice={tokenPrice}
                  tokenContractAddress={tokenContractAddress}                 
                  userAccount={userAccount}
                  coinAvailable={coinAvailable}
                  coinsSold={coinsSold}
                  />}
                />
                <Route exact path='dashboard' element={<Dashboard 
                  userAccount={userAccount} 
                  userAccountTokenBalance={userAccountTokenBalance} 
                  coinName={coinName} coinSymbol={coinSymbol} 
                  coinTotalSupply={coinTotalSupply} 
                  coinsSold={coinsSold} 
                  tokenPrice={tokenPrice} 
                  setIsWalletConnected={setIsWalletConnected} 
                  setUserAccount={setUserAccount}
                  coinAvailable={coinAvailable}
                  tokenContractAddress={tokenContractAddress}
                  transactionData={transactionData}
                  ethPriceUsd={ethPriceUsd}
                  />}
                />
              </Route>
            </Routes>
            
           
          </VStack>
        </ChakraProvider>
      </BrowserRouter>
    </ThirdwebProvider>
  );
}

export default App;
