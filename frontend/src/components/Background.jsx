// import React from 'react'
// import back1 from "../assets/back1.jfif"
// import back2 from "../assets/back2.jpg"
// import back3 from "../assets/back3.jpg"
// import back4 from "../assets/back4.jpg"

// function Background({heroCount}) {
  
//     if(heroCount === 0){
//         return <img src={back1} alt='' className='w-[100%] h-[100%] float-left overflow-auto object-cover'/>
//     } else if(heroCount === 1){
//         return <img src={back2} alt='' className='w-[100%] h-[100%] float-left overflow-auto object-cover'/>
//     } else if(heroCount === 2){
//         return <img src={back3} alt='' className='w-[100%] h-[100%] float-left overflow-auto object-cover'/>
//     } else if(heroCount === 3){
//         return <img src={back4} alt='' className='w-[100%] h-[100%] float-left overflow-auto object-cover'/>
//     }

// }

// export default Background

import React from 'react'
import back1 from "../assets/back1.jfif"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"

// Sabhi images ek list mein (heroCount se number ke hisaab se chunti hai)
const images = [back1, back2, back3, back4]

function Background({ heroCount }) {
  return (
    <>
      {/* Poore section mein phaili hui image */}
      <img
        src={images[heroCount]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Halka kala parda, taaki safed text saaf padhe */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
    </>
  )
}

export default Background