import React from 'react'
import Essence from './Essence'
import AboutUs from './AboutUs'
import BackToTop from './BackToTop'
import CTA from './CTA'
import Hero from './Hero'


const Home = (isNotSmallerScreen,isDark) => {
  return (
    <>
        <Hero isNotSmallerScreen={isNotSmallerScreen} isDark={isDark}/>
        
        <CTA/>
        
        <AboutUs isNotSmallerScreen={isNotSmallerScreen}/>

        <Essence isNotSmallerScreen={isNotSmallerScreen}/>       

        <BackToTop/>
    </>

  )
}

export default Home