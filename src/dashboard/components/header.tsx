
import { useState } from 'react';
import { Badge, AppBar, Toolbar, Typography, IconButton, Input } from '@mui/material';
import { Person, Search, ShoppingCart } from '@mui/icons-material';
import Cart from "./cart"
import UserMenu from "./userMenu"
import { Link } from 'react-scroll';

const toolBarStyle = {
    '& .MuiToolbar-root': {
        padding: '0 !important'
    },
    width: "100%", 
    maxWidth: "1260px", 
    margin: "0 auto"
}

const Header = (props: any) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(null);
    const [searchValue, setSearchValue] = useState('')

    const handleClickUser = (event: any) => {
        setOpenUserMenu(event.currentTarget);
    };
    const closeUserMenu = () => {
        setOpenUserMenu(null);
    };

    const handleSetSearchValue = (event: any) => {
        setSearchValue(event.target.value)
        props.setSearchValue(event.target.value)
    }

    const pressEnterToSearch = (event: any) => {
        if (event.key == 'Enter') props.searchProducts()
    }
    const handleSearchProducts = () => {
        props.searchProducts()
    }

    const CartProps = {
        cartProducts: props.cartProducts,
        setCartProducts: props.setCartProducts,
        setAmount: props.setAmount,
        open: cartOpen,
        onClose: () => setCartOpen(false)
    }

    return (
        <AppBar style={{ backgroundColor: '#212121', position: 'sticky', boxShadow: 'none' }}>
            <Toolbar sx={toolBarStyle}>
                <Link to="#" smooth={true} duration={500}>
                    <img style={{ maxHeight: 40, marginRight: 20 }} src="https://private-user-images.githubusercontent.com/83052755/380417031-f97718e2-96f9-4ad8-8c58-ed743e1b0f51.JPG?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Mjk5NjI5NDIsIm5iZiI6MTcyOTk2MjY0MiwicGF0aCI6Ii84MzA1Mjc1NS8zODA0MTcwMzEtZjk3NzE4ZTItOTZmOS00YWQ4LThjNTgtZWQ3NDNlMWIwZjUxLkpQRz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEwMjYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMDI2VDE3MTA0MlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY5MjM2ZGExNGZhNGMxNmEwNWE0NmMxM2MwY2I0ODkyNmIzYmFhMjIzOTY5NjBjYzQ5YTBiM2I3YWM3MmIxMWImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.HxIMUCAqIYCp7llZBUnxaErr6fxsZH7qEZt9o5tDkXg" alt="logo" />
                </Link>
                <Typography variant="h6" style={{ color: '#FFFFFF' }}>
                    NDT SHOP
                </Typography>
                <div style={{ display: "flex", flex: 1, margin: "0 20%" }}>
                    <Input onKeyUp={pressEnterToSearch} onChange={handleSetSearchValue} value={searchValue} sx={{ color: "white", flex: 1 }} placeholder="Search Products..." />
                    <IconButton onClick={handleSearchProducts} color="inherit">
                        <Search />
                    </IconButton>
                </div>
                <div>
                    <IconButton onClick={() => setCartOpen(true)} style={{ marginRight: "15px" }} color="inherit">
                        <Badge badgeContent={props.amount} color="error">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <Cart {...CartProps} />
                    <IconButton onClick={handleClickUser} edge="start" color="inherit">
                        <Person />
                    </IconButton>
                    <UserMenu open={openUserMenu} onClose={closeUserMenu} />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
