import {
    useState,
    createContext,
    useContext,
    useEffect,
    createRef,
} from 'react';
import initialData from '../../data/sample_data.json';

const VariableContext = createContext();

export const useVariable = () => {
    return useContext(VariableContext);
};

const VariableProvider = ({ children }) => {
    const [dataList, setDataList] = useState([]);
    const [data, setData] = useState(initialData);
    const [selectedVariable, setSelectedVariable] = useState(null);
    const [elements, setElements] = useState([]);
    const [activeElements, setActiveElements] = useState([]);

    const handleReadFile = (files) => {
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = onReaderLoad;
            reader.readAsText(files[i]);
        }
    };

    const onReaderLoad = (event) => {
        setData(JSON.parse(event.target.result));
    };

    const variables = [];

    data.cells.map(
        (c) =>
            c.variableUpdates &&
            c.variableUpdates.value.map((cv) =>
                variables.push({
                    id: c.id,
                    value: cv.variableToConfigure.value.value,
                })
            )
    );

    const variableList = Array.from(
        new Set(variables.map((v) => v.value).sort())
    );

    useEffect(() => {
        getElements();
        const startActivity = data.cells.find(
            (c) => c.activityName === 'StartActivity'
        );

        const allDataList = [
            { name: startActivity.workflowName.value, data },
            ...dataList,
        ];

        const filteredDataList = allDataList.filter(
            (adlf, i) =>
                allDataList.map((adlm) => adlm.name).indexOf(adlf.name) === i
        );

        setDataList(filteredDataList);
    }, [data]);

    const getElements = () => {
        let mappedElements = [];
        try {
            data.cells.map((c, i) => {
                switch (c.type) {
                    case 'springcm.Step':
                        return mappedElements.push({
                            id: c.id,
                            type: 'stepNode',
                            data: {
                                label: c.name.value,
                                width: c.size.width,
                                height: c.size.height,
                                description: c.attrs['.descriptiontext'].text,
                                vars: c.variableUpdates,
                                all: c,
                            },
                            position: { x: c.position.x, y: c.position.y },
                        });
                    case 'springcm.Diamond':
                        return mappedElements.push({
                            id: c.id,
                            type: 'diamondNode',
                            data: {
                                label: c.name.value,
                                width: c.size.width,
                                height: c.size.height,
                                description: c.attrs['.descriptiontext'].text,
                            },
                            position: { x: c.position.x, y: c.position.y },
                        });
                    case 'springcm.Circle':
                        return mappedElements.push({
                            id: c.id,
                            type: 'circleNode',
                            data: {
                                label: c.name.value,
                                width: c.size.width,
                                height: c.size.height,
                            },
                            position: { x: c.position.x, y: c.position.y },
                        });
                    case 'springcm.Group':
                        return mappedElements.push({
                            id: c.id,
                            type: 'groupNode',
                            data: {
                                label: c.name.value,
                                width: c.size.width,
                                height: c.size.height,
                            },
                            position: { x: c.position.x, y: c.position.y },
                        });
                    case 'springcm.Link':
                        return mappedElements.push({
                            id: `e-${i}`,
                            type: 'straight',
                            source: c.source.id,
                            target: c.target.id,
                            animated: 'true',
                            label:
                                c.output?.type !== 'Reference' &&
                                c.output?.value,
                        });
                    default:
                        'skip';
                }
            });
        } catch (error) {
            alert(error);
        }

        setElements(mappedElements);
    };

    const getElementsFromVariable = () => {
        const variableData = variables
            .filter((vs) => vs.value === selectedVariable)
            .map((vd) => vd.id);

        const filteredElements = elements.filter((e) =>
            variableData.includes(e.id)
        );

        setActiveElements(filteredElements);
    };

    const selectVariable = (v) => {
        setSelectedVariable(v);
    };
    const value = {
        data,
        setData,
        selectedVariable,
        setSelectedVariable,
        selectVariable,
        elements,
        setElements,
        activeElements,
        setActiveElements,
        variables,
        variableList,
        getElements,
        handleReadFile,
        onReaderLoad,
        dataList,
        getElementsFromVariable,
    };

    return (
        <VariableContext.Provider value={value}>
            {children}
        </VariableContext.Provider>
    );
};

export default VariableProvider;
