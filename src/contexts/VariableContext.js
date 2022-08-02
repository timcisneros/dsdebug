import { useState, createContext, useContext, useEffect } from 'react';
import { useData } from './DataContext';
import { useElement } from './ElementContext';

const VariableContext = createContext();

export const useVariable = () => {
    return useContext(VariableContext);
};

const VariableProvider = ({ children }) => {
    const [selectedVariable, setSelectedVariable] = useState(null);
    const [variables, setVariables] = useState([]);
    const [variableList, setVariableList] = useState([]);
    const [unusedVars, setUnusedVars] = useState(true);
    const [unusedVarsMenuItemLabel, setUnusedVarsMenuItemLabel] =
        useState('Show Unused Vars');

    const {
        data,
        setData,
        workflowName,
        getAddedWorkflowNames,
        definedVariables,
    } = useData();
    const { elements, setActiveElements, getElements } = useElement();

    // Used for uploading a file
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
    //

    // Used for show/hide unused vars menu option
    useEffect(() => {
        setUnusedVarsMenuItemLabel(
            unusedVars ? 'Show Unused Vars' : 'Hide Unused Vars'
        );
    }, [unusedVars]);

    const handleShowUnusedVars = () => {
        setUnusedVars(!unusedVars);
    };
    //

    const getStepVariables = () => {
        const vars = [];

        const varValues = [];

        data.cells.map(
            (c) =>
                c.type === 'springcm.Step' &&
                vars.push({
                    id: c.id,
                    stepName: c.name.value,
                    // Push user defined variables to variable value list
                    values:
                        (c.variableUpdates?.value &&
                            c.variableUpdates.value.map((cv) =>
                                varValues.push({
                                    id: c.id,
                                    name: cv.variableToConfigure.value.value,
                                    type: cv.variableValue.type,
                                    value:
                                        cv.variableValue.value.value ||
                                        cv.variableValue.value.code ||
                                        cv.variableValue.value,
                                })
                            )) ||
                        '',
                    metadata: c.metadata?.value || '',
                    folder:
                        c.outputFolders?.value &&
                        varValues.push({
                            id: c.id,
                            name: c.outputFolders.value.value,
                            type: c.outputFolders.type,
                            value: c.outputFolders.value.value,
                        }),
                    // Push a document to variable value list
                    document:
                        c.documents?.value.length > 1
                            ? 'ERROR: MORE THAN ONE DOCUMENT FOUND'
                            : (c.documents?.value[0].value.value &&
                                  varValues.push({
                                      id: c.id,
                                      name: c.documents?.value[0].value.value,
                                      type: c.documents?.type,
                                      value:
                                          c.variableValue?.value.value ||
                                          c.variableValue?.value ||
                                          // Probably want to separate finding documents from steps into it's own category rather than lumping all var scrapes together. (I'm grabbing the same value twice in 'name' and 'value' keys)
                                          c.documents.value[0].value.value ||
                                          'No Value',
                                  })) ||
                              '',
                    outputVariable:
                        c.valueVariable?.value &&
                        varValues.push({
                            id: c.id,
                            name: c.valueVariable.value.value,
                            type: c.valueVariable.type,
                            value: c.valueVariable.value.value,
                        }),
                    outputDocuments:
                        c.outputDocuments?.value &&
                        varValues.push({
                            id: c.id,
                            name: c.outputDocuments.value.value,
                            type: c.outputDocuments.type,
                            value: c.outputDocuments.value.value,
                        }),
                    parentFolder:
                        c.parentFolder?.value &&
                        varValues.push({
                            id: c.id,
                            name: c.parentFolder.value.value,
                            type: c.parentFolder.type,
                            value: c.parentFolder.value.value,
                        }),
                    // possibly add subject, sender, recipient, and notes from Email step in the future
                })
        );
        // Set list of variables found in JSON data
        setVariables(varValues);

        // Set list of all defined variables in workflow
        setVariableList(definedVariables);
    };

    // Runs when workflow is changed from dropdown
    useEffect(() => {
        if (data) {
            getAddedWorkflowNames();
            getElements();
        }
    }, [data]);
    //

    useEffect(() => {
        getStepVariables();
    }, [workflowName]);

    // Handles higlighting steps when a variable is selected
    const getElementsFromVariable = () => {
        const variableData = variables
            .filter(
                (vs) =>
                    // For matching whole word (selectedVariable) with variable config name or value, maybe remove if this matches to variables with similar names (ex: var and var_1) REFACTOR later, this same logic is being repeated here, SubSideBarItem, and SideBar > index
                    new RegExp(`\\b${selectedVariable}\\b`).test(vs.name) ||
                    new RegExp(`\\b${selectedVariable}\\b`).test(vs.value)
            )
            .map((vd) => vd.id);

        const filteredElements = elements.filter((e) =>
            variableData.includes(e.id)
        );
        setActiveElements(filteredElements);
    };
    //

    const selectVariable = (v) => {
        setSelectedVariable(v);
    };

    const value = {
        selectedVariable,
        selectVariable,
        variables,
        variableList,
        handleReadFile,
        onReaderLoad,
        getElementsFromVariable,
        handleShowUnusedVars,
        unusedVars,
        unusedVarsMenuItemLabel,
    };

    return (
        <VariableContext.Provider value={value}>
            {children}
        </VariableContext.Provider>
    );
};

export default VariableProvider;
