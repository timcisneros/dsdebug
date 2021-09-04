import { IconButton } from '@chakra-ui/button';
import { SearchIcon, SettingsIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/menu';
import UploadButton from './UploadButton';

const MoreMenu = () => {
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
                <MenuItem icon={<SearchIcon />}>Search</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default MoreMenu;
