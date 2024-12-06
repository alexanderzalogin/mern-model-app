import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import ProtectedRoute from "./components/ProtectedRoute"
import DashboardPage from "./pages/DashboardPage"
import CompleteProfilePage from "./pages/CompleteProfilePage"

const App = () => {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/complete-profile' element={<CompleteProfilePage />} />
      </Routes>
    </Box>
  );
}

export default App;
