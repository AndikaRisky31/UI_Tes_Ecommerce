import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { formatCurrency } from '../../utils/helper';
import { CloseCircle } from 'iconsax-react';

const OverviewProduct = ({ product, addToCart, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75">
      <div className=" bg-white rounded-lg shadow-lg max-w-3xl w-full lg:w-2/3 lg:relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <CloseCircle size={24}/>
        </button>
        <div className="p-4 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full overflow-hidden">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                className="w-full"
              >
                {product.photos.map((photo, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={photo}
                      alt={`Slide ${index + 1}`}
                      className="w-full rounded-md object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{product.name} | {product.category}</h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-gray-800 text-xl font-bold">
                  {formatCurrency(product.price)}
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800">Description</h3>
                <p>{product.description}</p>
              </div>
              <button
                onClick={() => addToCart(product.id)}
                type="button"
                className="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewProduct;
