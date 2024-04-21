import React from 'react'
import { useState } from 'react'
import { memesData } from '../memesdata.ts'

const Form = () => {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  })

  const [allImages, setAllImages] = useState(memesData.data)

  function getMemeImage() {
    const memesArray = memesData.data.memes
    const randomNumber = Math.floor(Math.random() * memesArray.length)
    const { url } = memesArray[randomNumber]
    setMeme((prev) => ({ ...prev, randomImage: url }))
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
        <img src={meme.randomImage} alt="meme" className="meme" />
      </div>
    </>
  )
}

export default Form
