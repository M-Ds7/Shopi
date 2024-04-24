 import { useContext } from 'react'
import  OrdersCard  from '../../Components/OrdersCard/OrdersCard'
import { ShoppingCardContext } from '../../Context/Context'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout/Layout'

const MyOrders = () => {
  const context = useContext(ShoppingCardContext)
  return (
    <>
      <Layout>
        <div className='flex  items-center justify-center relative w-80 mb-4'>
          <h1 className=' font-medium text-xl'>MyOrders</h1>
        </div>
        {
          context.order.map((order, index) => (
            <Link key={index} to={`/my-orders/${index}`}>
              <OrdersCard totalPrice={order.totalPrice} totalProducts={order.totalProducts} />
            </Link>
          ))
        }
      </Layout>
    </>
  )
}

export default MyOrders
