import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <div className="logo--container">
        <img
          src="../images/troll-face.png"
          alt="app-logo"
          className="nav--logo"
        />
        <h1>Meme Generator</h1>
      </div>

      <h3>React Course - Project 3</h3>
    </nav>
  )
}

export default Navbar
