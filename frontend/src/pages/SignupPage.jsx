import {
    Button,
    Flex,
    FormControl,
    Input,
    useToast,
    Spinner,
    Select
} from '@chakra-ui/react'

import { useNavigate, Link } from 'react-router-dom';
import { useUserStore } from "../store/user";
import { useState } from 'react';

const Signup = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [full_name, setFullName] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toast = useToast();

    const { signupUser } = useUserStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const signupResult = await signupUser(email, password, confirmPassword, full_name);
        if (!signupResult.success) {
            toast({
                title: "Error",
                description: signupResult.message,
                status: "error",
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: signupResult.data.message,
                status: "success",
                isClosable: true,
            });

            navigate("/login");
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
                            placeholder='Full Name'
                            name='name'
                            value={full_name}
                            onChange={(e) => setFullName(e.target.value)}
                            w={{ base: '80%', md: '40%' }}
                        />
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
                        <Input
                            size="lg"
                            id="password-confirm"
                            name="password-confirm"
                            placeholder="Confirm password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type="password"
                            required
                            w={{ base: '80%', md: '40%' }}
                        />
                        <Button type="submit">
                            {loading ? <Spinner /> : 'Sign Up'}
                        </Button>
                    </Flex>
                </form>
            </FormControl>
        </>
    )
}
export default Signup;
