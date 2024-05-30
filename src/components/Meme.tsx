import React, { useEffect } from 'react'
import { useState } from 'react'
import MemeText from './MemeText.tsx'
import type { MemeState } from '../types/types.tsx'

type MemeProps = {
  memeRef: React.RefObject<HTMLDivElement>
  meme: MemeState
  handleImageLoad: () => void
  topTextPos: { x: number; y: number }
  setTopTextPos: (pos: { x: number; y: number }) => void
  bottomTextPos: { x: number; y: number }
  setBottomTextPos: (pos: { x: number; y: number }) => void
  isImageLoaded: boolean
}

const Meme = (props: MemeProps) => {
  const {
    memeRef,
    meme,
    handleImageLoad,
    topTextPos,
    setTopTextPos,
    bottomTextPos,
    setBottomTextPos,
    isImageLoaded,
  } = props

  const [dragging, setDragging] = useState<{
    isDragging: boolean
    which: string | null
  }>({ isDragging: false, which: null })

  useEffect(() => {
    if (isImageLoaded) {
      setTopTextPos({ x: 50, y: 10 })
      setBottomTextPos({ x: 50, y: 80 })
    }
  }, [isImageLoaded, setTopTextPos, setBottomTextPos])

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    which: string | null
  ) => {
    e.preventDefault()
    if (which === null) return

    setDragging({ isDragging: true, which })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging.isDragging) return

    const rect = memeRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (dragging.which === 'top') {
      setTopTextPos({ x, y })
    } else if (dragging.which === 'bottom') {
      setBottomTextPos({ x, y })
    } else if (dragging.which === null) {
      return
    }
  }

  const handleMouseUp = () => {
    setDragging({ isDragging: false, which: null })
  }

  return (
    <div
      className="meme"
      ref={memeRef}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <img
        src={meme.randomImage}
        alt="meme"
        className="meme--image"
        style={{ width: '100%', height: '100%' }}
        crossOrigin="anonymous"
        onLoad={handleImageLoad}
        draggable="false"
      />
      <MemeText
        memeText={meme.topText}
        position={topTextPos}
        handleMouseDown={handleMouseDown}
        whichPos="top"
      />
      <MemeText
        memeText={meme.bottomText}
        position={bottomTextPos}
        handleMouseDown={handleMouseDown}
        whichPos="bottom"
      />
    </div>
  )
}

export default Meme
