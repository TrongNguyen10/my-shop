// Cart.tsx

import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Close, Add, Remove, Delete } from '@mui/icons-material';

interface cartProduct {
    id: number;
    title: string;
    price: number;
    image: string;
}

interface CartProps {
    cartProducts: cartProduct[];
    open: boolean;
    onClose: () => void;
    setAmount: (amount: number) => void;
    setCartProducts: ([]) => void;
}

const Cart: React.FC<CartProps> = ({ cartProducts, open, onClose, setAmount, setCartProducts }) => {
    const [quantities, setQuantities] = useState<{ [cartProductId: number]: number }>({});

    const handleIncrease = (cartProduct: any) => {
        cartProducts.push(cartProduct)
        setCartProducts(cartProducts)
        setAmount(cartProducts.length)
    };

    const handleDecrease = (cartProduct: any) => {
        cartProducts.splice(cartProducts.indexOf(cartProduct), 1)
        setCartProducts(cartProducts)
        setAmount(cartProducts.length)
    };

    const handleRemove = (cartProduct: any) => {
        uniqueCartProducts.splice(uniqueCartProducts.indexOf(cartProduct), 1)
        cartProducts = cartProducts.filter((item) => item.id !== cartProduct.id)
        setCartProducts(cartProducts)
        setAmount(cartProducts.length)
    };

    const getcartProductTotal = (cartProductId: number) => {
        const quantity = quantities[cartProductId] || 1;
        const cartProduct = cartProducts.find((p) => p.id === cartProductId);
        return cartProduct ? cartProduct.price * quantity : 0;
    };

    const itemCounter = (arr: any, value: any) => {
        return arr.filter((x: any) => x.id == value.id).length;
    };

    const cartTotal = cartProducts?.reduce((total, cartProduct) => total + getcartProductTotal(cartProduct.id), 0);

    const productTitleStyle = {
        margin: 0,
        lineHeight: '2rem',
        maxHeight: '4rem',
        flex: 1,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
        textAlign: 'left',
    }
    // create unique cartProducts array without duplicated elements 
    let uniqueCartProducts = cartProducts.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    )

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ width: 350 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </div>
                <h2 style={{ marginLeft: 20 }}>Giỏ hàng</h2>
                {cartProducts?.length === 0 ? <p style={{ marginLeft: 20 }}>Chưa có sản phẩm nào .</p> : null}
                <List>
                    {uniqueCartProducts?.map((cartProduct) => (
                        <ListItem className={`cartItem-${cartProduct.id}`} key={cartProduct.id}>
                            <Box component={'img'} sx={{
                                height: 35,
                                width: 30,
                                marginRight: 2
                            }} src={cartProduct.image} />
                            <div>
                                <ListItemText
                                    primary={cartProduct.title}
                                    sx={productTitleStyle}
                                />
                                <ListItemText
                                    secondary={`$${cartProduct.price}`}
                                />
                            </div>
                            <IconButton onClick={() => handleDecrease(cartProduct)}>
                                <Remove />
                            </IconButton>
                            <div>{itemCounter(cartProducts, cartProduct)}</div>
                            <IconButton onClick={() => handleIncrease(cartProduct)}>
                                <Add />
                            </IconButton>
                            <IconButton onClick={() => handleRemove(cartProduct)}>
                                <Delete />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                <div style={{ textAlign: 'right', padding: '10px' }}>
                    <strong>Tổng cộng: ${cartTotal.toFixed(2)}</strong>
                </div>
            </div>
        </Drawer>
    );
};

export default Cart;
