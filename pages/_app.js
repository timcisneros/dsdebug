import { ChakraProvider } from '@chakra-ui/react';
import { ReactFlowProvider } from 'react-flow-renderer';
import DataProvider from '../src/contexts/DataContext';
import VariableProvider from '../src/contexts/VariableContext';
import ElementProvider from '../src/contexts/ElementContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <ReactFlowProvider>
                <DataProvider>
                    <ElementProvider>
                        <VariableProvider>
                            <Component {...pageProps} />
                        </VariableProvider>
                    </ElementProvider>
                </DataProvider>
            </ReactFlowProvider>
        </ChakraProvider>
    );
}

export default MyApp;
