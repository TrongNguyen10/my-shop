
import ProductList from './routes/productList';
import CategoryList from './routes/categoryList';
import AddProduct from './routes/addProduct';
import AddCategory from './routes/addCategory';

const routes = [
  { path: '/admin/productList', component: ProductList },
  { path: '/admin/categoryList', component: CategoryList },
  { path: '/admin/addProduct', component: AddProduct },
  { path: '/admin/addCategory', component: AddCategory },
  
];

export default routes;
