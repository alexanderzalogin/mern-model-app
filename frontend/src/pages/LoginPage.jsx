import {
    Button,
    Flex,
    FormControl,
    Input,
    useToast,
    Spinner,
} from '@chakra-ui/react'

import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from "../store/user";
import { useState } from 'react';
import Cookies from "js-cookie";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toast = useToast();

    const { loginUser, getUser } = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const loginResult = await loginUser(email, password);
        if (!loginResult.success) {
            toast({
                title: "Error",
                description: loginResult.message,
                status: "error",
                isClosable: true,
            });

        } else {
            toast({
                title: "Success",
                description: loginResult.data.message,
                status: "success",
                isClosable: true,
            });

            const token = loginResult.data.token;
            Cookies.set("authToken", token);
            const userResult = await getUser(token);
            console.log(userResult);
            const user = userResult.data.user;
            Cookies.set("user", JSON.stringify(user));

            navigate("/");
        }
        setLoading(false);
    }

    return (
        <>
            <FormControl flex="1">
                <form onSubmit={handleSubmit}>
                    <Flex
                        flexDirection="column"
                        align="center"
                        justify="center"
                        gap="1rem"
                        height="75vh"
                    >
                        <Input
                            size="lg"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            required
                            w={{ base: '80%', md: '40%' }}
                        />

                        <Input
                            size="lg"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                            w={{ base: '80%', md: '40%' }}
                        />
                        <Button type="submit">
                            {loading ? <Spinner /> : 'Login'}
                        </Button>
                    </Flex>
                </form>
            </FormControl>
        </>
    )
}
export default Login;
