import {
    useCallback,
    useRef,
    useState,
    createContext,
    useContext,
} from 'react';
import { toaster } from '../../components/ui/Toaster';
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
    const lastValidData = useRef(initialData);

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

    const getAddedWorkflowNames = useCallback(() => {
        let startActivity = '';

        try {
            startActivity = data.cells.find(
                (c) => c.activityName === 'StartActivity'
            );

            const wfName = startActivity.workflowName.value;

            setWorkflowName(wfName);

            setDataList((currentDataList) => {
                const allDataList = [
                    { name: wfName, data },
                    ...currentDataList,
                ];

                return allDataList.filter(
                    (item, index) =>
                        allDataList
                            .map((candidate) => candidate.name)
                            .indexOf(item.name) === index
                );
            });

            setDefinedVariables(
                startActivity.definedVariables.value.map((dv) => dv.value.name)
            );
            lastValidData.current = data;
        } catch (error) {
            // Temporary solution to remove error alerts for unreadable files
            window.alert = function () {};
            console.error(error);
            // Reset data from what was uploaded to last opened readable file
            setData(lastValidData.current);
            toaster.create({
                title: 'File Unreadable',
                description: fileName,
                type: 'error',
                closable: true,
            });
        }
    }, [data, fileName]);

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
