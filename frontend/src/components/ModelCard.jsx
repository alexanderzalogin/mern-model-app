import {
	Box,
	Heading,
	Image,
	useColorModeValue,
} from "@chakra-ui/react";

const ModelCard = ({ model }) => {
	const bg = useColorModeValue("white", "gray.800");

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={model.photo} alt={model.photo} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					
				</Heading>
			</Box>
		</Box>
	);
};
export default ModelCard;
