import { useEffect, useState } from 'react';
import { useZoomPanHelper } from 'react-flow-renderer';
import { Select } from '@chakra-ui/react';
import { useVariable } from '../../src/contexts/VariableContext';

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
        <Select
            zIndex="1000"
            variant="filled"
            margin="10px auto 10px auto"
            textOverflow="ellipsis"
            onChange={handleChange}
            width="90%"
            backgroundColor="#ffffff"
            value={value}
        >
            {dataList.map((dl) => (
                <option key={dl.name} value={dl.name}>
                    {dl.name}
                </option>
            ))}
        </Select>
    );
};

export default WorkflowSelect;
