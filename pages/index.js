import Flow from '../components/Flow';
import SideBar from '../components/SideBar';
import UploadButton from '../components/UploadButton';
import WorkflowSelect from '../components/WorkflowSelect';

export default function Home() {
    return (
        <>
            <UploadButton />
            <WorkflowSelect />
            <Flow />
            <SideBar />
        </>
    );
}
