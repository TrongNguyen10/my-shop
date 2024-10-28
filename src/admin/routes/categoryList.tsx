import React, { useEffect, useState } from 'react'
import { fetchProducts, fetchCategories, categoriesAPI, productsAPI } from '../../api'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, TextareaAutosize } from '@mui/material';
import { Edit, Delete, Search } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { editRowStyle } from './productList';

const categoryListStyle = {
    color: 'white',
}

const tableStyle = {
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
        textAlign: 'center'
    },
}

const CategoryList: React.FC = () => {

    const productsQuery = useQuery({
        queryKey: ['getProducts'], queryFn: fetchProducts
    });

    const categoriesQuery = useQuery({
        queryKey: ['getCategories'], queryFn: fetchCategories
    });

    const mutationDelete = useMutation({
        mutationKey: ['deleteCategory'], mutationFn: async (deletedID: string) => {
            return axios.delete(categoriesAPI + `/${deletedID}`);
        }
        , onSuccess: () => {
            alert('Xóa danh mục thành công !')
        }, onError: () => {
            alert('Có lỗi xảy ra, vui lòng thử lại !')
        },
        onSettled: () => {
            categoriesQuery.refetch()
        }
    })

    const mutationUpdate = useMutation({
        mutationKey: ['updateCategory'], mutationFn: async ({ updatedID, newCategory }: { updatedID: any, newCategory: any }) => {
            return axios.patch(categoriesAPI + `/${updatedID}`, newCategory)
        }
        , onSuccess: () => {
            alert('Cập nhật danh mục thành công !')
        }, onError: () => {
            alert('Có lỗi xảy ra, vui lòng thử lại !')
        },
        onSettled: () => {
            categoriesQuery.refetch()
        }
    })

    const [searchValue, setSearchValue] = useState('')
    const [categoriesData, setCategoriesData] = useState<object[]>([])
    const [allCategoriesData, setAllCategoriesData] = useState<object[]>([])

    const handleSetSearchValue = (event: any) => {
        setSearchValue(event.target.value)
    }

    const pressEnterToSearch = (event: any) => {
        if (event.key == 'Enter') searchCategory(searchValue)
    }

    const searchCategory = (value: string) => {
        var filteredData = value.trim()
            ? allCategoriesData?.filter((category: any) => category?.name.toLowerCase().includes(value.trim().toLowerCase()))
            : allCategoriesData
        setCategoriesData(filteredData)
    }

    useEffect(() => {
        if (categoriesQuery.data && productsQuery.data) {
            categoriesQuery.data?.forEach((category: any) => {
                return category['data'] = productsQuery.data?.filter((product: any) => product?.category == category.name)
            })
            var categoriesArr = categoriesQuery.data?.map((category: any) => {
                return category.data.length ? {
                    id: category.id,
                    name: category.name,
                    priceRange: handleAveragePrice(category.data),
                    totalProducts: category.data.length,
                    totalQuantity: handleTotalQuantity(category.data)
                } : {
                    id: category.id,
                    name: category.name,
                    priceRange: '-',
                    totalProducts: 0,
                    totalQuantity: 0
                }
            })
            setCategoriesData(categoriesArr)
            setAllCategoriesData(categoriesArr)
        }
    }, [categoriesQuery.data, productsQuery.data])

    const handleAveragePrice = (data: any) => {
        data?.sort(function (a: any, b: any) { return a.price - b.price });
        return `$${data[0].price} - $${data[data.length - 1].price}`;
    }

    const handleTotalQuantity = (data: any) => {
        var totalQuantity = data?.reduce((total: any, item: any) => {
            return total + item.rating.count
        }, 0)
        return totalQuantity
    }

    const handleDeleteCategory = (categoryID: string) => {
        if (confirm('Bạn có chắc muốn xóa danh mục này ?')) {
            mutationDelete.mutate(categoryID)
        }
    }

    // Update categories
    const [editRowId, setEditRowId] = useState(null);

    // const [image, setImage] = useState<string>('');
    const [newCategory, setNewCategory] = useState('');
    const [oldCategory, setOldCategory] = useState('');

    const handleEditClick = (category: any) => {
        setEditRowId(category.id)
        setOldCategory(category.name)
    };

    const handleCancelClick = () => {
        setEditRowId(null);
    };

    const [updatedID, setupdatedID] = useState(editRowId)

    const handleUpdateClick = (e: any) => {
        e.preventDefault()
        if(!newCategory.trim()) {
            alert('Vui lòng điền đầy đủ thông tin !')
            return
        }
        if (confirm(`Cập nhật danh mục mới cho tất cả sản phẩm loại "${oldCategory}" ?`)) {
            mutationUpdate.mutate({
                updatedID: updatedID,
                newCategory: {
                    name: newCategory.trim()
                }
            })
            updateCategoryNames()
            setEditRowId(null);
        }
    };

    // update new Category for all related product
    async function updateCategoryNames() {

        var updatedProducts = productsQuery.data.filter((product: any) => product.category == oldCategory.trim())

        try {
            for (const product of updatedProducts) {
                await axios.patch(productsAPI + `/${product.id}`, { category: newCategory });
            }
            alert('Cập nhật danh mục mới cho sản phẩm thành công. Vui lòng kiểm tra danh sách sản phẩm !')
            productsQuery.refetch()
        } catch (error) {
            console.error('Có lỗi xảy ra:', error);
        }
    }

    return (
        <div style={categoryListStyle}>
            <h2>Categories List</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', transform: 'translateX(-2.5rem)' }}>
                    <IconButton onClick={() => searchCategory(searchValue)} sx={{ transform: 'translateX(2.5rem)', color: '#fff' }}>
                        <Search />
                    </IconButton>
                    <input onKeyUp={pressEnterToSearch} onChange={handleSetSearchValue} value={searchValue} style={{ padding: '0.5rem 2.5rem', backgroundColor: '#1e1f27', color: '#fff', border: '1px solid #999' }} placeholder="Search" /> {/* Thanh tìm kiếm */}
                </div>
                <Link to="/addCategory">
                    <Button variant="contained" color="primary">
                        Add Category
                    </Button>
                </Link>
            </div>
            <TableContainer sx={tableStyle}>
                <form onSubmit={handleUpdateClick}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order</TableCell>
                                <TableCell>Categories</TableCell>
                                <TableCell>Average Price</TableCell>
                                <TableCell>Total Products</TableCell>
                                <TableCell>Total Quantity</TableCell>
                                <TableCell>Action</TableCell> {/* Cột action */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoriesData?.map((category: any, index: number) => (
                                <TableRow>
                                    <TableCell>{index + 1}</TableCell>
                                    {editRowId == category.id ?
                                        <TableCell sx={editRowStyle}>
                                            <TextareaAutosize minRows={1.5} maxRows={6} required className='editField' onChange={(e) => setNewCategory(e.target.value)} defaultValue={category.name} />
                                        </TableCell>
                                        : <TableCell>{category.name}</TableCell>}
                                    <TableCell>{category.priceRange}</TableCell>
                                    <TableCell>{category.totalProducts} products</TableCell>
                                    <TableCell>{category.totalQuantity} items</TableCell>
                                    <TableCell>
                                        {editRowId == category.id ?
                                            <div style={{ display: 'flex' }}>
                                                <Button type='submit' sx={{ mr: 1 }} variant='contained' color='success' onClick={() => setupdatedID(category.id)}>Update</Button>
                                                <Button variant='contained' color='error' onClick={handleCancelClick}>Cancel</Button>
                                            </div>
                                            :
                                            <div>
                                                <IconButton onClick={() => handleEditClick(category)}>
                                                    <Edit sx={{ color: '#6ac75a' }} />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteCategory(category.id)}>
                                                    <Delete sx={{ color: '#ff6d43' }} />
                                                </IconButton>
                                            </div>}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </form>
            </TableContainer>
        </div>
    )
}

export default CategoryList
