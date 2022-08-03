import { useState, createContext, useContext } from 'react';
import { useToast } from '@chakra-ui/react';
import initialData from '../../data/sample_data.json';

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
};

const DataProvider = ({ children }) => {
    const [data, setData] = useState(initialData);
    const [dataList, setDataList] = useState([]);
    const [workflowName, setWorkflowName] = useState();
    const [definedVariables, setDefinedVariables] = useState([]);
    const [fileName, setFileName] = useState('');
    const toast = useToast();

    // Used for uploading a file
    const handleReadFile = (files) => {
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = onReaderLoad;
            reader.readAsText(files[i]);
            setFileName(files[i].name);
        }
    };

    const onReaderLoad = (event) => {
        try {
            setData(JSON.parse(event.target.result));
        } catch (error) {
            console.error(error);
        }
    };
    //

    const getAddedWorkflowNames = () => {
        let startActivity = '';

        try {
            startActivity = data.cells.find(
                (c) => c.activityName === 'StartActivity'
            );

            const wfName = startActivity.workflowName.value;

            setWorkflowName(wfName);

            const allDataList = [{ name: wfName, data }, ...dataList];

            const filteredDataList = allDataList.filter(
                (adlf, i) =>
                    allDataList.map((adlm) => adlm.name).indexOf(adlf.name) ===
                    i
            );

            setDataList(filteredDataList);

            setDefinedVariables(
                startActivity.definedVariables.value.map((dv) => dv.value.name)
            );
        } catch (error) {
            // Temporary solution to remove error alerts for unreadable files
            window.alert = function () {};
            console.error(error);
            // Reset data from what was uploaded to last opened readable file
            setData(dataList[0].data);
            toast({
                title: 'File Unreadable',
                description: fileName,
                status: 'error',
                duration: null,
                isClosable: true,
            });
        }
    };

    const value = {
        data,
        setData,
        dataList,
        workflowName,
        setWorkflowName,
        getAddedWorkflowNames,
        definedVariables,
        handleReadFile,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};

export default DataProvider;
