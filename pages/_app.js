import { ChakraProvider } from '@chakra-ui/react';
import { ReactFlowProvider } from 'react-flow-renderer';
import VariableProvider from '../src/contexts/VariableContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <ReactFlowProvider>
                <VariableProvider>
                    <Component {...pageProps} />
                </VariableProvider>
            </ReactFlowProvider>
        </ChakraProvider>
    );
}

export default MyApp;
