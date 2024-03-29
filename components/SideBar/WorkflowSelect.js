import { useEffect, useState } from 'react';
import { useZoomPanHelper } from 'react-flow-renderer';
import { Select } from '@chakra-ui/react';
import { useVariable } from '../../src/contexts/VariableContext';
import { useData } from '../../src/contexts/DataContext';

const WorkflowSelect = () => {
    const { fitView } = useZoomPanHelper();
    const { setData, dataList } = useData();
    const { selectVariable } = useVariable();
    const [value, setValue] = useState('');

    useEffect(() => {
        selectVariable(null);
        setValue(dataList[0]?.name);
    }, [dataList]);

    const handleChange = (e) => {
        selectVariable(null);
        setValue(e.target.value);
        const foundData = dataList.find((dl) => dl.name === e.target.value);
        setData(foundData.data);
    };

    useEffect(() => {
        setTimeout(() => fitView(), 1);
    }, [value]);

    return (
        <Select
            variant="filled"
            textOverflow="ellipsis"
            onChange={handleChange}
            width="100%"
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
