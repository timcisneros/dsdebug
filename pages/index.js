import Flow from '../components/Flow';
import GlobalSearch from '../components/GlobalSearch';
import SideBar from '../components/SideBar';
import SubSideBar from '../components/SubSideBar';
import Test from '../Test';

export default function Home() {
    return (
        <>
            {/* <Test /> */}
            <Flow />
            <SubSideBar />
            <SideBar />
            <GlobalSearch />
        </>
    );
}
