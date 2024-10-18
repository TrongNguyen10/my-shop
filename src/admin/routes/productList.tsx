import React from 'react'
import { fetchProducts } from '../../api'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@mui/material';
import { Visibility, Edit, Delete, Search } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const productListStyle = {
    color: 'white',
}

const tableStyle = {
    maxHeight: 500,
    // table rows
    '& .css-10ukr6t-MuiTableCell-root': {
        color: '#aab8c1',
    },
    // table header
    '& .css-1u6ck2-MuiTableCell-root': {
        backgroundColor: '#252630',
        color: '#aab8c1',
        textAlign: 'center'
    },
}

const ProductList: React.FC = () => {
    
    const { data: products } = useQuery({
        queryKey: ['getProducts'], queryFn: fetchProducts
    });
    
    const [searchValue, setSearchValue] = React.useState('')
    const [searchedProducts, setSearchedProducts] = React.useState(null)

    const handleSetSearchValue = (event: any) => {
        setSearchValue(event.target.value)
    }

    const pressEnterToSearch = (event: any) => {
        if (event.key == 'Enter') searchProducts(event, searchValue)
    }

    const searchProducts = (event: any, value: string) => {
        var filteredProducts = products.filter((product: any) => {
            return product.title.toLowerCase().includes(value.toLowerCase()) ||
                product.category.toLowerCase().includes(value.toLowerCase())
        })
        setSearchedProducts(filteredProducts)
    }

    const displayedProducts = searchedProducts || products

    return (
        <div style={productListStyle}>
            <h2>Products List</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
                <div style={{ display: 'flex', alignItems: 'center', transform: 'translateX(-2.5rem)' }}>
                    <IconButton onClick={(e) => searchProducts(e, searchValue)} sx={{ transform: 'translateX(2.5rem)', color: '#fff' }}>
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
                <Table stickyHeader>
                    <TableHead sx={tableStyle}>
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
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>
                                    <img src={product.image} alt={product.title} width={50} height={70} /> {/* Hình ảnh */}
                                </TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.rating.count} items</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>
                                    <div style={{ display: 'flex' }}>
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
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ProductList
