import { useNavigate } from "react-router-dom";
import CardListCart from "../components/Card/CardListCart";
import axiosInstance from "../services/axiosInstance";
import { useEffect, useState } from "react";
import { formatCurrency } from "../utils/helper";


const CartPage = ()=>{
    const navigate = useNavigate()
    const [cartProducts, setCartProducts] = useState([]);
    const [total, setTotal] = useState(0);
    
    const getCartProducts = async () => {
        try {
            const products = await axiosInstance.get('/cart')
            setTotal(products.data.totalPrice)
            setCartProducts(products.data.cartItems);
        } catch (error) {
            setCartProducts([])
            console.error('Failed to fetch cart products:', error);
        }
    };
    useEffect(() => {
        getCartProducts();
    }, []);

    return(
        <>
            <div className="font-sans max-w-4xl max-md:max-w-xl mx-auto p-4">
                <h1 className="text-2xl font-extrabold text-gray-800">Your Cart</h1>
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="md:col-span-2 space-y-4">
                    {cartProducts.length > 0 ? (
                        cartProducts.map((item) => (
                        <CardListCart key={item.id} product={item} updateList={getCartProducts} />
                        ))
                    ) : (
                        <div className="w-full flex items-center flex-wrap justify-center gap-10">
                            <div className="grid gap-4 w-60">
                                <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full shadow-sm justify-center items-center inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                                        <g id="File Serch">
                                        <path id="Vector" d="M19.9762 4V8C19.9762 8.61954 19.9762 8.92931 20.0274 9.18691C20.2379 10.2447 21.0648 11.0717 22.1226 11.2821C22.3802 11.3333 22.69 11.3333 23.3095 11.3333H27.3095M18.6429 19.3333L20.6429 21.3333M19.3095 28H13.9762C10.205 28 8.31934 28 7.14777 26.8284C5.9762 25.6569 5.9762 23.7712 5.9762 20V12C5.9762 8.22876 5.9762 6.34315 7.14777 5.17157C8.31934 4 10.205 4 13.9762 4H19.5812C20.7604 4 21.35 4 21.8711 4.23403C22.3922 4.46805 22.7839 4.90872 23.5674 5.79006L25.9624 8.48446C26.6284 9.23371 26.9614 9.60833 27.1355 10.0662C27.3095 10.524 27.3095 11.0253 27.3095 12.0277V20C27.3095 23.7712 27.3095 25.6569 26.138 26.8284C24.9664 28 23.0808 28 19.3095 28ZM19.3095 16.6667C19.3095 18.5076 17.8171 20 15.9762 20C14.1352 20 12.6429 18.5076 12.6429 16.6667C12.6429 14.8257 14.1352 13.3333 15.9762 13.3333C17.8171 13.3333 19.3095 14.8257 19.3095 16.6667Z" stroke="#4F46E5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                    </div>
                                    <div>
                                    <h2 className="text-center text-black text-lg font-semibold leading-7 pb-1">There’s no product here</h2>
                                    <p className="text-center text-black text-base font-normal leading-relaxed pb-4">Try changing your filters to <br />see appointments </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                    <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(6,81,237,0.3)]">
                        <ul className="text-gray-800 space-y-4">
                            <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-bold">{formatCurrency(total)}</span></li>
                            <li className="flex flex-wrap gap-4 text-sm">Shipping <span className="ml-auto font-bold">$0.00</span></li>
                            <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">$0.00</span></li>
                            <hr className="border-gray-300" />
                            <li className="flex flex-wrap gap-4 text-sm font-bold">Total <span className="ml-auto">{formatCurrency(total)}</span></li>
                        </ul>

                        <div className="mt-8 space-y-2">
                            <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md">Buy Now</button>
                            <button onClick={() => navigate('/product')} type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md">Continue Shopping  </button>
                        </div>

                        <div className="mt-4 flex flex-wrap justify-center gap-4">
                            <img src='https://readymadeui.com/images/master.webp' alt="card1" className="w-10 object-contain" />
                            <img src='https://readymadeui.com/images/visa.webp' alt="card2" className="w-10 object-contain" />
                            <img src='https://readymadeui.com/images/american-express.webp' alt="card3" className="w-10 object-contain" />
                        </div>
                    </div>
                </div>
            </div>                                                        
        </>
    )
    }
export default CartPage;