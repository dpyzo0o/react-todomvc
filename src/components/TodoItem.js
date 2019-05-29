import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import TodoInput from './TodoInput'
import { completeTodo, editTodo, deleteTodo } from '../actions'

export default function TodoItem({ todo }) {
  const [editing, setEditing] = useState(false)
  const dispatch = useDispatch()

  function handleSubmit(text) {
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
          <TodoInput autoFocus text={todo.text} onSubmit={handleSubmit} />
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
