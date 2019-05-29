import React from 'react'
import { useDispatch } from 'react-redux'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import logo from './assets/logo.svg'
import { addTodo } from './actions'

export default function App() {
  const dispatch = useDispatch()

  return (
    <div className="container">
      <img className="logo" src={logo} alt="logo" />
      <TodoInput
        newTodo
        placeholder="What needs to be done"
        onSubmit={text => dispatch(addTodo(text))}
      />
      <TodoList />
      <Footer />
    </div>
  )
}
