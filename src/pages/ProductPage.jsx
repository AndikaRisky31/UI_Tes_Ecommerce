import { useEffect, useState } from "react";
import CardListProduct from "../components/Card/CardListProduct";
import Header from "../components/Header";
import axiosInstance from "../services/axiosInstance";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const itemsPerPage = 12;

    const getProducts = async (page = 1, category = '') => {
        try {
            const { data } = await axiosInstance.get('/product', {
                params: {
                    page,
                    limit: itemsPerPage,
                    category,
                },
            });

            setProducts(data.products);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProducts(currentPage, selectedCategory);
    }, [currentPage, selectedCategory]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i}>
                    <div
                        onClick={() => handlePageChange(i)}
                        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 cursor-pointer ${
                            i === currentPage ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'hover:bg-gray-100 hover:text-gray-700'
                        }`}
                    >
                        {i}
                    </div>
                </li>
            );
        }

        return (
            <ul className="inline-flex -space-x-px text-base h-10">
                <li>
                    <div
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg ${
                            currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-700 cursor-pointer'
                        }`}
                    >
                        Previous
                    </div>
                </li>
                {pages}
                <li>
                    <div
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${
                            currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-100 hover:text-gray-700 cursor-pointer'
                        }`}
                    >
                        Next
                    </div>
                </li>
            </ul>
        );
    };

    return (
        <>
            <Header setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} handleCategoryChange={handleCategoryChange}/>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                    <h1 className="text-2xl font-extrabold text-gray-800 text-center mb-10">Products</h1>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <CardListProduct key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="flex justify-center mt-8">
                        {totalPages > 1 && renderPagination()}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;