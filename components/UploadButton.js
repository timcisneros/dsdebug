import React from 'react';
import { useVariable } from '../src/contexts/VariableContext';

const UploadButton = () => {
    const { handleReadFile, onReaderLoad } = useVariable();
    return (
        <form>
            <input
                style={{ position: 'absolute', zIndex: 1000 }}
                type="file"
                name="json"
                onChange={(e) => handleReadFile(e.target.files[0])}
            />
        </form>
    );
};

export default UploadButton;
