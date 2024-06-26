import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import { ShoppingCardContext } from '../../Context/Context'
import { totalPrice } from '../../Utiles/Utiles'
import './CheckOutProdcuctMenu.css'
import OrderCar from '../OrderCard/OrderCar'

const CheckOutProdcuctMenu = () => {
    const context = useContext(ShoppingCardContext)

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id !== id)
        context.setCartProducts(filteredProducts)
    }

    const handleCheckOut = () => {
        const orderToAdd = {
            date: '01.02.2023',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }

        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.setSearchByArticule(null)
    }
    return (
        <>
            <aside
                className={`${context.isCheckouProductMenu ? 'flex' : 'hidden'} checkOut-product-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
                <div className='flex justify-between items-center p-6'>
                    <h2 className='font-medium text-xl'> My Order </h2>
                    <div>
                        <XMarkIcon className='h-6 w-6 text-black cursor-pointer'
                            onClick={() => context.closeCheckouProductMenu()}
                        />
                    </div>
                </div>
                <div className='px-6 overflow-y-scroll flex-1'>
                    {
                        context.cartProducts.map((product) => (
                            <OrderCar
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                imageURL={product.images}
                                price={product.price}
                                handleDelete={handleDelete}
                            />
                        ))
                    }
                </div>
                <div className='px-6 mb-6'>
                    <p className='flex justify-between items-center mb-2'>
                        <span className=' font-light'>Total:</span>
                        <span className=' font-bold text-2xl'>${totalPrice(context.cartProducts)}</span>
                    </p>
                    <Link to='/my-orders/last'>
                        <button onClick={() => handleCheckOut()} className='w-full py-3 text-white rounded-lg bg-black'>CheckOut</button>
                    </Link>
                </div>
            </aside>
        </>
    )
}

export default CheckOutProdcuctMenu
