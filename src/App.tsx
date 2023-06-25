import { Route, Routes } from "react-router"
import LogInPage from "./page/LogInPage"
import ProtectiveLayout from "./Layout/ProtectiveLayout"
import Dashboard from "./page/Dashboard"
import SignUpPage from "./page/SignUpPage"
import { useEffect } from 'react';
import { useAppDispatch } from "./app/store"
import { setToken } from "./app/reducer/tokenReducer"
import { getCookie } from "./helper/cookiee"
import AddBlogPage from "./page/AddBlogPage"


function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setToken(getCookie("token")));
  }, []);

  return (
    <Routes>
      <Route element={<ProtectiveLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddBlogPage />} />
      </Route>
      <Route path="/log-in" element={<LogInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  )
}

export default App
