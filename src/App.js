import {
  ChakraProvider,
  VStack,
  theme,
  useColorMode,
  useMediaQuery
} from '@chakra-ui/react';
import { ThirdwebProvider, coinbaseWallet, metamaskWallet, rainbowWallet, trustWallet, walletConnect } from '@thirdweb-dev/react';

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Web3 from 'web3';
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

  // states
  const [web3, setWeb3] = useState(null);
  const [userAccountTokenBalance, setUserAccountTokenBalance] = useState(0);
  const [buyNumber, setBuyNumber] = useState(1);
  //const [saleContractBalance, setSaleContractBalance] = useState(0);
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

  
  
  // functions
  const handleBuyNumberChanged = async (value: string) => {
    setBuyNumber(parseInt(value));
    console.log(value);
  };

  const buyTokens = async () => {
    console.log(tokenPrice, buyNumber);

    let priceInWei = web3.utils.toWei("0.001", "ether").toString();

    let totalPrice = buyNumber * priceInWei;

    console.log( totalPrice, 'total price');

    console.log(quinnSaleContract, 'quinn sale contract');

    // let result = await quinnSaleContract.methods.buyTokens(buyNumber, {
    //   from: userAccount,
    //   value: totalPrice,
    //   gas:500000
    // }).call()


    // console.log(result, 'buy result');

    let buyer = userAccount.toString()
    try {

      console.log(buyer, 'buyer');
      // Call the buyTokens function
      let result = await quinnSaleContract.methods.buyTokens(buyNumber).send({
        from: buyer,
        value: totalPrice,
        gas:500000
      })
    
      // Handle the result if the transaction succeeds
      console.log(result, 'buy result');
    } catch (error) {
      // Handle the error if the transaction reverts
      console.error("Error buying tokens:", error);
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
      } else {
        setIsWalletConnected(true);
        localStorage.setItem('isWalletConnected', JSON.stringify(true));
      }
    }
    catch(error){
      console.log('error setting local storage', error);
    }

    });
  }
}, []);


// const [isWalletConnected, setIsWalletConnected] = useState(null);

// useEffect(() => {
//   console.log('use effect triggered');
//   // Listen for changes in the specific localStorage key
//   const handleLocalStorageChange = (e) => {
//     console.log('handleLocalStorageChange triggered');

//     console.log(e.key,'key value' , e.value);
//     if (e.key === '__TW__/coordinatorStorage/lastConnectedWallet') {
//       // Check if the value matches the connected wallet
//       const walletData = JSON.parse(e.newValue);
//       console.log(walletData?.walletId, 'conditional');
//       if (walletData?.walletId) {
//         setIsWalletConnected(true);
//         console.log(isWalletConnected, 'cechk');
//       } else {
//         setIsWalletConnected(false);
//       }
//     }
//   };

//   // Add the event listener
//   window.addEventListener('storage', handleLocalStorageChange);

//   // Check the initial localStorage value
//   const initialWalletData = JSON.parse(
//     localStorage.getItem('__TW__/coordinatorStorage/lastConnectedWallet')
//   );

//   console.log(initialWalletData, 'initial wallet data');

//   if (initialWalletData?.walletId) {
//     setIsWalletConnected(true);
//   } else {
//     setIsWalletConnected(false);
//   }


// }, []);


// getting contract data
useEffect(() => {
  const initContractData = async () => {
    if(isWalletConnected){
      let web3 = new Web3(window.ethereum)

      
      try {
        await window.ethereum.enable();
        setWeb3(web3)

        console.log(web3, 'web3');

        // connecting to smart contract
        const quinnContractAddress = "0x933Cf45BE8Fba8dAf7570CF74E869fb265Dc26a1";
        const quinnContract = new web3.eth.Contract(QuinnAbi.abi, quinnContractAddress)
        setQuinnContract(quinnContract)
        setTokenContractAddress(quinnContractAddress)  


        const quinnSaleContractAddress = "0x539BF70AbF399fd3dFc45bf9AB0378A77FF9a10d";
        const quinnSaleContract = new web3.eth.Contract(QuinnSaleAbi.abi, quinnSaleContractAddress)
        setQuinnSaleContract(quinnSaleContract);
        
        console.log(quinnContract, 'quin contract')
        console.log(quinnSaleContract, 'quin sale contract')

        console.log(quinnContract._address, 'quinn contract address');

        // fetching initial value

        // fetching quinn information        
        let coinName = await quinnContract.methods.name().call()
        setCoinName(coinName);
        console.log(coinName, 'coin name');

        let coinSymbol = await quinnContract.methods.symbol().call()
        setCoinSymbol(coinSymbol);
        console.log(coinSymbol, 'coin symbol');

        let totalSupply = await quinnContract.methods.totalSupply().call();
        setCoinTotalSupply(Number(totalSupply.toString()));
        console.log(Number(totalSupply.toString()), 'coin total supply');

        let price = await quinnSaleContract.methods.tokenPrice().call();
        let priceInFloat = parseFloat(Web3.utils.fromWei(price, 'ether'))
        setTokenPrice(priceInFloat);        
        console.log(priceInFloat, 'coin token price in ether');

        let coinsSold = await quinnSaleContract.methods.tokensSold().call();
        setCoinsSold(Number(coinsSold.toString()))
        console.log(Number(coinsSold.toString()), 'coin token sold');

        

          let availableQuinn = totalSupply - coinsSold;
          setCoinAvailable(Number(availableQuinn.toString()));
          console.log(coinAvailable, 'coin availability');
        

        // let saleContractBalance = await quinnContract.methods.balanceOf(quinnSaleContract._address).call()
        // setSaleContractBalance(Number(saleContractBalance.toString()));
        // console.log(Number(saleContractBalance.toString()), 'coin sale balance');

        // console.log(quinnSaleContract._address, 'sale contract address');

      
        //user information 
        const accounts = await web3.eth.getAccounts();
        const newAccount = accounts[0];
        setUserAccount(newAccount);
        console.log(newAccount, 'account');
  
       
        // const balance = await quinnContract.methods.balanceOf( userAccount).call({from:userAccount})
        // setUserAccountTokenBalance(Number(balance.toString()))  
        // console.log('user acc balance',Number(balance.toString()));
        
        
          // setTimeout(async () => {
          //   const balance = await quinnContract.methods.balanceOf(userAccount).call();
          //   setUserAccountTokenBalance(Number(balance.toString()));
          //   console.log('User account balance:', Number(balance.toString()));
          // }, 15000); // Adjust the delay as needed

        if (newAccount && /^0x[a-fA-F0-9]{40}$/.test(newAccount)) {
          const balance = await quinnContract.methods.balanceOf(newAccount).call();
          setUserAccountTokenBalance(Number(balance.toString()));
          console.log('User account balance:', Number(balance.toString()));
        }

      
       
        
      } catch (error) {
        console.log(error)
      }
    }
  }

  initContractData()

}, [isWalletConnected,userAccount,coinTotalSupply,coinsSold,coinAvailable]);


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
