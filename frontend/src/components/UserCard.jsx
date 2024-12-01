import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
    Select
} from "@chakra-ui/react";
import { useUserStore } from "../store/user";
import { useState } from "react";
import userTypesEnum from "../enums/userTypes.enum";

const UserCard = ({ user }) => {
	const [updatedUser, setUpdatedUser] = useState(user);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteUser, updateUser } = useUserStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleDeleteUser = async (pid) => {
		const { success, message } = await deleteUser(pid);
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
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateUser = async (pid, updatedUser) => {
		const { success, message } = await updateUser(pid, updatedUser);
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
				description: "User updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={user.image} alt={user.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{user.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					{user.type}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteUser(user._id)}
						colorScheme='red'
					/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update User</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='User Name'
								name='name'
								value={updatedUser.name}
								onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
							/>
							<Select placeholder='Select type'
                                name='type'
                                value={updatedUser.type}
								onChange={(e) => setUpdatedUser({ ...updatedUser, type: e.target.value })}
                            >
                                {userTypesEnum.map((type) => (
                                    <option value={type.value}>{type.label}</option>
                                ))}
                            </Select> 
                            <Input
								placeholder='E-mail'
								name='email'
								value={updatedUser.email}
								onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedUser.image}
								onChange={(e) => setUpdatedUser({ ...updatedUser, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateUser(user._id, updatedUser)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default UserCard;
