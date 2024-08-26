import { useState } from 'react'
import './style.css'

export default function App() {
  const [newItem, setNewItem] = useState('')
  const [toDos, setToDos] = useState([])

  function handleSubmit(e)
  {
    e.preventDefault()
    setToDos( currentToDos => {
      return [
        ...currentToDos,
        { id: crypto.randomUUID(), title: newItem, completed: false}
      ]
    })

    setNewItem("")
  }

  function toggleToDo(id, completed)
  {
    setToDos( currentToDos => {
      return currentToDos.map( toDo => {
        if (toDo.id === id) {
          return { ...toDo, completed }
        }

        return toDo
      })
    })
  }

  function deleteToDo(id)
  {
    setToDos( currentToDos => {
      return currentToDos.filter( toDo => toDo.id !== id)
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='new-item-form'>
        <div className='form-row'>
          <label htmlFor="new-item">New Item</label>
          <input onChange={e => setNewItem(e.target.value)} value={newItem} type="text" name="" id="item" />
        </div>
        <button className='btn'>Add</button>
      </form>
      <ul className='list'>
        {toDos.length === 0 && "No things to do"}
        {toDos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.checked}
                  onChange={e => toggleToDo(todo.id, e.target.checked)}
                />{todo.title}
              </label>
              <button onClick={() => deleteToDo(todo.id)} className='btn btn-danger'>Delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}