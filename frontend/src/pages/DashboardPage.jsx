import { Container, Grid, GridItem, Image, Box, HStack } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/user";

const DashboardPage = () => {
    // const { getUser } = useUserStore();
    // const token = Cookies.get("authToken");
    // const [user, setUser] = useState()

    const user = JSON.parse(localStorage.getItem("currentUser"));
    // useEffect(() => {
    //     const fetchUser = async (token) => {
    //         const response = await getUser(token)
    //         setUser(response.data.user)
    //     }
    //     fetchUser(token)
    // },[])
    console.log(user);
    return (
        <Container maxW='container.xl' py={12}>
            <Grid
                templateAreas={`"nav main"
                        "nav footer"`}
                gridTemplateRows={'1fr 80px'}
                gridTemplateColumns={'150px 1fr'}
                h='800px'
                gap='1'
                color='blackAlpha.700'
                fontWeight='bold'
                bg='gray.100'
                p='4'
                borderRadius='md'
            >
                <GridItem
                    pl='2'
                    bg='gray.800'
                    area={'nav'}
                    borderRadius='md'
                    p='2'
                    m="1"
                    color='white'
                    fontSize='1.2rem'
                >
                    Nav
                </GridItem>
                <GridItem
                    pl='2'
                    bg='gray.800'
                    area={'main'}
                    borderRadius='md'
                    p='2'
                    m="1"
                    color='white'
                    fontSize='1.2rem'
                >
                    <Box pos="relative" w="100%" h="200px" bg='gray.700' borderRadius='2xl'>
                        <Box borderRadius='2xl' bg='gray.700' p="2">
                            Profile
                        </Box>
                        <Box borderRadius='2xl' bg='gray.800' pos="absolute" top="99%" left="50%" color="white" transform="translate(-50%,-50%)" h="100px" width="95%">
                            <HStack>
                                <Box w={24}>
                                    <Image borderRadius='full' src={user.image} alt={user.name} h={24} w={24} objectFit='cover' p="2" />
                                </Box>
                                <Box>
                                    {user.name} {user.email}
                                </Box>
                            </HStack>
                        </Box>
                    </Box>
                </GridItem>
                <GridItem
                    pl='2'
                    bg='gray.800'
                    area={'footer'}
                    borderRadius='md'
                    color='white'
                    m="1"
                    fontSize="15px"
                >
                    Footer
                </GridItem>
            </Grid>
        </Container>
    )
}

export default DashboardPage;
