import { 
    Container, 
    Grid, 
    GridItem, 
    Image, 
    Box, 
    HStack, 
    VStack, 
    Text, 
    Button, 
    Modal,
    ModalOverlay,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    useDisclosure,
    Input,
    useToast
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/user";

const DashboardPage = () => {
    // const { getUser } = useUserStore();
    // const token = Cookies.get("authToken");
    // const [user, setUser] = useState()

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const toast = useToast();
    const [updatedUser, setupdatedUser] = useState(user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { updateUserPhoto } = useUserStore();

    const handleUpdateUserPhoto = async (uid, updatedUser) => {
		const { success, message } = await updateUserPhoto(uid, updatedUser);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "User photo updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
            console.log(updatedUser.image);
		}
	};
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
                                <Box w={24} pos="relative">
                                    <Image borderRadius='full' src={user.image} alt={user.name} h={24} w={24} objectFit='cover' p="2" />
                                        
                                            <EditIcon onClick={onOpen} pos="absolute" top="72%" left="72%" size="sm" />
                                    
                                </Box>
                                <Box>
                                    <VStack alignItems="start">
                                        <Text fontSize='md' as='i'>{user.name}</Text>
                                        <Text fontSize='sm' as='samp'>{user.email}</Text>
                                    </VStack>
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
            <Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Profile Photo</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedUser.photo ? updatedUser.photo : user.image}
								onChange={(e) => setupdatedUser({ photo: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateUserPhoto(user._id, updatedUser)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
        </Container>
    )
}

export default DashboardPage;
