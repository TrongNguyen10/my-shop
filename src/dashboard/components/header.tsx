import { useState } from "react";
import {
    Badge,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Input,
} from "@mui/material";
import { Person, Search, ShoppingCart } from "@mui/icons-material";
import Cart from "./cart";
import UserMenu from "./userMenu";
import { Link } from "react-router-dom";

const toolBarStyle = {
    width: "100%",
    maxWidth: "1260px",
    margin: "0 auto",
};
const logoLinkStyle = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
};

const Header = (props: any) => {
    const [cartOpen, setCartOpen] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const handleClickUser = (event: any) => {
        setOpenUserMenu(event.currentTarget);
    };
    const closeUserMenu = () => {
        setOpenUserMenu(null);
    };

    const handleSetSearchValue = (event: any) => {
        setSearchValue(event.target.value);
        props.setSearchValue(event.target.value);
    };

    const pressEnterToSearch = (event: any) => {
        if (event.key == "Enter") props.searchProducts();
    };
    const handleSearchProducts = () => {
        props.searchProducts();
    };

    const CartProps = {
        cartProducts: props.cartProducts,
        setCartProducts: props.setCartProducts,
        setAmount: props.setAmount,
        open: cartOpen,
        onClose: () => setCartOpen(false),
    };

    return (
        <AppBar
            style={{
                backgroundColor: "#212121",
                position: "sticky",
                boxShadow: "none",
            }}
        >
            <Toolbar sx={toolBarStyle}>
                <Link to="/" style={logoLinkStyle}>
                    <img
                        style={{ maxHeight: 40, marginRight: 20 }}
                        src="/logo3.jpg"
                        alt="logo"
                    />
                    <Typography variant="h6" style={{ color: "#FFFFFF" }}>
                        NDT SHOP
                    </Typography>
                </Link>
                <div style={{ display: "flex", flex: 1, margin: "0 20%" }}>
                    <Input
                        onKeyUp={pressEnterToSearch}
                        onChange={handleSetSearchValue}
                        value={searchValue}
                        sx={{ color: "white", flex: 1 }}
                        placeholder="Search Products..."
                    />
                    <IconButton onClick={handleSearchProducts} color="inherit">
                        <Search />
                    </IconButton>
                </div>
                <div>
                    <IconButton
                        onClick={() => setCartOpen(true)}
                        style={{ marginRight: "15px" }}
                        color="inherit"
                    >
                        <Badge badgeContent={props.amount} color="error">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <Cart {...CartProps} />
                    <IconButton
                        onClick={handleClickUser}
                        edge="start"
                        color="inherit"
                    >
                        <Person />
                    </IconButton>
                    <UserMenu open={openUserMenu} onClose={closeUserMenu} />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
