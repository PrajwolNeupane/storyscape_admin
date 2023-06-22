import { Route, Routes } from "react-router"
import Creater from "./page/CreaterPage"
import ProtectiveLayout from "./Layout/ProtectiveLayout"
import Dashboard from "./page/Dashboard"

function App() {

  return (
    <Routes>
      <Route element={<ProtectiveLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="/creater" element={<Creater />} />
    </Routes>
  )
}

export default App
