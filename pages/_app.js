import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ReactFlowProvider } from '@xyflow/react';
import DataProvider from '../src/contexts/DataContext';
import VariableProvider from '../src/contexts/VariableContext';
import ElementProvider from '../src/contexts/ElementContext';
import { Toaster } from '../components/ui/Toaster';
import '../styles/globals.css';
import '@xyflow/react/dist/style.css';

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider value={defaultSystem}>
            <ReactFlowProvider>
                <DataProvider>
                    <ElementProvider>
                        <VariableProvider>
                            <Component {...pageProps} />
                        </VariableProvider>
                    </ElementProvider>
                </DataProvider>
            </ReactFlowProvider>
            <Toaster />
        </ChakraProvider>
    );
}

export default MyApp;
