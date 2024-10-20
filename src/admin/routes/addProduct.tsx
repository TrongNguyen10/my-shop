import React, { useState } from 'react';
import { Button, Card, Grid2, TextareaAutosize } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../../api'
import ImageDropzone from '../components/imageDropzone';

const addProductStyle = {
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

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
    image: string;
}

const AddProduct: React.FC = () => {

    const { data: categories } = useQuery({
        queryKey: ['getCategories'], queryFn: fetchCategories
    });

    const [product, setProduct] = useState<Product>({
        id: '',
        title: '',
        description: '',
        price: 0,
        category: '',
        rating: {
            rate: 0,
            count: 0
        },
        image: '',
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'rate' || name === 'count') {
            // console.log(name)
            // Gán giá trị cho trường con "rate" hoặc "count"
            setProduct((prevProduct) => ({
                ...prevProduct,
                rating: {
                    ...prevProduct.rating,
                    [name]: value * 1, // Chuyển giá trị sang số
                },
            }));
        } else {
            setProduct((prevProduct) => ({ ...prevProduct, [name]: name == 'price' ? value * 1 : value }));
        }
    };

    const setImageUrl = (imageUrl: string) => {
        setProduct((prevProduct) => ({ ...prevProduct, image: imageUrl }));
    }

    const handleSaveProduct = () => {
        console.log('Product saved:', product);
    };

    return (
        <div style={addProductStyle}>
            <h2>Add Product</h2>
            <Grid2 container spacing={2}>
                <Grid2 size={8}>
                    <Card variant='outlined' sx={cardStyle}>
                        <h3 style={{ margin: 0 }}>Product Information</h3>
                        <Grid2 container spacing={2}>
                            <Grid2 size={6}>
                                <p>ID</p>
                                <input
                                    className='inputTag'
                                    placeholder="Product ID"
                                    name="id"
                                    value={product.id}
                                    onChange={handleInputChange}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <p>Name</p>
                                <input
                                    className='inputTag'
                                    placeholder="Title"
                                    name="title"
                                    value={product.title}
                                    onChange={handleInputChange}
                                />
                            </Grid2>

                            <Grid2 size={6}>
                                <p>Category</p>
                                <select
                                    className='inputTag'
                                    name="category"
                                    value={product.category}
                                    onChange={handleInputChange}
                                >
                                    {categories?.map((category: any) => (
                                        <option value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </Grid2>
                            <Grid2 size={6}>
                                <p>Rating</p>
                                <input
                                    className='inputTag'
                                    placeholder="Rate"
                                    name="rate"
                                    type="number"
                                    defaultValue={product.rating.rate}
                                    onChange={handleInputChange}
                                />
                            </Grid2>

                            <Grid2 size={6}>
                                <p>Price (unit: $) </p>
                                <input
                                    className='inputTag'
                                    placeholder="Price"
                                    name="price"
                                    type="number"
                                    defaultValue={product.price}
                                    onChange={handleInputChange}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <p>Quantity</p>
                                <input
                                    className='inputTag'
                                    placeholder="Count"
                                    name="count"
                                    type="number"
                                    defaultValue={product.rating.count}
                                    onChange={handleInputChange}
                                />
                            </Grid2>

                            <Grid2 size={12}>
                                <p>Description</p>
                                <TextareaAutosize
                                    minRows={5}
                                    className='inputTag'
                                    placeholder="Description"
                                    name="description"
                                    value={product.description}
                                    onChange={handleInputChange}
                                />
                            </Grid2>

                        </Grid2>
                    </Card>
                    <Button sx={{ float: 'right', mt: 1.5 }} variant="contained" color="success" onClick={handleSaveProduct}>
                        Save Product
                    </Button>
                </Grid2>
                <Grid2 size={4}>
                    <Card variant='outlined' sx={cardStyle}>
                        <h3 style={{ marginTop: 0 }}>Product Image</h3>
                        <ImageDropzone passImageUrl={setImageUrl} />
                    </Card>
                </Grid2>
            </Grid2>
        </div>
    );
};

export default AddProduct;
