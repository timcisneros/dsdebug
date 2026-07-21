import Link from 'next/link';
import { useData } from '../../src/contexts/DataContext';
import WorkflowItem from '../../components/WorkflowItem';
import { LuArrowLeft } from 'react-icons/lu';
import { Grid, GridItem, IconButton } from '@chakra-ui/react';

const Workflows = () => {
    const { dataList } = useData();
    return (
        <div>
            <Link href="/">
                <IconButton aria-label="Back to workflow">
                    <LuArrowLeft />
                </IconButton>
            </Link>
            <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                {dataList.map((dl) => (
                    <GridItem key={dl.name}>
                        <WorkflowItem name={dl.name} />
                    </GridItem>
                ))}
            </Grid>
        </div>
    );
};

export default Workflows;
