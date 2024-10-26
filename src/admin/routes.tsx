
import ProductList from './routes/productList';
import CategoryList from './routes/categoryList';
import AddProduct from './routes/addProduct';
import AddCategory from './routes/addCategory';

const routes = [
  { path: '/my-shop/admin/productList', component: ProductList },
  { path: '/my-shop/admin/categoryList', component: CategoryList },
  { path: '/my-shop/admin/addProduct', component: AddProduct },
  { path: '/my-shop/admin/addCategory', component: AddCategory },
  
];

export default routes;
