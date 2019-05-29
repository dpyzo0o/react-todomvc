import React, { useState } from 'react'

export default function TodoInput({
  autoFocus,
  text,
  newTodo,
  onSubmit,
  placeholder,
}) {
  const [input, setInput] = useState(text || '')

  function handleKeyDown(e) {
    if (e.which === 13 && input.trim() !== '') {
      onSubmit(input.trim())
      setInput('')
    }
  }

  function handleBlur() {
    if (!newTodo && input.trim() !== '') {
      onSubmit(input.trim())
    }
  }

  return (
    <input
      type="text"
      autoFocus={autoFocus}
      placeholder={placeholder}
      className={newTodo ? 'todo-input' : 'todo-item-edit'}
      value={input}
      onChange={e => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  )
}
