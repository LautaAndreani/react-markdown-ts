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
          <Route
            path="/list/:userId"
            element={
              <ProtectedRoute>
                <ListNotes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/:noteId"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route path="/notes" element={
            <ProtectedRoute>
              <Notes/>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
