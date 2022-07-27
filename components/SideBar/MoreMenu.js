import { IconButton } from '@chakra-ui/button';
import { SearchIcon, SettingsIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/menu';
import Link from 'next/link';
import GlobalSearch from '../GlobalSearch';
import UploadButton from './UploadButton';
import { useVariable } from '../../src/contexts/VariableContext';

const MoreMenu = () => {
    const { handleShowUnusedVars, unusedVarsMenuItemLabel } = useVariable();
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<SettingsIcon />}
                size="sm"
                variant="ghost"
                marginRight="1"
                iconSpacing="-10"
            />
            <MenuList>
                <MenuItem>
                    <UploadButton>Upload</UploadButton>
                </MenuItem>
                <MenuItem>
                    <GlobalSearch>Search</GlobalSearch>
                </MenuItem>
                <MenuItem>
                    <Link href="/workflows">
                        <a>Workflow View</a>
                    </Link>
                </MenuItem>
                <MenuItem>
                    <div onClick={handleShowUnusedVars}>
                        {unusedVarsMenuItemLabel}
                    </div>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default MoreMenu;
