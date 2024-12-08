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
    useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useUserStore } from "../store/user";
import userRolesEnum from "../enums/userRoles.enum";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {
    
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const user_role = JSON.parse(localStorage.getItem("currentUserRole"));
    const agency = JSON.parse(localStorage.getItem("agency"));
    const model = JSON.parse(localStorage.getItem("model"));
    console.log(agency);
    console.log(model);
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
        }
    };

    return (
        <Container maxW='container.xl' py={12}>
            <Grid
                templateAreas={`"nav main"
                        "nav footer"`}
                gridTemplateRows={'1fr 80px'}
                gridTemplateColumns={'150px 1fr'}
                minH='200vh'
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
                    fontSize='0.9rem'
                >
                    <Sidebar user={user} user_role={user_role}>
                    </Sidebar>
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
                            <Text fontSize="sm">
                                {userRolesEnum.map((type) => (
                                    (type.id == user_role.role_id ? type.label : '')
                                ))}
                            </Text>
                        </Box>
                        <Box borderRadius='2xl' bg='gray.800' pos="absolute" top="99%" left="50%" color="white" transform="translate(-50%,-50%)" h="100px" width="95%">
                            <HStack>
                                <Box w={24} pos="relative">
                                    <Image borderRadius='full' src={agency ? agency.photo : model.photo} alt={user.full_name} h={24} w={24} objectFit='cover' p="2" />
                                    <EditIcon _hover={{ cursor: "pointer" }} onClick={onOpen} pos="absolute" top="72%" left="72%" size="sm" />
                                </Box>
                                <Box>
                                    <VStack alignItems="start">
                                        <Text fontSize='md' as='i'>{user.full_name}</Text>
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
                                name='photo'
                                value={updatedUser.photo ? updatedUser.photo : user.photo}
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
