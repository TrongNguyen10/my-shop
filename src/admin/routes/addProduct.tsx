import React, { useState } from 'react';
import { Card, Grid2, TextareaAutosize, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProducts, productsAPI } from '../../api'
import ImageDropzone from '../components/imageDropzone';
import axios from 'axios';

const addProductStyle = {
    color: '#fff',
}

export const cardStyle = {
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
        paddingLeft: 2,
        fontSize: '1rem',
        marginTop: '0.8rem',
    },
}

export const submitBtnStyle = {
    marginTop: 10,
    backgroundColor: 'green',
    color: '#fff',
    height: '2.5rem',
    borderRadius: '5px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 'bold',
}

const AddProduct: React.FC = () => {

    const query = useQuery({
        queryKey: ['getProducts'], queryFn: fetchProducts
    });

    const { data } = useQuery({
        queryKey: ['getCategories'], queryFn: fetchCategories
    });

    const mutation = useMutation({
        mutationKey: ['addProduct'], mutationFn: async (newProduct: object) => {
            return axios.post(productsAPI, newProduct);
        }
        , onSuccess: () => {
            alert('Thêm sản phẩm thành công !')
        }, onError: () => {
            alert('Sản phẩm này đã tồn tại, vui lòng kiểm tra lại danh sách sản phẩm !')
        },
        onSettled: () => {
            query.refetch()
        }
    })

    const [categories, setCategories] = useState([])

    const [productID, setProductID] = useState(1)

    const [image, setImage] = useState<string>('');

    const [product, setProduct] = useState({
        id: productID,
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

    React.useEffect(() => {
        if (query.data) {
            setProductID(query.data[query.data.length - 1].id + 1);
        }
    }, [query.data])

    React.useEffect(() => {
        if (data) {
            setCategories(data);
            setProduct((prevProduct) => ({ ...prevProduct, category: data[0].name }))
        }
    }, [data])

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'rate' || name === 'count') {
            // Gán giá trị cho trường con "rate" hoặc "count"
            setProduct((prevProduct) => ({
                ...prevProduct,
                rating: {
                    ...prevProduct.rating,
                    [name]: value * 1, // Chuyển giá trị sang số
                },
            }));
        } else {
            setProduct((prevProduct) => ({ ...prevProduct, [name]: name == 'price' ? value * 1 : value.trim(), id: productID }));
        }
    };

    const setImageUrl = (imageUrl: string) => {
        setImage(imageUrl)
        setProduct((prevProduct) => ({ ...prevProduct, image: imageUrl }));
    }

    const handleAddProduct = async (e: any) => {
        e.preventDefault();
        if (!image) return
        if (product.title) {
            mutation.mutate(product)
        } else alert('Vui lòng điền đầy đủ thông tin !')
    };

    return (
        <div style={addProductStyle}>
            <h2 style={{marginBottom: 20}}>Add Product</h2>
            <Grid2 container spacing={2}>
                <Grid2 size={8}>
                    <form onSubmit={handleAddProduct}>
                        <Card variant='outlined' sx={cardStyle}>
                            <h3 style={{marginBottom: 20}}>Product Information</h3>
                            <Grid2 container spacing={2}>
                                <Grid2 size={6}>
                                    <p>ID</p>
                                    <input
                                        disabled
                                        className='inputTag'
                                        style={{ cursor: 'no-drop', opacity: 0.5 }}
                                        name="id"
                                        value={productID}
                                        onChange={handleInputChange}
                                    />
                                </Grid2>
                                <Grid2 size={6}>
                                    <p>Name</p>
                                    <input
                                        required
                                        className='inputTag'
                                        placeholder="Title"
                                        name="title"
                                        type='text'
                                        defaultValue={product.title.trim()}
                                        onChange={handleInputChange}
                                    />
                                </Grid2>

                                <Grid2 size={6}>
                                    <p>Category</p>
                                    <select
                                        required
                                        className='inputTag'
                                        name="category"
                                        value={product.category}
                                        onChange={handleInputChange}
                                    >
                                        {categories?.map((category: any) => (
                                            <option value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </Grid2>
                                <Grid2 size={6}>
                                    <p>Rated</p>
                                    <input
                                        required
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
                                        required
                                        className='inputTag'
                                        placeholder="Price"
                                        name="price"
                                        type="number"
                                        defaultValue={product.price}
                                        onChange={handleInputChange}
                                    />
                                </Grid2>
                                <Grid2 size={6}>
                                    <p>Quantity (unit: items)</p>
                                    <input
                                        required
                                        className='inputTag'
                                        placeholder="Quantity"
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
                                        defaultValue={product.description}
                                        onChange={handleInputChange}
                                    />
                                </Grid2>

                            </Grid2>
                        </Card>
                        <div style={{ textAlign: 'right' }}>
                            <button style={submitBtnStyle} className='submitBtn' type="submit" >ADD PRODUCT</button>
                        </div>
                    </form>
                </Grid2>
                <Grid2 size={4}>
                    <Card variant='outlined' sx={cardStyle}>
                        <h3 style={{ marginBottom: 15 }}>Product Image</h3>
                        <ImageDropzone passImageUrl={setImageUrl} image={product.image} />
                    </Card>
                    {!!image == false ? <Typography sx={{ mt: 1 }} variant='body2' color='primary'>! Vui lòng chọn hình ảnh sản phẩm</Typography> : null}
                </Grid2>
            </Grid2>
        </div>
    );
};

export default AddProduct;
