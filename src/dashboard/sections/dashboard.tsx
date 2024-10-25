
import { productsAPI } from '../../api';
import { useQuery } from '@tanstack/react-query';
import React, { useState, ChangeEvent, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import ProductInfo from './productInfo';
import DashboardBody from './dashboardBody';

export const cardStyle = {
    paddingTop: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
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

    const [category, setCategory] = useState('category-all')
    const [categoryProducts, setCategoryProducts] = useState([])

    const [searchedProducts, setSearchedProducts] = useState([])
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        if (!searchValue) setSearchedProducts([])
    }, [searchValue])

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const query = useQuery({
        queryKey: ['getProducts'], queryFn: async () => {
            const response = await axios.get(productsAPI)
            return response.data
        }
    });

    const [allProducts, setAllProducts] = useState([]);
    // products: biến dùng để tính displayedProducts => hiển thị ra màn hình
    const [products, setProducts] = useState<object[]>([]);
    useEffect(() => {
        if (query.data) {
            setProducts(query.data);
            setAllProducts(query.data)
        }
    }, [query.data]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 8;
    const totalPages = Math.ceil(products?.length / productsPerPage);

    const [cartProducts, setCartProducts] = useState<object[]>([]);
    const [amount, setAmount] = useState(0)

    const handleAddToCart = (product: any) => {
        Array.isArray(product) ? cartProducts?.push(...product) : cartProducts?.push(product)
        setCartProducts(cartProducts)
        setAmount(cartProducts?.length)
        console.log(cartProducts)
    }

    const handlePageChange = (event: ChangeEvent, page: number = 1) => {
        setCurrentPage(page);
    };

    var filteredProducts = [];
    const filterByCategory = (category: string) => {
        setCategory(category)
        if (category == 'category-all') {
            filteredProducts = allProducts
        } else {
            filteredProducts = allProducts.filter((product: any) => {
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
        setDisplayedProducts(products?.slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
        ))
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

    const searchProducts = () => {

        if (!searchValue.trim()) {
            filterByCategory(category)
            return
        }

        filteredProducts = allProducts.filter((product: any) => {
            return product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                product.category.toLowerCase().includes(searchValue.toLowerCase())
        })

        setSearchedProducts(filteredProducts)
        filterByPriceRange(minPrice, maxPrice, filteredProducts)
        filterByPrice(priceOrder, filteredProducts)

        document.getElementById('products-section')?.scrollIntoView({
            behavior: "smooth",
        })
    }

    const [displayedProducts, setDisplayedProducts] = useState<object[]>([])

    useEffect(() => {
        setDisplayedProducts(products?.slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
        ))
    }, [products, currentPage])



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
    const [clickedProduct, setClickedProduct] = useState({})
    const dashboardBodyProps = {
        productNavProps,
        searchedProducts,
        searchValue,
        query,
        productsAPI,
        displayedProducts,
        setClickedProduct,
        clickedProduct,
        cardStyle,
        productTitleStyle,
        handleAddToCart
    }

    return (
        <div style={{ height: '100%' }}>
            <Header {...headerProps} />
            <Routes>
                <Route path="/" element={<DashboardBody {...dashboardBodyProps} />} />
                <Route path='/dashboard/product/:title' element={<ProductInfo product={clickedProduct} addToCart={handleAddToCart} />} />
            </Routes>
            <Footer />
        </div>
    );
};
export default Dashboard;
