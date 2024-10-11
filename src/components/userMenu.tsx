// src/components/UserMenu.tsx

import React, { useState } from 'react';
import LoginForm from './loginForm'; // Đảm bảo bạn đã tạo component LoginForm
import { Menu, MenuItem } from '@mui/material';
import { Login, Logout } from '@mui/icons-material';
interface userMenuProps {
    open: any; // Trạng thái hiển thị của Popover
    onClose: () => void;
}

const UserMenu: React.FC<userMenuProps> = ({ open, onClose }) => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const handleLoginClick = () => {
        setShowLoginForm(true);
    };

    const handleLogoutClick = () => {
        setLoggedIn(false)
        alert('Đã đăng xuất !')
    }

    const loginItemStyle = loggedIn ? {
        display: 'none'
    } : {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'space-between',
    }

    const logoutItemStyle = loggedIn ? {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'space-between',
    } : {
        display: 'none'
    }

    const handleAdminClick = () => {
        // Chuyển sang trang Admin (hoặc thực hiện hành động tương ứng)
    };

    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={open}
                open={!!open}
                onClose={onClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem sx={loginItemStyle} onClick={handleLoginClick}>Đăng nhập <Login /></MenuItem>
                <MenuItem sx={logoutItemStyle} onClick={handleLogoutClick}>Đăng xuất <Logout /></MenuItem>
                <MenuItem onClick={handleAdminClick}>Quản lí hệ thống</MenuItem>
            </Menu>
            <LoginForm open={showLoginForm} onClose={() => setShowLoginForm(false)} setLoggedIn={setLoggedIn} loggedIn={loggedIn} /> {/* Hiển thị form Đăng nhập khi cần */}
        </>
    );
};

export default UserMenu;
