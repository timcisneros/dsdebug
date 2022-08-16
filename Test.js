import { useData } from './src/contexts/DataContext';
import dt from './data/PMH CaaS Routing.json';
import jp from 'jsonpath';

const Test = () => {
    const {
        data,
        setData,
        workflowName,
        getAddedWorkflowNames,
        definedVariables,
    } = useData();
    // console.log(dt);

    const d = {
        cells: [
            { name: 'London', population: 8615246 },
            { name: 'Berlin', population: 3517424 },
            { name: 'Madrid', population: 3165235 },
            { name: 'Rome', population: 2870528 },
        ],
    };

    // jp.query(data.cells, '$[?(@.type == "springcm.Step")].activityName')

    console.log(jp.query(data.cells, '$..[?(@.value.value)]'));

    return (
        <pre style={{ height: '100vh', overflow: 'scroll' }}>
            {/* {JSON.stringify(dt.cells[11], null, 2)} */}
        </pre>
    );
};

export default Test;
