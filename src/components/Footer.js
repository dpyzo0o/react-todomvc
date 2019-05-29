import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants'
import { completeAllTodos, clearCompleted, setFilter } from '../actions'

export default function Footer() {
  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter)

  const todosRemaining = useSelector(
    state => state.todos.filter(todo => !todo.completed).length
  )

  const allChecked = useSelector(state =>
    state.todos.every(todo => todo.completed)
  )

  return (
    <>
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
    </>
  )
}
