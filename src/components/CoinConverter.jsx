import { Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const CoinConverter = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.coingecko.com/coingecko-coin-converter-widget.js';
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
    <Stack>
      {scriptLoaded && (
        <coingecko-coin-converter-widget  
          coin-id="ethereum" currency="bdt" 
          background-color="#151a23"
          font-color="#5ac285"
          locale="en"
      ></coingecko-coin-converter-widget>
      )}

    </Stack>
  )
}

export default CoinConverter