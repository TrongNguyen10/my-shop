import React, { useState } from 'react';
import { Button, Card, Grid2 } from '@mui/material';
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
        setCategory((prevCategory) => ({ ...prevCategory, [name]: name == 'name' ? value : value * 1 }));
    };

    const setImageUrl = (url: string) => {
        setCategory((prevCategory) => ({...prevCategory, image: url }));
    }

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
                                    name="name"
                                    type='text'
                                    defaultValue={category.name}
                                    onChange={handleInputChange}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <p>Price Range (unit: $) </p>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        className='inputTag'
                                        placeholder="From"
                                        name="minPrice"
                                        type="number"
                                        defaultValue={category.minPrice}
                                        onChange={handleInputChange}
                                    />
                                    <span style={{ margin: '0 1rem' }}>-</span>
                                    <input
                                        className='inputTag'
                                        placeholder="To"
                                        name="maxPrice"
                                        type="number"
                                        defaultValue={category.maxPrice}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Grid2>

                            <Grid2 size={6}>
                                <p>Total Products</p>
                                <input
                                    className='inputTag'
                                    placeholder="total-products"
                                    name="totalProducts"
                                    type="number"
                                    defaultValue={category.totalProducts}
                                    onChange={handleInputChange}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <p>Total Quantity (unit: items)</p>
                                <input
                                    className='inputTag'
                                    placeholder="Quantity"
                                    name="totalQuantity"
                                    type="number"
                                    defaultValue={category.totalQuantity}
                                    onChange={handleInputChange}
                                />
                            </Grid2>

                        </Grid2>
                    </Card>
                    <Button sx={{ float: 'right', mt: 1.5 }} variant="contained" color="success" onClick={handleSaveCategory}>
                        Save Category
                    </Button>
                </Grid2>
                <Grid2 size={4}>
                    <Card variant='outlined' sx={cardStyle}>
                        <h3 style={{ marginTop: 0 }}>Category Image</h3>
                        <ImageDropzone passImageUrl={setImageUrl}/>
                    </Card>
                </Grid2>
            </Grid2>
        </div>
    );
};

export default AddCategory;
