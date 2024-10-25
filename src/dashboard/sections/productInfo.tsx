import { useState } from 'react';
import { Breadcrumbs, Button, Typography, Card, CardMedia, Grid2, Rating } from '@mui/material';
import { cardStyle } from './dashboard';
import { Link } from 'react-router-dom';
import { Add, AddShoppingCart, Remove } from '@mui/icons-material';

var productArr: any = []

const ProductInfo = (props: any) => {
    const [quantity, setQuantity] = useState(1);

    var product = props.product

    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        productArr.push(product);
    };

    const handleDecrease = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
        productArr.pop();
    };

    const handleAddToCart = () => {
        if(quantity - productArr.length == 1) {
            productArr.push(product)
        }
        props.addToCart(productArr)
        productArr = []
    };
    return (
        <div style={{ padding: '3rem' }}>
            <div style={{ marginBottom: 30 }}>
                <Typography sx={{ mb: 1 }} variant="h5">Product Details</Typography>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link style={{ textDecoration: 'none' }} to='/my-shop'>
                        <Typography color="primary">Home</Typography>
                    </Link>
                    <Typography color="textDisabled">Product Details</Typography>
                </Breadcrumbs>
            </div>
            <Grid2 container spacing={2}>
                <Grid2 size={4}>
                    <Card>
                        <CardMedia style={{ backgroundImage: `url(${product?.image})` }} sx={cardStyle} />
                    </Card>
                </Grid2>
                <Grid2 size={8}>
                    {/* Thông tin chi tiết sản phẩm ở đây */}
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <Typography sx={{ mb: 2 }} variant="h5">{product?.title}</Typography>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Rating value={product?.rating?.rate} readOnly />
                                <Typography sx={{ ml: 1 }}>{product?.rating?.rate}</Typography>
                            </div>
                        </div>
                        <Typography variant="h6">Price: <span style={{ color: '#1976d2' }}>${product?.price}</span></Typography>
                        <div>
                            <Typography sx={{ mb: 1, fontWeight: 500 }}>Description:</Typography>
                            <Typography>{product?.description}</Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography sx={{ mr: 2, fontWeight: 500 }}>Quantity:</Typography>
                            <Button variant='outlined' onClick={handleDecrease}>
                                <Remove sx={{ color: '#000' }} />
                            </Button>
                            <span style={{ margin: '0 1rem' }}>{quantity}</span>
                            <Button variant='outlined' onClick={handleIncrease}>
                                <Add sx={{ color: '#000' }} />
                            </Button>
                        </div>
                        <Typography><span style={{ fontWeight: 500 }}>Category:</span> {product?.category}</Typography>

                        <Button sx={{ maxWidth: 180 }} variant="contained" color="primary" onClick={handleAddToCart}>
                            <AddShoppingCart sx={{ mr: 1 }} /> Add to Cart
                        </Button>
                    </div>
                </Grid2>
            </Grid2>
        </div>
    )
}

export default ProductInfo
