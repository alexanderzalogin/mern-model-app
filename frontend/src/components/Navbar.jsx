import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { CheckCircleIcon, PlusSquareIcon, UnlockIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import Cookies from "js-cookie"
import { useState } from 'react';

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
    const [token, setToken] = useState(Cookies.get("authToken"));

    const checkToken = () => {
        setToken(Cookies.get("authToken"));
    }
    const logout = () => {
        Cookies.remove("authToken");
        Cookies.remove("user");
        localStorage.clear();
        setToken('');
    };

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Model App</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
                    {token && (
                    <Link to={'/dashboard'}>
                        <Button onClick={checkToken}>
							Dashboard
						</Button>
                    </Link>
                    )}
                    {token && (
                        <Link to={'/'}>
                    <Button onClick={logout}>
                        Log out
                    </Button>
                    </Link>
                    )}
                    {!token && (
                    <Link to={'/login'}>
                        <Button onClick={checkToken}>
							Login
						</Button>
                    </Link>
                    )}
                    {!token && (
                    <Link to={'/signup'}>
                        <Button onClick={checkToken}>
							Sign Up
						</Button>
                    </Link>
                    )}
					<Link to={"/create"}>
						<Button onClick={checkToken}>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;
