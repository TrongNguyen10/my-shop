// src/components/ProductNav.tsx
// Include Filter and Pagination components
import React, { useEffect, useState } from 'react';
import { Select, MenuItem, Pagination, SelectChangeEvent, Button, Stack } from '@mui/material';

const productNavStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    display: 'flex',
    padding: '12px 22px',
    borderRadius: '2px',
    alignItems: 'center',
    justifyContent: 'space-between',
}


const ProductNavBar = (props: any) => {
    const [priceOrder, setPriceOrder] = useState('price-normal');
    const [category, setCategory] = useState('category-all')

    const handleSelectPrice = (event: SelectChangeEvent) => {
        setPriceOrder(event.target.value as string);
        props.filterByPrice(event.target.value as string)
    };

    const handleSelectCategory = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string)
        props.filterByCategory(event.target.value as string)
    }

    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        // Fetch data from API
        fetch('https://fakestoreapi.com/products/categories')
            .then((response) => response.json())
            .then((data) => setCategories(data));
    }, []);

    return (
        <div style={productNavStyle}>
            <p>Sắp xếp theo: </p>
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: 15 }}>Sản phẩm:</p>
                <Select
                    labelId="category-label"
                    id="category-select"
                    value={category}
                    onChange={handleSelectCategory}
                >
                    <MenuItem value="category-all">Tất cả</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: 15 }}>Giá:</p>
                <Select
                    labelId="price-order-label"
                    id="price-order-select"
                    value={priceOrder}
                    onChange={handleSelectPrice}
                >
                    <MenuItem value="price-normal">Phổ biến</MenuItem>
                    <MenuItem value="price-asc">Giá tăng dần</MenuItem>
                    <MenuItem value="price-desc">Giá giảm dần</MenuItem>
                </Select>
            </div>
            <Stack>
                <Pagination count={props.totalPages} page={props.currentPage} onChange={(event, pageNumber) => props.handlePageChange(event, pageNumber)} />
            </Stack>
        </div>
    );
};

export default ProductNavBar;
