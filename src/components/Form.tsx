import React from 'react'
import { useState, useId, useEffect } from 'react'

const Form = () => {
  console.log('Component rendered')
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  })

  const [allMemes, setAllmemes] = useState([])

  const id = useId()

  useEffect(() => {
    console.log('Effect ran')
    if (allMemes.length === 0) {
      fetch('https://api.imgflip.com/get_memes')
        .then((res) => res.json())
        .then((data) => setAllmemes(data.data.memes))
    }
  }, [allMemes])

  function getMemeImage() {
    const memesArray = allMemes
    const randomNumber = Math.floor(Math.random() * memesArray.length)
    const { url } = memesArray[randomNumber]
    setMeme((prev) => ({
      ...prev,
      topText: '',
      bottomText: '',
      randomImage: url,
    }))
  }

  function handleChange(event: any) {
    const { name, value } = event.target
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }))
  }

  return (
    <>
      <div className="form">
        <div className="input-group">
          <label htmlFor={id + 'top-text'}>Top text</label>
          <input
            type="text"
            id={id + 'top-text'}
            placeholder="Top Text..."
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor={id + 'bottom-text'}>Bottom text</label>
          <input
            type="text"
            id={id + 'bottom-text'}
            placeholder="Bottom Text..."
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>

        <button onClick={getMemeImage}>Get a new meme image 🖼️</button>
        <div className="meme">
          <img src={meme.randomImage} alt="meme" className="meme--image" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </>
  )
}

export default Form
