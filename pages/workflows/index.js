import Link from 'next/link';
import { useData } from '../../src/contexts/DataContext';
import WorkflowItem from '../../components/WorkflowItem';
import { IconButton } from '@chakra-ui/button';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { Grid, GridItem } from '@chakra-ui/react';

const Workflows = () => {
    const { dataList } = useData();
    return (
        <div>
            <Link href="/" passHref>
                <IconButton icon={<ArrowLeftIcon />} />
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
