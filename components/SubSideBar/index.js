import { useElement } from '../../src/contexts/ElementContext';
import { useVariable } from '../../src/contexts/VariableContext';
import SubSideBarItem from '../SubSideBar/SubSideBarItem';

const SubSideBar = () => {
    const { selectedVariable } = useVariable();
    const { activeElements } = useElement();

    return (
        <div
            style={{
                display: !selectedVariable && 'none',
                zIndex: 1000,
                position: 'absolute',
                top: 0,
                right: 300,
                backgroundColor: '#ffffffe8',
                height: '100vh',
                overflowY: 'scroll',
                overflowX: 'hidden',
                borderLeft: '1px solid #e0e0e0',
                width: 300,
                textOverflow: 'ellipsis',
            }}
        >
            {activeElements?.map((ae, i) => (
                <div key={i}>
                    <h1
                        style={{
                            padding: 10,
                            fontSize: '18px',
                            fontWeight: 'bold',
                        }}
                    >
                        {ae.data.label}
                    </h1>
                    <div>
                        {ae.data.vars?.value.map((v, i) => {
                            let varConfigure =
                                v.variableToConfigure.value.value;
                            let varValue = v.variableValue.value.value;
                            const varType = v.variableValue.type;
                            if (varType === 'String') {
                                varValue = v.variableValue.value;
                            } else if (varType === 'Expression') {
                                varValue = v.variableValue.value.code;
                            }
                            return (
                                <SubSideBarItem
                                    key={i}
                                    itemConfigure={varConfigure}
                                    itemValue={varValue}
                                    selectedVariable={selectedVariable}
                                    type={varType}
                                />
                            );
                        })}

                        {ae.data.document?.value.map((d, i) => {
                            const docConfigure = `${ae.data.document.type} [${d.type}]`;
                            //d.value.value if using a variable, d.value if set by path or doc id
                            const docValue = d.value.value || d.value;
                            return (
                                <SubSideBarItem
                                    key={i}
                                    itemConfigure={docConfigure}
                                    itemValue={docValue}
                                    selectedVariable={selectedVariable}
                                />
                            );
                        })}
                        {ae.data.folder?.value &&
                            (function () {
                                const f = ae.data.folder.value;
                                const folderConfigure = `Folder: ${ae.data.folder.type} [${f.type}]`;
                                const folderValue = f.value;
                                return (
                                    <SubSideBarItem
                                        key={ae.id}
                                        itemConfigure={folderConfigure}
                                        itemValue={folderValue}
                                        selectedVariable={selectedVariable}
                                    />
                                );
                            })()}
                        {ae.data.outputVariable?.value &&
                            (function () {
                                const ov = ae.data.outputVariable.value;
                                const outputVariableConfigure = `Output Variable: ${ae.data.outputVariable.type} [${ov.type}]`;
                                const outputVariableValue = ov.value;
                                return (
                                    <SubSideBarItem
                                        key={`ov${ae.id}`}
                                        itemConfigure={outputVariableConfigure}
                                        itemValue={outputVariableValue}
                                        selectedVariable={selectedVariable}
                                    />
                                );
                            })()}
                        {ae.data.outputDocument?.value &&
                            (function () {
                                const od = ae.data.outputDocument.value;
                                const outputDocumentConfigure = `Output Document: ${ae.data.outputDocument.type} [${od.type}]`;
                                const outputDocumentValue = od.value;
                                return (
                                    <SubSideBarItem
                                        key={`od${ae.id}`}
                                        itemConfigure={outputDocumentConfigure}
                                        itemValue={outputDocumentValue}
                                        selectedVariable={selectedVariable}
                                    />
                                );
                            })()}
                        {ae.data.parentFolder?.value &&
                            (function () {
                                const pf = ae.data.parentFolder.value[0];
                                const parentFolderConfigure = `Parent Folder: ${ae.data.parentFolder.type} [${pf.type}]`;
                                const parentFolderValue =
                                    pf.value.value || pf.value;
                                return (
                                    <SubSideBarItem
                                        key={`pf${ae.id}`}
                                        itemConfigure={parentFolderConfigure}
                                        itemValue={parentFolderValue}
                                        selectedVariable={selectedVariable}
                                    />
                                );
                            })()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubSideBar;
