import { useState, createContext, useContext, useEffect } from 'react';
import initialData from '../../data/sample_data.json';

const VariableContext = createContext();

export const useVariable = () => {
    return useContext(VariableContext);
};

const VariableProvider = ({ children }) => {
    const [data, setData] = useState(initialData);
    const [selectedVariable, setSelectedVariable] = useState(null);

    const handleReadFile = (file) => {
        const reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(file);
    };

    const onReaderLoad = (event) => {
        setData(JSON.parse(event.target.result));
    };

    const variables = [];

    data.cells?.map(
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
    }, [data]);

    const getElements = () => {
        let initialElements = [];
        try {
            data.cells.map((c, i) => {
                switch (c.type) {
                    case 'springcm.Step':
                        return initialElements.push({
                            id: c.id,
                            type: 'stepNode',
                            data: {
                                label: c.name.value,
                                width: c.size.width,
                                height: c.size.height,
                                description: c.attrs['.descriptiontext'].text,
                            },
                            position: { x: c.position.x, y: c.position.y },
                        });
                    case 'springcm.Diamond':
                        return initialElements.push({
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
                        return initialElements.push({
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
                        return initialElements.push({
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
                        return initialElements.push({
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
            alert('file not readable');
        }

        return initialElements;
    };

    // Get variables
    // data.cells[140].definedVariables.value.map((v) => console.log(v.value));

    // console.log(data.cells[140].definedVariables.value[2].find(v => v=== ));

    // export const variables =
    //   data.cells[158].variableUpdates?.value[0].variableToConfigure.value.value;

    // data.cells.map(
    //   (c) =>
    //     c.variableUpdates?.value[0] &&
    //     c.variableUpdates.value.map((cv) =>
    //       console.log('id:', c.id, 'value:', cv.variableToConfigure.value.value)
    //     )
    // );

    const selectVariable = (v) => {
        console.log('run');
        setSelectedVariable(v);
    };
    const value = {
        selectedVariable,
        setSelectedVariable,
        selectVariable,
        variables,
        variableList,
        getElements,
        handleReadFile,
        onReaderLoad,
    };

    return (
        <VariableContext.Provider value={value}>
            {children}
        </VariableContext.Provider>
    );
};

export default VariableProvider;
