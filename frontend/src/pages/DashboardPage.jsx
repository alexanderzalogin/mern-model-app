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
    useColorModeValue
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useAgencyStore } from "../store/agency";
import { useModelStore } from "../store/model";
import userRolesEnum from "../enums/userRoles.enum";
import Sidebar from "../components/Sidebar";

const DashboardPage = () => {

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const user_role = JSON.parse(localStorage.getItem("currentUserRole"));
    const agency = JSON.parse(localStorage.getItem("agency"));
    const model = JSON.parse(localStorage.getItem("model"));
    const toast = useToast();
    const [updatedAgency, setupdatedAgency] = useState();
    const [updatedModel, setupdatedModel] = useState();
    const { isOpen: isAgencyOpen, onOpen: onAgencyOpen, onClose: onAgencyClose } = useDisclosure();
    const { isOpen: isModelOpen, onOpen: onModelOpen, onClose: onModelClose } = useDisclosure();
    const { updateAgencyPhoto } = useAgencyStore();
    const { updateModelPhoto } = useModelStore();

    const handleUpdateAgencyPhoto = async (aid, updatedAgency) => {
        const { success, message } = await updateAgencyPhoto(aid, updatedAgency);
        onAgencyClose();
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
                description: "Agency photo updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleUpdateModelPhoto = async (mid, updatedModel) => {
        const { success, message } = await updateModelPhoto(mid, updatedModel);
        onModelClose();
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
                description: "Model photo updated successfully",
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
                color={useColorModeValue("black", "blackAlpha.700")}
                fontWeight='bold'
                bg={useColorModeValue("white", 'gray.100')}
                p='4'
                borderRadius='md'
            >
                <GridItem
                    pl='2'
                    bg={useColorModeValue("white", "gray.800")}
                    area={'nav'}
                    borderRadius='md'
                    p='2'
                    m="1"
                    color={useColorModeValue("black", "white")}
                    fontSize='0.9rem'
                    borderWidth="1px"
                    borderColor={useColorModeValue("black", 'transparent')}
                >
                    <Sidebar user={user} user_role={user_role}>
                    </Sidebar>
                </GridItem>
                <GridItem
                    pl='2'
                    bg={useColorModeValue("white", "gray.800")}
                    area={'main'}
                    borderRadius='md'
                    p='2'
                    m="1"
                    color={useColorModeValue("black", "white")}
                    fontSize='1.2rem'
                    borderWidth="1px"
                    borderColor={useColorModeValue("black", 'transparent')}
                >
                    <Box borderWidth="1px"
                        borderColor={useColorModeValue("black", 'transparent')}
                        pos="relative" 
                        w="100%" 
                        h="200px" 
                        bg={useColorModeValue("white", "gray.700")} 
                        borderRadius='2xl'
                    >
                        <Box
                            borderRadius='2xl'
                            bg={useColorModeValue("white", "gray.700")}
                            p="2"

                        >
                            Profile
                            <Text fontSize="sm">
                                {userRolesEnum.map((type) => (
                                    (type.id == user_role.role_id ? type.label : '')
                                ))}
                            </Text>
                        </Box>
                        <Box 
                            borderWidth="1px"
                            borderColor={useColorModeValue("black", 'transparent')} 
                            borderRadius='2xl' 
                            bg={useColorModeValue("white", "gray.800")} 
                            pos="absolute" 
                            top="99%" 
                            left="50%" 
                            color={useColorModeValue("black", "white")} 
                            transform="translate(-50%,-50%)" 
                            h="100px" 
                            width="95%"
                        >
                            <HStack>
                                <Box w={24} pos="relative">
                                    <Image borderRadius='full' src={agency ? agency.photo : model.photo} alt={user.full_name} h={24} w={24} objectFit='cover' p="2" />
                                    <EditIcon _hover={{ cursor: "pointer" }} onClick={agency ? onAgencyOpen : onModelOpen} pos="absolute" top="72%" left="72%" size="sm" />
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
                    bg={useColorModeValue("white", "gray.800")}
                    area={'footer'}
                    borderRadius='md'
                    color={useColorModeValue("black", "white")}
                    m="1"
                    fontSize="15px"
                    borderWidth="1px"
                    borderColor={useColorModeValue("black", 'transparent')}
                >
                    Footer
                </GridItem>
            </Grid>
            <Modal isOpen={isAgencyOpen} onClose={onAgencyClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Agency Photo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Image URL'
                                name='photo'
                                value={updatedAgency?.photo ? updatedAgency?.photo : agency?.photo}
                                onChange={(e) => setupdatedAgency({ photo: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateAgencyPhoto(agency._id, updatedAgency)}
                        >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onAgencyClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isModelOpen} onClose={onModelClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Model Photo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Image URL'
                                name='photo'
                                value={updatedModel?.photo ? updatedModel?.photo : model?.photo}
                                onChange={(e) => setupdatedModel({ photo: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateModelPhoto(model._id, updatedModel)}
                        >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onModelClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default DashboardPage;
