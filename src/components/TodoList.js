import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import TodoItem from './TodoItem'
import logo from '../logo.svg'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants'
import {
  addTodo,
  completeAllTodos,
  setFilter,
  clearCompleted,
} from '../actions'

export default function TodoList() {
  const dispatch = useDispatch()
  const [newTodo, setNewTodo] = useState('')

  const filter = useSelector(state => state.filter)
  const filteredTodos = useSelector(state => getVisibleTodos(state))

  const todosRemaining = useSelector(
    state => state.todos.filter(todo => !todo.completed).length
  )

  const allChecked = useSelector(state =>
    state.todos.every(todo => todo.completed)
  )

  function handleKeyDown(e) {
    if (e.which === 13) {
      dispatch(addTodo(newTodo))
      setNewTodo('')
    }
  }

  return (
    <div className="container">
      <img className="logo" src={logo} alt="logo" />
      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done"
        value={newTodo}
        onChange={e => setNewTodo(e.target.value.trim())}
        onKeyDown={handleKeyDown}
      />
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <div className="extra-container">
        <div>
          <label>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={() => dispatch(completeAllTodos())}
            />
            Check All
          </label>
        </div>
        <div>{todosRemaining} items left</div>
      </div>
      <div className="extra-container">
        <div>
          <button
            className={classnames({ active: filter === SHOW_ALL })}
            onClick={() => dispatch(setFilter(SHOW_ALL))}
          >
            All
          </button>
          <button
            className={classnames({ active: filter === SHOW_ACTIVE })}
            onClick={() => dispatch(setFilter(SHOW_ACTIVE))}
          >
            Active
          </button>
          <button
            className={classnames({ active: filter === SHOW_COMPLETED })}
            onClick={() => dispatch(setFilter(SHOW_COMPLETED))}
          >
            Completed
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(clearCompleted())}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  )
}

function getVisibleTodos(state) {
  switch (state.filter) {
    case SHOW_ALL:
      return state.todos
    case SHOW_ACTIVE:
      return state.todos.filter(todo => !todo.completed)
    case SHOW_COMPLETED:
      return state.todos.filter(todo => todo.completed)
    default:
      return state
  }
}
