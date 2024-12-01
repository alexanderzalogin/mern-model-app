import {
    Button,
    Flex,
    FormControl,
    Input,
    useToast,
    Spinner,
  } from '@chakra-ui/react'
  
  import { useNavigate, Link } from 'react-router-dom'
  import { useUserStore } from "../store/user";
  import { useState } from 'react'
  
  const Login = () => {
    const [newUser, setUserData] = useState({
		email: "",
		password: "",
	});
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const toast = useToast();

	const { loginUser } = useUserStore();
  
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
            setLoading(false);
		} else {
            toast({
				title: "Success",
				description: loginResult.data.message,
				status: "success",
				isClosable: true,
			});

            setUserData({
                token: loginResult.data.token,
                user: loginResult.data.user,
            });

            localStorage.setItem("auth-token", loginResult.data.token);
            navigate("/");
        }
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
