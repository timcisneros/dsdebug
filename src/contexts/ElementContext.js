import { useState, createContext, useContext } from 'react';
import { useData } from './DataContext';

const ElementContext = createContext();

export const useElement = () => {
    return useContext(ElementContext);
};

const ElementProvider = ({ children }) => {
    const [elements, setElements] = useState([]);
    const [activeElements, setActiveElements] = useState([]);

    const { data } = useData();

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
                                documents: c.documents,
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

    console.log(activeElements);

    const value = {
        elements,
        setElements,
        activeElements,
        setActiveElements,
        getElements,
    };

    return (
        <ElementContext.Provider value={value}>
            {children}
        </ElementContext.Provider>
    );
};

export default ElementProvider;
