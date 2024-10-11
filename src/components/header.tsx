// Header.tsx

import React, { useState } from 'react';
import { Badge, AppBar, Toolbar, Typography, IconButton, Input } from '@mui/material';
import { Person, Search, ShoppingCart } from '@mui/icons-material';
import Cart from "./cart"
import UserMenu from "./userMenu"

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

    return (
        <AppBar style={{ backgroundColor: '#2C3E50', position: 'relative' }}>
            <Toolbar style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
                <div>
                    <Typography variant="h6" style={{ color: '#FFFFFF' }}>
                        NDT SHOP
                    </Typography>
                </div>
                <div style={{ display: "flex", flex: 1, margin: "0 20%" }}>
                    <Input onChange={(event) => setSearchValue(event.target.value)} value={searchValue} sx={{ color: "white", flex: 1 }} placeholder="Search Products..." />
                    <IconButton onClick={(event) => props.searchProducts(event, searchValue)} color="inherit">
                        <Search />
                    </IconButton>
                </div>
                <div>
                    <IconButton onClick={() => setCartOpen(true)} style={{ marginRight: "15px" }} color="inherit">
                        <Badge badgeContent={props.totalCartProducts} color="error">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <Cart cartProducts={props.cartProducts} setCartProducts={props.setCartProducts} setAmount={props.setAmount} open={cartOpen} onClose={() => setCartOpen(false)} />
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
