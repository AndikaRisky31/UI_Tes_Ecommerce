import React, { useEffect, useState } from 'react';
import { ArrowDown2, LogoutCurve, ShoppingCart } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import AuthService from '../services/authService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Header = ({ selectedCategory, handleCategoryChange }) => {
    const [listCategories, setListCategories] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    const getCategory = async () => {
        try {
            const { data } = await axiosInstance.get('/product/categories');
            setListCategories(data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error.message);
        }
    };

    const handleCategoryClick = (category) => {
        handleCategoryChange(category);
        toggleDropdown();
    };

    useEffect(() => {
        getCategory();
    }, []);

    const handleLogout = async () => {
        const result = await MySwal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out of your account!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log out!',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            AuthService.logout();
            navigate('/login');
        }
    };

    return (
        <div>
            <div className="relative w-full mx-auto bg-white dark:bg-gray-600 py-5 md:py-10">
                <nav className="border-gray-200">
                    <div className="container mx-auto flex flex-wrap items-center justify-around">
                        <img
                            className="w-8 h-8 mr-2 self-center text-lg font-semibold whitespace-nowrap"
                            src="https://waleta019.com/assets/img/logo_waleta.png"
                            alt="logo"
                        />
                        <span className="self-center hidden sm:block text-lg font-semibold whitespace-nowrap text-gray-900 dark:text-white">
                            Waleta Asia Jaya
                        </span>
                        <div className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="text-white gap-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                type="button"
                            >
                                {selectedCategory ? selectedCategory : 'All'}
                                <ArrowDown2 size={16} variant="Bold" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                        <li key={0}>
                                            <div
                                                onClick={() => handleCategoryClick('')}
                                                className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                All
                                            </div>
                                        </li>
                                        {listCategories.length > 0 ? (
                                            listCategories.map((category, index) => (
                                                <li key={index + 1}>
                                                    <div
                                                        onClick={() => handleCategoryClick(category)}
                                                        className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        {category}
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <li>
                                                <span className="block px-4 py-2 text-gray-500">
                                                    No categories available
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => navigate('/cart')}
                            className="text-white gap-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                            type="button"
                        >
                            Cart
                            <ShoppingCart size={16} />
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-white gap-1 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                            type="button"
                        >
                            Logout
                            <LogoutCurve size={16} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;