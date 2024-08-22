import { formatCurrency } from "../../utils/helper";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axiosInstance from "../../services/axiosInstance";
import OverviewProduct from "./OverviewProduct";
import { useState } from "react";

const MySwal = withReactContent(Swal);

const CardListProduct = ({ product }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    const handleAddToCart = async () => {
        try {
            // Confirm with SweetAlert
            const result = await MySwal.fire({
                title: 'Add to Cart',
                text: `Are you sure you want to add ${product.name} to the cart?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, add it!',
                cancelButtonText: 'No, cancel',
            });

            if (result.isConfirmed) {
                // Send request to server
                await axiosInstance.post('/cart', {
                    productId: product.id,
                    totalItem: 1, // Adjust quantity as needed
                });

                MySwal.fire(
                    'Added!',
                    `${product.name} has been added to your cart.`,
                    'success'
                );
                closeModal()
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            MySwal.fire(
                'Error!',
                'There was an error adding the item to your cart.',
                'error'
            );
        }
    };

    return (
        <>
        {isModalOpen && (
            <OverviewProduct
            product={product}
            addToCart={handleAddToCart}
            onClose={closeModal}
            />
        )}
        <div className="shadow-md rounded-md flex flex-col h-full">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7" onClick={openModal}>
                <img 
                    src={product.photos[0]} 
                    alt={product.name} 
                    className="h-full w-full object-cover object-center group-hover:opacity-75 cursor-pointer" 
                    />
            </div>
            <div className="p-2 flex flex-col justify-between flex-grow">
                <div onClick={openModal} className="cursor-pointer">
                    <h3 className="mt-2 text-sm text-gray-700">{product.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{formatCurrency(product.price)}</p>
                </div>
                <button onClick={handleAddToCart} type="button" className="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                  </svg>
                  Add to cart
                </button>
            </div>
        </div>
        </>
    );
}

export default CardListProduct;
