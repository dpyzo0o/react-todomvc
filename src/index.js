import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import TodoList from './components/TodoList'
import store from './store'
import './index.scss'
import { STORAGE_KEY } from './constants'

store.subscribe(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()))
})

ReactDOM.render(
  <Provider store={store}>
    <TodoList />
  </Provider>,
  document.getElementById('root')
)
