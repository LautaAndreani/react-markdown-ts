import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ListNotes from './pages/ListNotes'
import Notes from './pages/Notes'

function App (): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/list/:userId' element={<ListNotes/>} />
          <Route path='/notes/:noteId' element={<Notes/>} />
          <Route path='/notes' element={<Notes/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
