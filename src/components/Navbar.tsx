import React from 'react'

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="logo--container">
          <img
            src="../images/troll-face.png"
            alt="app-logo"
            className="nav--logo"
          />
          <h1>Meme Generator</h1>
        </div>

        <h3>Will's React Project</h3>
      </nav>
    </header>
  )
}

export default Navbar
