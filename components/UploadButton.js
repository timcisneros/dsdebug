import { useRef } from 'react';
import { useVariable } from '../src/contexts/VariableContext';

const UploadButton = () => {
    const { handleReadFile } = useVariable();

    const hiddenFileInput = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        hiddenFileInput.current.click();
    };

    return (
        <form>
            <i onClick={handleClick}>
                <svg
                    className="upload"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    ></path>
                </svg>
            </i>
            <input
                type="file"
                ref={hiddenFileInput}
                name="json"
                onChange={(e) => handleReadFile(e.target.files[0])}
                style={{ display: 'none' }}
            />
        </form>
    );
};

export default UploadButton;
