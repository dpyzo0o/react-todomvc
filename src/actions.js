import * as types from './constants'

export const addTodo = text => ({
  type: types.ADD_TODO,
  payload: { text },
})

export const deleteTodo = id => ({
  type: types.DELETE_TODO,
  payload: { id },
})

export const editTodo = (id, text) => ({
  type: types.EDIT_TODO,
  payload: { id, text },
})

export const completeTodo = id => ({
  type: types.COMPLETE_TODO,
  payload: { id },
})

export const completeAllTodos = () => ({
  type: types.COMPLETE_ALL_TODOS,
})

export const clearCompleted = () => ({
  type: types.CLEAR_COMPLETED,
})

export const setFilter = filter => ({
  type: types.SET_FILTER,
  payload: { filter },
})
