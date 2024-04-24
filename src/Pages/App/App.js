import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCardProvider } from '../../Context/Context'
import Index from '../Home/Index';
import MyAccount from '../MyAccount/MyAccount'
import MyOrder from '../MyOrder/MyOrder'
import MyOrders from '../MyOrders/MyOrders'
import NotFound from '../NotFound/NotFound'
import SingIn from '../SignIn/SingIn'
import Navbar from '../../Components/Navbar/Navbar';
import CheckOutProdcuctMenu from '../../Components/CheckoutProductMenu/CheckOutProdcuctMenu';
import './App.css';



const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Index /> },
    { path: '/clothes', element: <Index /> },
    { path: '/electronics', element: <Index /> },
    { path: '/fornitures', element: <Index /> },
    { path: '/toys', element: <Index /> },
    { path: '/others', element: <Index /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '/my-order', element: <MyOrder /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/sing-in', element: <SingIn /> },
    { path: '/*', element: <NotFound /> }
  ])

  return routes
}

const App = () => {
  return (
    <>
    <ShoppingCardProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckOutProdcuctMenu/>
      </BrowserRouter>
    </ShoppingCardProvider>
    </>
  );
}

export default App;
