import Link from 'next/link';
import Flow from '../components/Flow';
import SideBar from '../components/SideBar';
import SubSideBar from '../components/SubSideBar';
import UploadButton from '../components/UploadButton';

export default function Home() {
    return (
        <>
            {/* <Link href="/workflows">
                <a>Workflows</a>
            </Link> */}
            <UploadButton />
            <Flow />
            <SubSideBar />
            <SideBar />
        </>
    );
}
