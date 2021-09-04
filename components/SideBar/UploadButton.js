import { useRef } from 'react';
import { useVariable } from '../../src/contexts/VariableContext';

const UploadButton = () => {
    const { handleReadFile } = useVariable();

    const hiddenFileInput = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        hiddenFileInput.current.click();
    };

    return (
        <form>
            <div onClick={handleClick}>Upload</div>
            <input
                multiple
                type="file"
                ref={hiddenFileInput}
                name="json"
                onChange={(e) => handleReadFile(e.target.files)}
                style={{ display: 'none' }}
            />
        </form>
    );
};

export default UploadButton;
