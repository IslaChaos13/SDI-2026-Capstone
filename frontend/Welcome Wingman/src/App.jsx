import Logon from "./Pages/Logon"
import Navbar from "./componets/Navbar"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
      <div>
        <Navbar />

        <Routes>

          <Route path="/login" element={<Logon />} />

        </Routes>

      </div>
    </>
  )
}

export default App
