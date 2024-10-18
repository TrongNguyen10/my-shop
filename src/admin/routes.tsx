// routes.tsx
import ProductList from './routes/productList';
import CategoryList from './routes/categoryList';
import AddProduct from './routes/addProduct';
import AddCategory from './routes/addCategory';

const routes = [
  { path: '/productList', component: ProductList },
  { path: '/categoryList', component: CategoryList },
  { path: '/addProduct', component: AddProduct },
  { path: '/addCategory', component: AddCategory },
  // Thêm các route khác tương ứng với menu
];

export default routes;
