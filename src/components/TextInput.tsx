import React from 'react'

type TextInputProps = {
  children: string
  id: string
  placeholder: string
  name: string
  value: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextInput = (props: TextInputProps) => {
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
