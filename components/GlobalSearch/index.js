import { useState } from 'react';
import {
    Box,
    Dialog,
    Input,
    Portal,
    Text,
    Separator,
    useDisclosure,
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { useVariable } from '../../src/contexts/VariableContext';
import { toaster } from '../ui/Toaster';

const GlobalSearch = ({ children }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const { variables, selectVariable } = useVariable();
    const { open, onOpen, onClose } = useDisclosure();

    const handleSearchResults = (value) => {
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

            <Dialog.Root
                size="lg"
                open={open}
                onOpenChange={(details) => !details.open && onClose()}
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Box position="relative">
                                <Box
                                    color="gray.400"
                                    position="absolute"
                                    left="4"
                                    top="50%"
                                    transform="translateY(-50%)"
                                    zIndex="1"
                                >
                                    <LuSearch />
                                </Box>
                        <Input
                            type="text"
                            onChange={(e) =>
                                handleSearchResults(e.target.value)
                            }
                            value={searchWord}
                            placeholder="Search Variables"
                            autoComplete="off"
                            size="lg"
                            variant="subtle"
                            paddingLeft="12"
                        />
                            </Box>
                    <Box>
                        {filteredData.length != 0 && (
                            <Box padding="0">
                                {filteredData.map((fd, i) => {
                                    return (
                                        <Box
                                            cursor="pointer"
                                            onClick={() => {
                                                try {
                                                    selectVariable(fd.value);
                                                    onClose();
                                                } catch (error) {
                                                    toaster.create({
                                                        title: "Search can't be completed",
                                                        description:
                                                            error.message,
                                                        type: 'error',
                                                        closable: true,
                                                    });
                                                }
                                            }}
                                            padding="2"
                                            key={i}
                                        >
                                            <Text padding="1.5">
                                                {fd.value}
                                            </Text>

                                            {i !== filteredData.length - 1 && (
                                                <Separator />
                                            )}
                                        </Box>
                                    );
                                })}
                            </Box>
                        )}
                    </Box>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Box>
    );
};

export default GlobalSearch;
