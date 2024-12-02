import { Box, Button, Container, Heading, Input, Select, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useUserStore } from "../store/user";
import userTypesEnum from "../enums/userTypes.enum";

const CreatePage = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        type: "",
        email: "",
        image: ""
    });
    const toast = useToast();

    const { createUser } = useUserStore();

    const handleAddUser = async () => {
        const { success, message } = await createUser(newUser);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true,
            });
        }
        setNewUser({ name: "", type: "", email: "", image: "" });
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New User
                </Heading>

                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            placeholder='User Name'
                            name='name'
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        />
                        <Select placeholder='Select type'
                            name='type'
                            value={newUser.type}
                            onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
                        >
                            {userTypesEnum.map((type) => (
                                <option value={type.value}>{type.label}</option>
                            ))}
                        </Select>
                        <Input
                            placeholder='E-mail'
                            name='email'
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newUser.image}
                            onChange={(e) => setNewUser({ ...newUser, image: e.target.value })}
                        />
                        <Button colorScheme='blue' onClick={handleAddUser} w='full'>
                            Add User
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};
export default CreatePage;
