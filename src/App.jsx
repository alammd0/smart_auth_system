import Authform from "./components/Authform"
import { Route, Routes } from "react-router"
import SignupPage from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Authform />} />
      <Route path="/login" element={<Authform />} />

    </Routes>
  )
}

export default App
