import { useEffect, useState } from 'react';
import { Select } from '@chakra-ui/react';
import { useVariable } from '../src/contexts/VariableContext';

const WorkflowSelect = () => {
    const { setData, dataList } = useVariable();
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(dataList[0]?.name);
        localStorage.setItem('dataList', JSON.stringify(dataList));
    }, [dataList]);

    const handleChange = (e) => {
        setValue(e.target.value);
        const foundData = dataList.find((dl) => dl.name === e.target.value);
        setData(foundData.data);
    };

    return (
        <div style={{ position: 'absolute', top: 20, left: 70, zIndex: 1000 }}>
            <Select
                className="wf-select"
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
