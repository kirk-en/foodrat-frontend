import axios from 'axios'
import React from 'react'

const HomePage = () => {
  
  // const findLocation = async () => {
  //   res = await axios
  // }

// console.log(window.navigator);

  const newClip = () => {navigator.geolocation.getCurrentPosition((position) => console.log(position));

  }

  return (
    <>
    <div>HomePage</div>
    <a onClick={newClip}>wooooo</a>
  </>
  )
}

export default HomePage