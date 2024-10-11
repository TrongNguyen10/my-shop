// src/components/Navbar.tsx

import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import Link from '@mui/material/Link';


const Navbar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Link href="/">
                    <Button color="inherit">HOME</Button>
                </Link>
                <Link href="/">
                    <Button color="inherit">ABOUT</Button>
                </Link>
                <Link href="/">
                    <Button color="inherit">CONTACT</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
