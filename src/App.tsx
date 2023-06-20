import { Route, Routes } from "react-router"
import SideDrawer from "./components/SideDrawer"
import Creater from "./page/CreaterPage"

function App() {

  return (
    <Routes>
      <Route index element={<SideDrawer />} />
      <Route path="/creater" element={<Creater />}/>
    </Routes>
  )
}

export default App
