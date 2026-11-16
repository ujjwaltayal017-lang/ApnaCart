

import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Hero from '../components/Hero'
import Product from './Product';
import OurPolicy from '../components/OurPolicy';
import NewsLetterBox from '../components/NewsLetterBox';
import Footer from '../components/Footer';

function Home() {
  let heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your perfect Fashion Fit", text2: "Now on Sale!" }
  ]

  let [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    // 3 second baad agla slide (aakhri ke baad wapas pehla)
    const timer = setTimeout(() => {
      setHeroCount((pehle) => (pehle + 1) % heroData.length)
    }, 3000)

    // Safai: slide badalne par ya page chhodne par purana timer band kar do
    return () => clearTimeout(timer)
  }, [heroCount])

  return (
    // Yeh poora hero section hai: phone par chhota, bade screen par bada
    <>
      <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[600px] overflow-hidden">
        <Background heroCount={heroCount} />
        <Hero
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={heroData[heroCount]}
        />
      </div>
      <Product />
      <OurPolicy />
      <NewsLetterBox />
      <Footer />
    </>
  )
}

export default Home