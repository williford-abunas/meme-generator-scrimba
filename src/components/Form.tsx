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
    const getMemes = async () => {
      const res = await fetch('https://api.imgflip.com/get_memes')
      const data = await res.json()
      setAllmemes(data.data.memes)
    }

    getMemes()
  }, [])

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

  function handleDownload() {
    // Create a new <a> element
    const link = document.createElement('a')
    link.href = meme.randomImage
    link.download = 'meme.png' // Set the default filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click() // Trigger the download
    document.body.removeChild(link) // Clean up after download
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
        <button onClick={handleDownload}>Download Meme ⬇️</button>
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
