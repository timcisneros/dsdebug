import { useEffect, useState } from 'react';
import { useReactFlow } from '@xyflow/react';
import { NativeSelect } from '@chakra-ui/react';
import { useVariable } from '../../src/contexts/VariableContext';
import { useData } from '../../src/contexts/DataContext';

const WorkflowSelect = () => {
    const { fitView } = useReactFlow();
    const { setData, dataList } = useData();
    const { selectVariable } = useVariable();
    const [selectedWorkflowName, setSelectedWorkflowName] = useState('');
    const value = dataList.some((item) => item.name === selectedWorkflowName)
        ? selectedWorkflowName
        : dataList[0]?.name || '';

    const handleChange = (e) => {
        selectVariable(null);
        setSelectedWorkflowName(e.target.value);
        const foundData = dataList.find((dl) => dl.name === e.target.value);
        setData(foundData.data);
    };

    useEffect(() => {
        setTimeout(() => fitView(), 1);
    }, [fitView, value]);

    return (
        <NativeSelect.Root width="100%" variant="subtle">
            <NativeSelect.Field
                textOverflow="ellipsis"
                onChange={handleChange}
                backgroundColor="#ffffff"
                value={value}
            >
                {dataList.map((dl) => (
                    <option key={dl.name} value={dl.name}>
                        {dl.name}
                    </option>
                ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
        </NativeSelect.Root>
    );
};

export default WorkflowSelect;
