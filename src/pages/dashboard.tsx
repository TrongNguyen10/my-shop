// src/components/ProductList.tsx

import { fetchProducts } from '../api';
import { useQuery } from '@tanstack/react-query';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Header from '../components/header';
import ProductNavBar from '../components/productNav';

const Dashboard: React.FC = () => {

    const [priceOrder, setPriceOrder] = useState('price-normal')

    const { data } = useQuery({
        queryKey: ['getProducts'], queryFn: fetchProducts
    });

    const [products, setProducts] = useState<object[]>([]);
    useEffect(() => {
        if (data) {
            setProducts(data);
        }
    }, [data]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 8;
    const totalPages = Math.ceil(products?.length / productsPerPage);

    const [cartProducts, setCartProducts] = useState<object[]>([]);
    const [amount, setAmount] = useState(0)

    const handleAddToCart = (product: any) => {
        cartProducts?.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        })
        setCartProducts(cartProducts)
        setAmount(cartProducts?.length)
    }

    const handlePageChange = (event: ChangeEvent, page: number = 1) => {
        setCurrentPage(page);
    };

    let displayedProducts = products?.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    var filteredProducts = [];
    const filterByCategory = (category: string) => {
        if (category == 'category-all') {
            filteredProducts = data
        } else {
            filteredProducts = data.filter((product: any) => {
                return product.category == category
            })
        }
        setProducts(filteredProducts)
        filterByPrice(priceOrder, filteredProducts)
    }

    const filterByPrice = (price: string, arr: any) => {
        setPriceOrder(price)
        filteredProducts = arr || products 
        if (price == 'price-normal') {
            filteredProducts.sort(function (a: any, b: any) { return a.id - b.id });
        } else {
            if (price == 'price-asc') {
                filteredProducts.sort(function (a: any, b: any) { return a.price - b.price });
            } else {
                filteredProducts.sort(function (a: any, b: any) { return b.price - a.price });
            }
        }
        setProducts(filteredProducts)
    }

    const searchProducts = (event: any, value: string) => {
        filteredProducts = data.filter((product: any) => { return product.title.toLowerCase().includes(value.toLowerCase()) })
        setProducts(filteredProducts)
        filterByPrice(priceOrder, filteredProducts)
    }

    const cardStyle = {
        paddingTop: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }
    const productTitleStyle = {
        fontSize: '1.2rem',
        fontWeight: 400,
        lineHeight: '1.8rem',
        height: '3.6rem',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 2,
    }

    return (
        <div>
            <Header cartProducts={cartProducts} totalCartProducts={amount} setCartProducts={setCartProducts} setAmount={setAmount} searchProducts={searchProducts} />
            <Grid sx={{ maxWidth: 1200, margin: '0 auto', paddingTop: 4 }} container spacing={2}>
                <Grid size={12}>
                    <ProductNavBar currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} filterByCategory={filterByCategory} filterByPrice={filterByPrice} />
                </Grid>
                {displayedProducts?.map((product: any) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <Card>
                            <CardMedia style={{ backgroundImage: `url(${product.image})` }} sx={cardStyle} />
                            <CardContent>
                                <Typography sx={productTitleStyle} variant="h6">{product.title}</Typography>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle1">${product.price}</Typography>
                                    <IconButton onClick={() => handleAddToCart(product)} color="primary">
                                        <AddShoppingCart />
                                    </IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
export default Dashboard;
