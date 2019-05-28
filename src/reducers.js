import { combineReducers } from 'redux'
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL_TODOS,
  CLEAR_COMPLETED,
  SET_FILTER,
  SHOW_ALL,
  STORAGE_KEY,
} from './constants'

function getInitialState() {
  return (
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      todos: [],
      filter: SHOW_ALL,
    }
  )
}

function todos(state = getInitialState().todos, { type, payload }) {
  switch (type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          text: payload.text,
          completed: false,
        },
      ]

    case DELETE_TODO:
      return state.filter(todo => todo.id !== payload.id)

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === payload.id ? { ...todo, text: payload.text } : todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === payload.id ? { ...todo, completed: !todo.completed } : todo
      )

    case COMPLETE_ALL_TODOS:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({ ...todo, completed: !areAllMarked }))

    case CLEAR_COMPLETED:
      return state.filter(todo => !todo.completed)

    default:
      return state
  }
}

function filter(state = getInitialState().filter, { type, payload }) {
  switch (type) {
    case SET_FILTER:
      return payload.filter

    default:
      return state
  }
}

const rootReducer = combineReducers({
  todos,
  filter,
})

export default rootReducer
