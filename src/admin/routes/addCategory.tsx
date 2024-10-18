import React, { useState } from 'react';
import { Button, Card, Grid2, TextareaAutosize } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../api'
import ImageDropzone from '../components/imageDropzone';

const addCategoryStyle = {
    color: '#fff',
}

const cardStyle = {
    backgroundColor: '#252630',
    color: '#aab8c1',
    borderRadius: '5px',
    padding: '1rem 2rem',

    '& .inputTag': {
        color: '#fff',
        backgroundColor: '#1e1f27',
        border: '0.5px solid #48505e',
        outline: 'none',
        width: '100%',
        height: '2.5rem',
        paddingLeft: 2
    }
}

interface Category {
    name: string;
    minPrice: number;
    maxPrice: number;
    totalProducts: number;
    totalQuantity: number;
    image: string;
}

const AddCategory: React.FC = () => {

    const [category, setCategory] = useState<Category>({
        name: '',
        minPrice: 0,
        maxPrice: 0,
        totalProducts: 0,
        totalQuantity: 0,
        image: '',
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
    };

    const handleSaveCategory = () => {
        console.log('Category saved:', category);
    };

    return (
        <div style={addCategoryStyle}>
            <h2>Add Category</h2>
            <Grid2 container spacing={2}>
                <Grid2 size={8}>
                    <Card variant='outlined' sx={cardStyle}>
                        <h3 style={{ margin: 0 }}>Category Information</h3>
                        <Grid2 container spacing={2}>
                            <Grid2 size={6}>
                                <p>Name</p>
                                <input
                                    className='inputTag'
                                    placeholder="Category name"
                                    name="category-name"
                                    value={category.name}
                                    onChange={handleInputChange}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <p>Price Range (unit: $) </p>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <input
                                        className='inputTag'
                                        placeholder="From"
                                        name="min-price"
                                        type="number"
                                        value={category.minPrice}
                                        onChange={handleInputChange}
                                    />
                                    <span style={{margin: '0 1rem'}}>-</span>
                                    <input
                                        className='inputTag'
                                        placeholder="To"
                                        name="max-price"
                                        type="number"
                                        value={category.maxPrice}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Grid2>

                            <Grid2 size={6}>
                                <p>Total Products (unit: items)</p>
                                <input
                                    className='inputTag'
                                    placeholder="total-products"
                                    name="total-products"
                                    type="number"
                                    value={category.totalProducts}
                                    onChange={handleInputChange}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <p>Total Quantity</p>
                                <input
                                    className='inputTag'
                                    placeholder="Quantity"
                                    name="quantity"
                                    type="number"
                                    value={category.totalQuantity}
                                    onChange={handleInputChange}
                                />
                            </Grid2>

                        </Grid2>
                    </Card>
                </Grid2>
                <Grid2 size={4}>
                    <Card variant='outlined' sx={cardStyle}>
                        <h3 style={{ marginTop: 0 }}>Category Image</h3>
                        <ImageDropzone />
                    </Card>
                </Grid2>
            </Grid2>
            <Button sx={{ float: 'right' }} variant="contained" color="success" onClick={handleSaveCategory}>
                Save Category
            </Button>
        </div>
    );
};

export default AddCategory;
