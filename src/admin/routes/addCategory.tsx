import React, { useState } from 'react';
import { Card, Grid2 } from '@mui/material';
import { cardStyle, submitBtnStyle } from './addProduct';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { categoriesAPI, fetchCategories } from '../../api';

const addCategoryStyle = {
    color: '#fff',
}

const AddCategory: React.FC = () => {

    const query = useQuery({
        queryKey: ['getCategories'], queryFn: fetchCategories
    });

    const mutation = useMutation({
        mutationKey: ['addCategory'], mutationFn: async (newCategory: object) => {
            return axios.post(categoriesAPI, newCategory);
        }
        , onSuccess: () => {
            alert('Thêm danh mục mới thành công !')
        }, onError: () => {
            alert('Có lỗi xảy ra, vui lòng thử lại !')
        },
        onSettled: () => {
            query.refetch()
        }
    })

    const [category, setCategory] = useState({
        name: '',
        minPrice: 0,
        maxPrice: 0,
        totalProducts: 0,
        totalQuantity: 0,
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setCategory((prevCategory) => ({ ...prevCategory, [name]: name == 'name' ? value.trim() : value * 1 }));
    };

    const handleAddCategory = (e: any) => {
        e.preventDefault();
        if (category.name) {
            mutation.mutate({
                name: category.name
            });
        } else alert('Vui lòng điền đầy đủ thông tin !')
    };

    return (
        <div style={addCategoryStyle}>
            <h2 style={{marginBottom: 20}}>Add Category</h2>
            <Grid2 container spacing={2}>
                <Grid2 size={8}>
                    <form onSubmit={handleAddCategory}>
                        <Card variant='outlined' sx={cardStyle}>
                            <h3 style={{ marginBottom: 20 }}>Category Information</h3>
                            <Grid2 container spacing={2}>
                                <Grid2 size={6}>
                                    <p>Name</p>
                                    <input
                                        required
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
                                            required
                                            className='inputTag'
                                            placeholder="From"
                                            name="minPrice"
                                            min={0}
                                            type="number"
                                            defaultValue={category.minPrice}
                                            onChange={handleInputChange}
                                        />
                                        <span style={{ margin: '0 1rem' }}>-</span>
                                        <input
                                            required
                                            className='inputTag'
                                            placeholder="To"
                                            name="maxPrice"
                                            min={0}
                                            type="number"
                                            defaultValue={category.maxPrice}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </Grid2>

                                <Grid2 size={6}>
                                    <p>Total Products</p>
                                    <input
                                        required
                                        className='inputTag'
                                        placeholder="Total products"
                                        name="totalProducts"
                                        min={0}
                                        type="number"
                                        defaultValue={category.totalProducts}
                                        onChange={handleInputChange}
                                    />
                                </Grid2>
                                <Grid2 size={6}>
                                    <p>Total Quantity (unit: items)</p>
                                    <input
                                        required
                                        className='inputTag'
                                        placeholder="Quantity"
                                        name="totalQuantity"
                                        min={0}
                                        type="number"
                                        defaultValue={category.totalQuantity}
                                        onChange={handleInputChange}
                                    />
                                </Grid2>
                            </Grid2>
                        </Card>
                        <div style={{ textAlign: 'right' }}>
                            <button style={submitBtnStyle} type='submit' >
                                ADD CATEGORY
                            </button>
                        </div>
                    </form>

                </Grid2>
            </Grid2>
        </div>
    );
};

export default AddCategory;
