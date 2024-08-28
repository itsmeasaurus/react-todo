import { useEffect, useState } from 'react'
import {NewItemForm} from './NewItemForm'
import { TodoList } from './TodoList'
import './style.css'

export default function App() 
{
  const [todos, setTodos] = useState(() => {
    const localValues = localStorage.getItem('ITEMS')
    if(localValues === null) return []
    return JSON.parse(localValues)
  })

  useEffect(() => {
      localStorage.setItem('ITEMS', JSON.stringify(todos))
  }, [todos])

  function addTodo(title)
  {
    setTodos( currentTodos => {
      return [ 
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false}
      ]
    })
  }

  function toggleTodo(id, completed)
  {
    setTodos( currentTodos => {
      return currentTodos.map( todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id)
  {
    setTodos( currentTodos => {
      return currentTodos.filter( todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewItemForm onSubmit={addTodo}></NewItemForm>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}></TodoList>
    </>
  )
}