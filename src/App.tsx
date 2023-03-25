import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import Home from './pages/Home'
import ListNotes from './pages/ListNotes'
import Notes from './pages/Notes'

function App (): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/list/:userId" element={<ListNotes />} />
            <Route path="/notes/:noteId" element={<Notes />} />
            <Route path="/notes" element={<Notes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
