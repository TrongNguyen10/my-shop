
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';
import { Close, Add, Remove, Delete } from '@mui/icons-material';

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
        const cartProduct = cartProducts.find((p) => p.id == cartProductId);
        return cartProduct ? cartProduct.price * quantity : 0;
    };

    const cartTotal = cartProducts?.reduce((total, cartProduct) => total + getcartProductTotal(cartProduct.id), 0);

    const itemCounter = (arr: any, value: any) => {
        return arr.filter((x: any) => x.id == value.id).length;
    };


    // create unique cartProducts array without duplicated elements 
    let uniqueCartProducts = cartProducts?.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.id === value.id
        ))
    )

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div style={{ width: 450 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
                    <h2>Giỏ hàng</h2>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </div>
                {cartProducts?.length === 0 ? <p style={{ marginLeft: '1.5rem' }}>Chưa có sản phẩm nào .</p> : null}
                <List>
                    {uniqueCartProducts?.map((cartProduct) => (
                        <ListItem>
                            <Box component={'img'} sx={{
                                height: 35,
                                width: 30,
                                mr: 1.5
                            }} src={cartProduct.image} />
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                                <div>
                                    <ListItemText
                                        primary={cartProduct.title}
                                        sx={productTitleStyle}
                                    />
                                    <ListItemText
                                        secondary={`$${cartProduct.price}`}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <IconButton onClick={() => handleDecrease(cartProduct)}>
                                        <Remove sx={{ color: '#000' }} />
                                    </IconButton>
                                    <div>{itemCounter(cartProducts, cartProduct)}</div>
                                    <IconButton onClick={() => handleIncrease(cartProduct)}>
                                        <Add sx={{ color: '#000' }} />
                                    </IconButton>
                                    <IconButton onClick={() => handleRemove(cartProduct)}>
                                        <Delete sx={{ color: '#000' }} />
                                    </IconButton>
                                </div>
                            </div>
                        </ListItem>
                    ))}
                </List>
                <div style={{ textAlign: 'right', marginRight: 20 }}>
                    <strong>Tổng cộng: ${cartTotal?.toFixed(2)}</strong>
                </div>
            </div>
        </Drawer>
    );
};

export default Cart;
