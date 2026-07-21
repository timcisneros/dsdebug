import Flow from '../components/Flow';
import GlobalSearch from '../components/GlobalSearch';
import SideBar from '../components/SideBar';
import SubSideBar from '../components/SubSideBar';

export default function Home() {
    return (
        <>
            <Flow />
            <SubSideBar />
            <SideBar />
            <GlobalSearch />
        </>
    );
}
