
import { fetchProducts } from '../../api';
import { useQuery } from '@tanstack/react-query';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Header from '../components/header';
import ProductNavBar from '../components/productNav';
import Navbar from '../components/navbar';
import Slider from '../components/slider';
import Contact from './contact';
import AboutUs from './about';
import Footer from './footer';

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

const Dashboard: React.FC = () => {

    const [priceOrder, setPriceOrder] = useState('price-normal')

    const [categoryProducts, setCategoryProducts] = useState([])

    const [searchedProducts, setSearchedProducts] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        if(!searchValue) setSearchedProducts([])
    }, [searchValue])

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

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
        setCategoryProducts(filteredProducts)
        filterByPriceRange(minPrice, maxPrice, filteredProducts)
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

    const filterByPriceRange = (minPrice: any, maxPrice: any, arr: any) => {
        filteredProducts = arr || (!!searchValue ? searchedProducts : categoryProducts)

        if (minPrice || maxPrice) {
            if (!minPrice) {
                filteredProducts = filteredProducts.filter((product: any) => {
                    return product.price <= maxPrice
                })
            } else if (!maxPrice) {
                filteredProducts = filteredProducts.filter((product: any) => {
                    return product.price >= minPrice
                })
            } else {
                filteredProducts = filteredProducts.filter((product: any) => {
                    return product.price >= minPrice && product.price <= maxPrice
                })
            }
        }
        filterByPrice(priceOrder, filteredProducts)
    }

    const searchProducts = (event: any, value: string) => {

        filteredProducts = data.filter((product: any) => {
            return product.title.toLowerCase().includes(value.toLowerCase()) ||
                product.category.toLowerCase().includes(value.toLowerCase())
        })

        setSearchedProducts(filteredProducts)
        filterByPriceRange(minPrice, maxPrice, filteredProducts)
        filterByPrice(priceOrder, filteredProducts)

        document.getElementById('products-section')?.scrollIntoView({
            behavior: "smooth",
        })
    }

    const productNavProps = {
        currentPage,
        totalPages,
        handlePageChange,
        filterByCategory,
        filterByPrice,
        filterByPriceRange,
        setPriceOrder,
        setMinPrice,
        setMaxPrice,
    };

    const headerProps = {
        cartProducts,
        amount,
        setCartProducts,
        setAmount,
        searchProducts,
        setSearchValue
    }

    return (
        <div>
            <Header {...headerProps} />
            <Navbar />
            <Slider />
            <AboutUs />
            <div style={{ backgroundColor: '#f6f6f6', padding: '5rem 0' }}>
                <Grid sx={{ maxWidth: 1200, margin: 'auto' }} container spacing={2}>
                    <Grid size={12}>
                        <Typography id='products-section' sx={{ textAlign: 'center', transform: 'translateY(-90%)' }} variant="h5">All Products</Typography>
                    </Grid>
                    <Grid size={12}>
                        <ProductNavBar {...productNavProps} />
                        {searchedProducts.length ? <Typography sx={{ mt: 1.5 }}>Kết quả tìm kiếm cho <span style={{color: 'red'}}>{searchValue}</span></Typography> : null}
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
            <Contact />
            <Footer />
        </div>
    );
};
export default Dashboard;
