
import { Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const UserMenu = (props: any) => {
    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={props.open}
                open={!!props.open}
                onClose={props.onClose}
            >
                <MenuItem onClick={props.onclose}><Link style={{ textDecoration: 'none', color: '#000' }} to='/my-shop/admin' target='_blank'>Quản lí hệ thống</Link></MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
