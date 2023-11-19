import { useState } from 'react'

import './App.css'
import ChatComponent from './chatComponent'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Your application</h1>
        <ChatComponent />
      </div>
    </>
  )
}

export default App
