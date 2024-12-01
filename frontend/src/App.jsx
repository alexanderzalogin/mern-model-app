import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"

const App = () => {
	return (
		<Box minH={"100vh"}>
			<Navbar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/create' element={<CreatePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
			</Routes>
		</Box>
	);
}

export default App;
