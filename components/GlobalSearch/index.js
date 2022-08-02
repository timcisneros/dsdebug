import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    InputGroup,
    InputLeftElement,
    Input,
    Text,
    Divider,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useVariable } from '../../src/contexts/VariableContext';

const GlobalSearch = ({ children }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [searchWord, setSearchWord] = useState('');

    const { variables, selectVariable } = useVariable();

    const { isOpen, onOpen, onClose } = useDisclosure();

    console.log(variables);

    const handleSearchResults = (value = 'test') => {
        setSearchWord(value);

        const newFilter = variables.filter((v) =>
            v.value?.toLowerCase().includes(value.toLowerCase())
        );

        if (value === '') {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    return (
        <Box width="100%" height="100%">
            <div onClick={onOpen}>{children}</div>

            <Modal size="lg" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <InputGroup size="lg" variant="filled">
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                            type="text"
                            onChange={(e) =>
                                handleSearchResults(e.target.value)
                            }
                            value={searchWord}
                            placeholder="Search Variables"
                            autoComplete="off"
                        />
                    </InputGroup>
                    <Box>
                        {filteredData.length != 0 && (
                            <Box padding="0">
                                {filteredData.map((fd, i) => {
                                    return (
                                        <Box
                                            cursor="pointer"
                                            onClick={() => {
                                                selectVariable(fd.value);
                                                onClose();
                                            }}
                                            padding="2"
                                            key={i}
                                        >
                                            <Text padding="1.5">
                                                {fd.value}
                                            </Text>

                                            {i !== filteredData.length - 1 && (
                                                <Divider />
                                            )}
                                        </Box>
                                    );
                                })}
                            </Box>
                        )}
                    </Box>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default GlobalSearch;
