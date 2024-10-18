import React, { useEffect } from 'react'
import { fetchProducts, fetchCategories } from '../../api'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@mui/material';
import { Visibility, Edit, Delete, Search } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const categoryListStyle = {
    color: 'white',
}

const tableStyle = {
    maxHeight: 500,
    // table rows
    '& .css-10ukr6t-MuiTableCell-root': {
        color: '#aab8c1',
        textAlign: 'center'
    },
    // table header
    '& .css-1u6ck2-MuiTableCell-root': {
        backgroundColor: '#252630',
        color: '#aab8c1',
        textAlign: 'center'
    },
}

const CategoryList: React.FC = () => {

    const { data: products } = useQuery({
        queryKey: ['getProducts'], queryFn: fetchProducts
    });

    const { data: categories } = useQuery({
        queryKey: ['getCategories'], queryFn: fetchCategories
    });

    const [searchValue, setSearchValue] = React.useState('')
    const [categoriesData, setCategoriesData] = React.useState<object[]>([])
    const [allCategoriesData, setAllCategoriesData] = React.useState([])

    const handleSetSearchValue = (event: any) => {
        setSearchValue(event.target.value)
    }

    const pressEnterToSearch = (event: any) => {
        if (event.key == 'Enter') searchCategory(event, searchValue)
    }

    const searchCategory = (event: any, value: string) => {
        var filteredData = value.trim() ? allCategoriesData?.filter((dataArr: any) => dataArr[0]?.category.includes(value.trim())) : allCategoriesData
        setCategoriesData(filteredData)
    }

    useEffect(() => {
        setCategoriesData(getAllCategoriesData())
        setAllCategoriesData(getAllCategoriesData())
    }, [categories])

    const getAllCategoriesData = () => {
        return categories?.map((category: any) => {
            return products?.filter((product: any) => product?.category == category)
        })
    }

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

    return (
        <div style={categoryListStyle}>
            <h2>Categories List</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', transform: 'translateX(-2.5rem)' }}>
                    <IconButton onClick={(e) => searchCategory(e, searchValue)} sx={{ transform: 'translateX(2.5rem)', color: '#fff' }}>
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
                <Table stickyHeader>
                    <TableHead sx={tableStyle}>
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
                        {!!categoriesData == true ? categoriesData?.map((item: any, index: number) => (
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item[0].category}</TableCell>
                                <TableCell>{handleAveragePrice(item)}</TableCell>
                                <TableCell>{item.length} products</TableCell>
                                <TableCell>{handleTotalQuantity(item)} items</TableCell>
                                <TableCell>
                                    <div>
                                        <IconButton>
                                            <Visibility sx={{ color: '#6961ff' }} />
                                        </IconButton>
                                        <IconButton>
                                            <Edit sx={{ color: '#6ac75a' }} />
                                        </IconButton>
                                        <IconButton>
                                            <Delete sx={{ color: '#ff6d43' }} />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CategoryList
