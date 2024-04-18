import React from 'react'
import { useState } from 'react'
import { memesData } from '../memesdata.ts'

const Form = () => {
  const [memeImage, setMemeImage] = useState('')
  function getMemeImage() {
    const memesArray = memesData.data.memes
    const randomNumber = Math.floor(Math.random() * memesArray.length)
    const { url } = memesArray[randomNumber]
    setMemeImage(url)
  }
  return (
    <>
      <div className="form">
        <div className="input-group">
          <label htmlFor="top-text">Top text</label>
          <input type="text" id="top-text" placeholder="Top Text..." />
        </div>
        <div className="input-group">
          <label htmlFor="bottom-text">Bottom text</label>
          <input type="text" id="bottom-text" placeholder="Bottom Text..." />
        </div>

        <button onClick={getMemeImage}>Get a new meme image 🖼️</button>
        <img src={memeImage} alt="meme" className="meme" />
      </div>
    </>
  )
}

export default Form
