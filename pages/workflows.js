import Link from 'next/link';
import { useVariable } from '../src/contexts/VariableContext';
import WorkflowItem from '../components/WorkflowItem';
import { IconButton } from '@chakra-ui/button';
import { ArrowLeftIcon } from '@chakra-ui/icons';
import { Grid, GridItem } from '@chakra-ui/react';

const Workflows = () => {
    const { dataList } = useVariable();
    return (
        <div>
            <Link href="/">
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
