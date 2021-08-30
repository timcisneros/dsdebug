import { ReactFlowProvider } from 'react-flow-renderer';
import Flow from '../components/Flow';
import SideBar from '../components/SideBar';
import UploadButton from '../components/UploadButton';
import VariableProvider from '../src/contexts/VariableContext';

export default function Home() {
    return (
        <ReactFlowProvider>
            <VariableProvider>
                <UploadButton />
                <Flow />
                <SideBar />
            </VariableProvider>
        </ReactFlowProvider>
    );
}
