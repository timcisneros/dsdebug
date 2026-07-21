import { IconButton, Menu, Portal } from '@chakra-ui/react';
import { LuSettings } from 'react-icons/lu';
import Link from 'next/link';
import GlobalSearch from '../GlobalSearch';
import UploadButton from './UploadButton';
import { useVariable } from '../../src/contexts/VariableContext';

const MoreMenu = () => {
    const { handleShowUnusedVars, unusedVarsMenuItemLabel } = useVariable();
    return (
        <Menu.Root>
            <Menu.Trigger asChild>
                <IconButton
                    aria-label="Open menu"
                    size="sm"
                    variant="ghost"
                    marginRight="1"
                >
                    <LuSettings />
                </IconButton>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content>
                <Menu.Item value="upload">
                    <UploadButton>Upload</UploadButton>
                </Menu.Item>
                <Menu.Item value="search">
                    <GlobalSearch>Search</GlobalSearch>
                </Menu.Item>
                <Menu.Item value="workflow-view" asChild>
                    <Link href="/workflows">
                        Workflow View
                    </Link>
                </Menu.Item>
                <Menu.Item value="unused-variables">
                    <div onClick={handleShowUnusedVars}>
                        {unusedVarsMenuItemLabel}
                    </div>
                </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};

export default MoreMenu;
