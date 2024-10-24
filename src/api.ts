
export const productsAPI = 'https://products-data-ft17.onrender.com/products'
export const categoriesAPI = 'https://products-data-ft17.onrender.com/categories'

export const fetchProducts = async () => {
    const response = await fetch(productsAPI);
    const data = await response.json();
    return data;
};

export const fetchCategories = async () => {
    const response = await fetch(categoriesAPI);
    const data = await response.json();
    return data;
};
