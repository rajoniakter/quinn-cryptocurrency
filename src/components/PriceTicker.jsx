import { Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';


const PriceTicker = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js';
    script.async = true;
    script.onload = () => {
      setScriptLoaded(true); // Set scriptLoaded to true when the script is loaded
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Stack w={'full'} mt={'-20px'} mb={'20px'}>
      {scriptLoaded && (<coingecko-coin-price-marquee-widget
        coin-ids="bitcoin,eos,ethereum,litecoin,ripple,tether,binancecoin,dogecoin,solana,polkadot,shiba-inu,matic-network"
        currency="usd"
        background-color="#151a23"
        font-color="#5ac285"
        locale="en"
      ></coingecko-coin-price-marquee-widget>)}
    </Stack>
  );
};

export default PriceTicker







