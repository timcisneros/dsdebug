import { useData } from './src/contexts/DataContext';
import dt from './data/PMH CaaS Routing.json';

const Test = () => {
    const {
        data,
        setData,
        workflowName,
        getAddedWorkflowNames,
        definedVariables,
    } = useData();
    console.log(dt);
    return (
        <pre style={{ height: '100vh', overflow: 'scroll' }}>
            {JSON.stringify(dt, null, 2)}
        </pre>
    );
};

export default Test;
