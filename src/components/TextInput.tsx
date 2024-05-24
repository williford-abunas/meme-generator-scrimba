import React from 'react'

const TextInput = (props: any) => {
  const { children, id, placeholder, name, value, handleChange } = props
  return (
    <div className="input-group">
      <label htmlFor={id}>{children}</label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default TextInput
