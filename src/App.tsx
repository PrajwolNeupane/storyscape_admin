import { Route, Routes } from "react-router"
import LogInPage from "./page/LogInPage"
import ProtectiveLayout from "./Layout/ProtectiveLayout"
import Dashboard from "./page/Dashboard"
import SignUpPage from "./page/SignUpPage"

function App() {

  return (
    <Routes>
      <Route element={<ProtectiveLayout />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="/log-in" element={<LogInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  )
}

export default App
