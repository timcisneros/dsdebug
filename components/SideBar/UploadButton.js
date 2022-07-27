import { useRef } from 'react';
import { useVariable } from '../../src/contexts/VariableContext';
import { Box, Text } from '@chakra-ui/layout';

const UploadButton = () => {
    const { handleReadFile } = useVariable();

    const hiddenFileInput = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        hiddenFileInput.current.click();
    };

    return (
        <Box width="100%" height="100%">
            <form>
                <Text onClick={handleClick}>Upload</Text>
                <input
                    multiple
                    type="file"
                    ref={hiddenFileInput}
                    name="json"
                    onChange={(e) => handleReadFile(e.target.files)}
                    style={{ display: 'none' }}
                    accept=".json"
                />
            </form>
        </Box>
    );
};

export default UploadButton;
