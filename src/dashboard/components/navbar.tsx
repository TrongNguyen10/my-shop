
import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-scroll';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static" sx={{ bgcolor: '#f3f2ee', color: 'black' }}>
            <Toolbar sx={{ m: 'auto' }}>
                <Link style={{margin: '0 2rem'}} to="home-section" smooth={true} duration={500}>
                    <Button color="inherit">HOME</Button>
                </Link>
                <Link style={{margin: '0 2rem'}} to="products-section" smooth={true} duration={500}>
                    <Button color="inherit">PRODUCTS</Button>
                </Link>
                <Link style={{margin: '0 2rem'}} to="aboutus-section" smooth={true} duration={500}>
                    <Button color="inherit">ABOUT US</Button>
                </Link>
                <Link style={{margin: '0 2rem'}} to="contact-section" smooth={true} duration={500}>
                    <Button color="inherit">CONTACT</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
