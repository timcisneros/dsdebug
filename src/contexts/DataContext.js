import { useState, createContext, useContext } from 'react';
import initialData from '../../data/Status Change Form_ V1.json';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

const DataProvider = ({ children }) => {
    const [data, setData] = useState(initialData);
    const [dataList, setDataList] = useState([]);
    const [workflowName, setWorkflowName] = useState();
    const [definedVariables, setDefinedVariables] = useState([]);

    const getAddedWorkflowNames = () => {
        const startActivity = data.cells.find(
            (c) => c.activityName === 'StartActivity'
        );

        const wfName = startActivity.workflowName.value;

        setWorkflowName(wfName);

        const allDataList = [{ name: wfName, data }, ...dataList];

        const filteredDataList = allDataList.filter(
            (adlf, i) =>
                allDataList.map((adlm) => adlm.name).indexOf(adlf.name) === i
        );

        setDataList(filteredDataList);

        setDefinedVariables(
            startActivity.definedVariables.value.map((dv) => dv.value.name)
        );
    };

    const value = {
        data,
        setData,
        dataList,
        workflowName,
        setWorkflowName,
        getAddedWorkflowNames,
        definedVariables,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};

export default DataProvider;
