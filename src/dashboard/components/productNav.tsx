
// Include Filter and Pagination components
import React, { useEffect, useState } from 'react';
import { Select, MenuItem, Pagination, SelectChangeEvent, Button, Stack } from '@mui/material';
import { fetchCategories } from '../../api';
import { useQuery } from '@tanstack/react-query';

const productNavStyle = {
    backgroundColor: '#ededed',
    display: 'flex',
    padding: '12px 22px',
    borderRadius: '2px',
    alignItems: 'center',
    justifyContent: 'space-between',
}


const ProductNavBar = (props: any) => {
    const [priceOrder, setPriceOrder] = useState('price-normal');
    const [category, setCategory] = useState('category-all')
    const [categories, setCategories] = useState<object[]>([]);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const query = useQuery({
        queryKey: ['getCategories'], queryFn: fetchCategories
    });

    const handleSelectPrice = (event: SelectChangeEvent) => {
        setPriceOrder(event.target.value as string);
        props.filterByPrice(event.target.value as string)
    };

    const handleSelectCategory = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string)
        props.filterByCategory(event.target.value as string)
    }

    const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinPrice(event.target.value);
        props.setMinPrice(event.target.value);

    };

    const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(event.target.value);
        props.setMaxPrice(event.target.value);
    };

    function isValidValue(minPrice: string, maxPrice: string) {
        if (!minPrice && !maxPrice) return false

        if (minPrice == '.' || maxPrice == '.') return false

        if (maxPrice != '' && Number(minPrice) > Number(maxPrice)) return false

        return true;
    }

    const applyFilter = () => {
        if (isValidValue(minPrice, maxPrice)) {
            props.filterByPriceRange(minPrice, maxPrice)
        } else alert('Vui lòng nhập giá trị hợp lệ')
    };

    useEffect(() => {
        if (query.data) setCategories(query.data);
    }, [query.data]);

    return (
        <div style={productNavStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: 15 }}>Danh mục :</p>
                <Select
                    sx={{ height: 50 }}
                    labelId="category-label"
                    id="category-select"
                    value={category}
                    onChange={handleSelectCategory}
                >
                    <MenuItem value="category-all">Tất cả</MenuItem>
                    {categories?.map((category: any) => (
                        <MenuItem key={category.id} value={category.name}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: 15 }}>Khoảng giá :</p>
                <Select
                    sx={{ height: 50 }}
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
            <span>hoặc</span>
            <div>
                <input type='number' min={0} style={{ width: 70, height: 30 }} defaultValue={props.minPrice} placeholder="TỪ" onChange={handleMinPriceChange} />
                <span style={{ margin: '0 5px' }}> - </span>
                <input type='number' min={0} style={{ width: 70, height: 30 }} defaultValue={props.maxPrice} placeholder="ĐẾN" onChange={handleMaxPriceChange} />
                <Button sx={{ height: 30, ml: 2 }} variant="contained" color="error" onClick={applyFilter}>
                    Lọc
                </Button>
            </div>
            <Stack>
                <Pagination count={props.totalPages} page={props.currentPage} onChange={(e, pageNumber) => props.handlePageChange(e, pageNumber)} />
            </Stack>
        </div>
    );
};

export default ProductNavBar;
