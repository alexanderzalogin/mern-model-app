import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAgencyStore } from "../store/agency";
import { useModelStore } from "../store/model";
import AgencyCard from "../components/AgencyCard";
import ModelCard from "../components/ModelCard";

const HomePage = () => {
    const { getAgencies, agencies } = useAgencyStore();
    const { getModels, models } = useModelStore();

    useEffect(() => {
        getAgencies();
        getModels();
    }, [getAgencies, getModels]);
    console.log(agencies)

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    textAlign={"center"}
                >
                    Current models and agencies
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3,
                    }}
                    spacing={10}
                    w={"full"}
                >
                    {agencies?.map((agency) => (
                        <AgencyCard agency={agency} />
                    ))}
                    
                    {models?.map((model) => (
                        <ModelCard model={model} />
                    ))}
                </SimpleGrid>

                {models?.length === 0 && agencies?.length === 0 && (
                    <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                        Nothing found 😢{" "}
                        <Link to={"/signup"}>
                            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                                Sign up
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
};
export default HomePage;
