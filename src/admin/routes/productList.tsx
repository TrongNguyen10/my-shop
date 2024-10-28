import React, { useEffect, useState } from 'react'
import { fetchCategories, fetchProducts } from '../../api'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, TextareaAutosize } from '@mui/material';
import { Visibility, Edit, Delete, Search } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { productsAPI } from '../../api';
import axios from 'axios';
import ImageDropzone from '../components/imageDropzone';

const productListStyle = {
    color: 'white',
}

export const editRowStyle = {
    '& .editField': {
        color: 'white',
        backgroundColor: '#1e1f27',
        fontSize: 15,
        height: 35,
        width: '100%'
    }
}

export const tableStyle = {
    maxHeight: 500,
    // table header
    '& .MuiTableCell-head': {
        backgroundColor: '#252630',
        color: '#aab8c1',
        textAlign: 'center'
    },
    // table body
    '& .MuiTableCell-body': {
        color: '#aab8c1',
    },
}

const ProductList: React.FC = () => {

    const [products, setProducts] = useState([])
    const [displayedProducts, setDisplayedProducts] = useState([])
    const [categories, setCategories] = useState([])

    // Dùng cho select
    const categoryQuery = useQuery({
        queryKey: ['getCategories'], queryFn: fetchCategories
    });
    const productQuery = useQuery({
        queryKey: ['getProducts'], queryFn: fetchProducts
    });

    useEffect(() => {
        if (productQuery.data) {
            setProducts(productQuery.data)
            setDisplayedProducts(productQuery.data)
        }
        if (categoryQuery.data) {
            setCategories(categoryQuery.data)
        }
    }, [productQuery.data, categoryQuery.data])

    const mutationDelete = useMutation({
        mutationKey: ['deleteProduct'], mutationFn: async (deletedID: any) => {
            return axios.delete(productsAPI + `/${deletedID}`);
        }
        , onSuccess: () => {
            alert('Xóa sản phẩm thành công')
        }, onError: () => {
            alert('Có lỗi xảy ra, vui lòng thử lại !')
        },
        onSettled: () => {
            productQuery.refetch()
        }
    })
    const mutationUpdate = useMutation({
        mutationKey: ['updateProduct'], mutationFn: async ({ updatedID, newProduct }: { updatedID: any, newProduct: any }) => {
            return axios.patch(productsAPI + `/${updatedID}`, newProduct);
        }
        , onSuccess: () => {
            alert('Cập nhật sản phẩm thành công')
        }, onError: () => {
            alert('Có lỗi xảy ra, vui lòng thử lại !')
        },
        onSettled: () => {
            productQuery.refetch()
        }
    })

    // Search for products
    const [searchValue, setSearchValue] = useState('')

    const handleSetSearchValue = (event: any) => {
        setSearchValue(event.target.value)
    }

    const pressEnterToSearch = (event: any) => {
        if (event.key == 'Enter') searchProducts(searchValue)
    }

    const searchProducts = (value: string) => {
        var filteredProducts = products?.filter((product: any) => {
            return product.title.toLowerCase().includes(value.toLowerCase()) ||
                product.category.toLowerCase().includes(value.toLowerCase())
        })
        setDisplayedProducts(filteredProducts)
    }

    // Delete product
    const handleDeleteProduct = (id: any) => {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này ?')) {
            mutationDelete.mutate(id)
        }
    }

    // Edit product
    const [editRowId, setEditRowId] = useState(null);
    const [isEditing, setIsEditing] = useState(false)

    // const [image, setImage] = useState<string>('');
    const [newProduct, setNewProduct] = useState({
        id: 0,
        title: '',
        description: '',
        price: 0,
        category: '',
        rating: {
            // rate: 0,
            count: 0
        },
        image: '',
    });

    const handleEditClick = (product: any) => {
        setEditRowId(product.id)
        setIsEditing(true)
        setNewProduct(product)
    };

    const handleCancelClick = () => {
        setEditRowId(null);
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'rate' || name === 'count') {
            // Gán giá trị cho trường con "rate" hoặc "count"
            setNewProduct((prevProduct) => ({
                ...prevProduct,
                rating: {
                    ...prevProduct.rating,
                    [name]: value * 1, // Chuyển giá trị sang số
                },
            }));
        } else {
            setNewProduct((prevProduct) => ({ ...prevProduct, [name]: name == 'price' ? value * 1 : value.trim() }));
        }
    };

    const setImageUrl = (imageUrl: string) => {
        setNewProduct((prevProduct) => ({ ...prevProduct, image: imageUrl }));
    }

    const [updatedID, setupdatedID] = useState(editRowId)

    const handleUpdateClick = (e: any) => {
        // Implement useMutation logic here
        e.preventDefault()
        if (newProduct.title) {
            mutationUpdate.mutate({ updatedID, newProduct })
            setIsEditing(false) // for imageDropzone
            setEditRowId(null);
        } else alert('Vui lòng điền đầy đủ thông tin !')
    };

    return (
        <div style={productListStyle}>
            <h2>Products List</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', transform: 'translateX(-2.5rem)' }}>
                    <IconButton onClick={() => searchProducts(searchValue)} sx={{ transform: 'translateX(2.5rem)', color: '#fff' }}>
                        <Search />
                    </IconButton>
                    <input onKeyUp={pressEnterToSearch} onChange={handleSetSearchValue} value={searchValue} style={{ padding: '0.5rem 2.5rem', backgroundColor: '#1e1f27', color: '#fff', border: '1px solid #999' }} placeholder="Search" /> {/* Thanh tìm kiếm */}
                </div>
                <Link to="/addProduct">
                    <Button variant="contained" color="primary">
                        Add Product
                    </Button>
                </Link>
            </div>
            <TableContainer sx={tableStyle}>
                <form onSubmit={handleUpdateClick}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Image</TableCell> {/* Cột hình ảnh */}
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Action</TableCell> {/* Cột action */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedProducts?.map((product: any) => (
                                <TableRow sx={editRowStyle} key={product.id}>
                                    <TableCell>{product.id}</TableCell>
                                    {editRowId == product.id ?
                                        <>
                                            <TableCell>
                                                <ImageDropzone passImageUrl={setImageUrl} isEditing={isEditing} image={product.image} />
                                            </TableCell>
                                            <TableCell><TextareaAutosize minRows={1.5} maxRows={6} name='title' required className='editField' onChange={handleInputChange} defaultValue={product.title} /></TableCell>
                                            <TableCell><TextareaAutosize minRows={1.5} maxRows={6} name='description' className='editField' onChange={handleInputChange} defaultValue={product.description} /></TableCell>
                                            <TableCell><TextareaAutosize minRows={1.5} maxRows={6} name='price' required className='editField' onChange={handleInputChange} defaultValue={Number(product.price).toFixed(2)} /></TableCell>
                                            <TableCell><TextareaAutosize minRows={1.5} maxRows={6} name='count' required className='editField' onChange={handleInputChange} defaultValue={product.rating?.count} /></TableCell>
                                            <TableCell>
                                                <select
                                                    name='category'
                                                    className='editField'
                                                    id="category-select"
                                                    defaultValue={product.category || ''}
                                                    onChange={handleInputChange}
                                                >
                                                    {categories?.map((category: any) => (
                                                        <option key={category.id} value={category.name}>
                                                            {category.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </TableCell>
                                            <TableCell>
                                                <div style={{ display: 'flex' }}>
                                                    <Button type='submit' sx={{ mr: 1 }} variant='contained' color='success' onClick={() => setupdatedID(product.id)}>Update</Button>
                                                    <Button variant='contained' color='error' onClick={handleCancelClick}>Cancel</Button>
                                                </div>
                                            </TableCell>
                                            {/* </FormControl> */}
                                        </>

                                        : <>
                                            <TableCell>
                                                <img src={product.image} alt={product.title} width={60} height={70} /> {/* Hình ảnh */}
                                            </TableCell>
                                            <TableCell>{product.title}</TableCell>
                                            <TableCell>{product.description}</TableCell>
                                            <TableCell>${Number(product.price).toFixed(2)}</TableCell>
                                            <TableCell>{product.rating?.count} items</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>
                                                <div style={{ display: 'flex' }}>
                                                    <IconButton>
                                                        <Visibility sx={{ color: '#6961ff' }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleEditClick(product)}>
                                                        <Edit sx={{ color: '#6ac75a' }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDeleteProduct(product.id)}>
                                                        <Delete sx={{ color: '#ff6d43' }} />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </form>
            </TableContainer>
        </div>
    )
}

export default ProductList
