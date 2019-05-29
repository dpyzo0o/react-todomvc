import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants'

export default function TodoList() {
  const filteredTodos = useSelector(state => getVisibleTodos(state))

  return (
    <>
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
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
