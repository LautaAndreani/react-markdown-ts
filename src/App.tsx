import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Notes from "./ui/Notes"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path="/notes" element={<Notes/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
