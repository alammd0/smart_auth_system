import Authform from "./components/Authform"
import { Route, Routes } from "react-router"
import SignupPage from "./components/pages/Signup"
import Login from "./components/pages/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Authform />} />
      <Route path="/login" element={<Authform />} />
    </Routes>
  )
}

export default App
