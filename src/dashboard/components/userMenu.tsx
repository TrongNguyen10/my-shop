
import { Menu, MenuItem, Link } from '@mui/material';

const UserMenu = (props: any) => {
    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={props.open}
                open={!!props.open}
                onClose={props.onClose}
            >
                <MenuItem onClick={props.onclose}><Link sx={{ textDecoration: 'none', color: '#000' }} href='admin' target='_blank'>Quản lí hệ thống</Link></MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
