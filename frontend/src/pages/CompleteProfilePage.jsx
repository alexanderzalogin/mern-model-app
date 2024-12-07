import {
    Button,
    Avatar,
    Flex,
    FormControl,
    Input,
    useToast,
    Spinner,
    FormHelperText,
    FormLabel,
    Text,
    Select,
    Box
} from '@chakra-ui/react'
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAgencyStore } from '../store/agency';
import { useModelStore } from '../store/model';
import userRolesEnum from '../enums/userRoles.enum'

const CompleteProfilePage = () => {
    const [role, setRole] = useState();
    const [name, setName] = useState();
    const [photo, setPhoto] = useState();
    const [description, setDescription] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const toast = useToast();

    const { createAgency } = useAgencyStore();
    const { getAgencies, agencies } = useAgencyStore();
    const { createModel } = useModelStore();

    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        getAgencies();
    }, [getAgencies]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (role == 'agency') {
            const agencyResult = await createAgency(user._id, { name, photo, description });
            if (!agencyResult.success) {
                toast({
                    title: "Error",
                    description: agencyResult.message,
                    status: "error",
                    isClosable: true,
                });
            } else {
                const agency = agencyResult.data.agency;
                const user = agencyResult.data.user;
                const user_role = agencyResult.data.user_role;

                localStorage.setItem('agency', JSON.stringify(agency));
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('currentUserRole', JSON.stringify(user_role));

                window.location.href = '/dashboard';
            }
            setLoading(false);
        }
        if (role == 'model') {
            const modelResult = await createModel(user._id, { photo, description });
            if (!modelResult.success) {
                toast({
                    title: "Error",
                    description: modelResult.message,
                    status: "error",
                    isClosable: true,
                });
            } else {
                const model = modelResult.data.model;
                const user = modelResult.data.user;
                const user_role = modelResult.data.user_role;

                localStorage.setItem('model', JSON.stringify(model));
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('currentUserRole', JSON.stringify(user_role));

                window.location.href = '/dashboard';
            }
            setLoading(false);
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
                        <Select placeholder='Select type'
                            name='type'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            w={{ base: '80%', md: '40%' }}
                        >
                            {userRolesEnum.map((type) => (
                                <option value={type.value}>{type.label}</option>
                            ))}
                        </Select>

                        {role == "agency" &&
                            <Input
                                size="lg"
                                id="name"
                                name="name"
                                placeholder="Name"
                                type="name"
                                onChange={(e) => setName(e.target.value)}
                                required
                                w={{ base: '80%', md: '40%' }}
                            />
                        }
                        {role == "model" &&
                            <Box w={{ base: '80%', md: '40%' }}>
                                <AutoComplete
                                    openOnFocus
                                >
                                    <AutoCompleteInput variant="filled"
                                        size="lg"
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        type="name"
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <AutoCompleteList>
                                        {agencies.map((agency, oid) => (
                                            <AutoCompleteItem
                                                key={`option-${oid}`}
                                                value={agency.name}
                                                textTransform="capitalize"
                                                align="center"
                                                onChange={(e) => setName(e.target.value)}
                                            >
                                                <Avatar size="sm" name={agency.name} src={agency.photo} />
                                                <Text ml="4">{agency.name}</Text>
                                            </AutoCompleteItem>
                                        ))}
                                    </AutoCompleteList>
                                </AutoComplete>
                            </Box>
                        }
                        <Input
                            size="lg"
                            id="photo"
                            name="photo"
                            placeholder="Photo"
                            type="photo"
                            onChange={(e) => setPhoto(e.target.value)}
                            required
                            w={{ base: '80%', md: '40%' }}
                        />
                        <Input
                            size="lg"
                            id="description"
                            name="description"
                            placeholder="Description"
                            type="description"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            w={{ base: '80%', md: '40%' }}
                        />
                        <Button type="submit">
                            {loading ? <Spinner /> : 'Save'}
                        </Button>
                    </Flex>
                </form>
            </FormControl>
        </>
    )
}
export default CompleteProfilePage;
