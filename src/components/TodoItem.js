import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import { completeTodo, editTodo, deleteTodo } from '../actions'

export default function TodoItem({ todo }) {
  const [text, setText] = useState(todo.text)
  const [editing, setEditing] = useState(false)
  const dispatch = useDispatch()

  function handleKeyDown(e) {
    if (e.which === 13) {
      handleBlur()
    }
  }

  function handleBlur() {
    dispatch(editTodo(todo.id, text))
    setEditing(false)
  }

  return (
    <div className="todo-item">
      <div className="todo-item-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={e => dispatch(completeTodo(todo.id))}
        />
        {editing ? (
          <input
            autoFocus
            type="text"
            className="todo-item-edit"
            value={text}
            onChange={e => setText(e.target.value.trim())}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        ) : (
          <div
            className={classnames('todo-item-label', {
              completed: todo.completed,
            })}
            onDoubleClick={() => setEditing(!editing)}
          >
            {todo.text}
          </div>
        )}
      </div>
      <div
        className="remove-item"
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        &times;
      </div>
    </div>
  )
}
