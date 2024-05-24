import React from 'react'
import { useState, useId, useEffect, useRef } from 'react'
import html2canvas from 'html2canvas'
import TextInput from './TextInput.tsx'
import Meme from './Meme.tsx'

const Form = () => {
  console.log('Component rendered')
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  })

  const [allMemes, setAllmemes] = useState([])
  const memeRef = useRef<HTMLDivElement | null>(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [topTextPos, setTopTextPos] = useState({ x: 50, y: 10 })
  const [bottomTextPos, setBottomTextPos] = useState({ x: 50, y: 80 })

  const id = useId()

  useEffect(() => {
    const fetchMemes = async () => {
      const res = await fetch('https://api.imgflip.com/get_memes')
      const data = await res.json()
      setAllmemes(data.data.memes)
    }

    fetchMemes()
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
    setIsImageLoaded(false) // Reset image load state
  }

  function handleChange(event: any) {
    const { name, value } = event.target
    setMeme((prevMeme) => ({ ...prevMeme, [name]: value }))
  }

  async function handleDownload() {
    try {
      if (memeRef.current) {
        const canvas = await html2canvas(memeRef.current, {
          useCORS: true,
        })
        const dataUrl = canvas.toDataURL('image/png')
        // Create a new <a> element
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = 'meme.png' // Set the default filename
        link.target = '_blank'
        document.body.appendChild(link)
        link.click() // Trigger the download
        document.body.removeChild(link) // Clean up after download
      }
    } catch (error) {
      console.error('Error generating meme:', error.message)
    }
  }

  return (
    <>
      <div className="form">
        <TextInput
          id={id + 'top-text'}
          placeholder="Top-text..."
          name="topText"
          value={meme.topText}
          handleChange={handleChange}
        >
          Top text
        </TextInput>
        <TextInput
          id={id + 'bottom-text'}
          placeholder="Bottom-text..."
          name="bottomText"
          value={meme.bottomText}
          handleChange={handleChange}
        >
          Bottom text
        </TextInput>

        <button onClick={getMemeImage}>Get a new meme image 🖼️</button>
        <button onClick={handleDownload} disabled={!isImageLoaded}>
          {isImageLoaded ? 'Download Meme ⬇️' : 'Loading Meme...'}
        </button>
        <Meme
          memeRef={memeRef}
          meme={meme}
          handleImageLoad={() => setIsImageLoaded(true)}
          topTextPos={topTextPos}
          setTopTextPos={setTopTextPos}
          bottomTextPos={bottomTextPos}
          setBottomTextPos={setBottomTextPos}
          isImageLoaded={isImageLoaded}
          setIsImageLoaded={setIsImageLoaded}
        />
      </div>
    </>
  )
}

export default Form
