import { useEffect, useState } from 'react';
import { useZoomPanHelper } from 'react-flow-renderer';
import { Select } from '@chakra-ui/react';
import { useVariable } from '../src/contexts/VariableContext';

const WorkflowSelect = () => {
    const { fitView } = useZoomPanHelper();
    const { setData, dataList, setSelectedVariable } = useVariable();
    const [value, setValue] = useState('');

    useEffect(() => {
        setSelectedVariable(null);
        setValue(dataList[0]?.name);
    }, [dataList]);

    const handleChange = (e) => {
        setSelectedVariable(null);
        setValue(e.target.value);
        const foundData = dataList.find((dl) => dl.name === e.target.value);
        setData(foundData.data);
    };

    useEffect(() => {
        setTimeout(() => fitView(), 1);
    }, [value]);

    return (
        <div style={{ position: 'absolute', top: 20, left: 70, zIndex: 1000 }}>
            <Select
                onChange={handleChange}
                width="25rem"
                backgroundColor="#ffffff"
                value={value}
            >
                {dataList.map((dl) => (
                    <option key={dl.name} value={dl.name}>
                        {dl.name}
                    </option>
                ))}
            </Select>
        </div>
    );
};

export default WorkflowSelect;
