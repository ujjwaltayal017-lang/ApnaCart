// import React from 'react'
// import {FaCircle} from "react-icons/fa"

// function Hero({heroData, heroCount, setHeroCount}) {
//   return (
//     <div className='w-[40%] h-[100%] relative'>
//         <div className='absolute text-[#88d9ee] text-[20px] md:text=[40px] lg:text-[55px] md:left-[10%] md:top:[90px] lg:top-[130px] left-[10%] top-[10px]'>

//             <p>{heroData.text1}</p>
//             <p>{heroData.text2}</p>

//         </div>

//         <div className='absolute md:top-[400px] lg:top-[500px] top-[160px] left-[10%] flex items-center justify-center gap-[10px]'>

//             <FaCircle className={`w-[14px] ${heroCount === 0 ? "fill-orange-400": "fill-white"}`} onClick={()=>setHeroCount(0)}/>

//             <FaCircle className={`w-[14px] ${heroCount === 1 ? "fill-orange-400": "fill-white"}`} onClick={()=>setHeroCount(1)}/>

//             <FaCircle className={`w-[14px] ${heroCount === 2 ? "fill-orange-400": "fill-white"}`} onClick={()=>setHeroCount(2)}/>

//             <FaCircle className={`w-[14px] ${heroCount === 3 ? "fill-orange-400": "fill-white"}`} onClick={()=>setHeroCount(3)}/>
//         </div>

//     </div>
//   )
// }

// export default Hero


import React from 'react'
import { Link } from "react-router-dom"

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <>
      {/* Text aur button: beech mein, left side par */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-xl">
          <p className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {heroData.text1}
          </p>
          <p className="mt-1 text-2xl sm:text-4xl lg:text-5xl font-bold text-orange-400 leading-tight">
            {heroData.text2}
          </p>

          <Link
            to="/collections"
            className="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Neeche ke gol dots: jo chal raha hai wo orange aur lamba */}
      <div className="absolute bottom-5 left-6 md:left-12 lg:left-20 flex items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setHeroCount(i)}
            className={`h-2.5 rounded-full transition-all ${
              heroCount === i ? "w-8 bg-orange-500" : "w-2.5 bg-white/70"
            }`}
          />
        ))}
      </div>
    </>
  )
}

export default Hero