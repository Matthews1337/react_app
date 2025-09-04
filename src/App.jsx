import { useState } from 'react'
import PaginaInicial  from './components/PaginaInicial'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <PaginaInicial />
  )
}

export default App
