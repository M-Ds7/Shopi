import { createContext, useState, useEffect } from "react"

export const ShoppingCardContext = createContext()


export const ShoppingCardProvider = ({ children }) => {
    const [count, setCount] = useState(0)

    //abrir y cerrar ventana de detalle de producto
    const [isProductDetail, setIsProductDetail] = useState(false)
    const openProductDetail = () => setIsProductDetail(true)
    const closeProductDetail = () => setIsProductDetail(false)

    //abrir y cerrar ventana de detalle de carrito
    const [isCheckouProductMenu, setIsCheckouProductMenu] = useState(false)
    const openCheckouProductMenu = () => setIsCheckouProductMenu(true)
    const closeCheckouProductMenu = () => setIsCheckouProductMenu(false)

    //mostrar detalles de producto
    const [productToShow, setProductToShow] = useState({})

    //detalle de carrito de compra
    const [cartProducts, setCartProducts] = useState([])

    //order
    const [order, setOrder] = useState([])

    //para obtener los productos de la API
    const [items, setItems] = useState(null)

    //filtracion de productos por busquedas
    const [filteredItems, setFilteredItems] = useState(null)

    //busqueda de articulos
    const [searchByArticule, setSearchByArticule] = useState(null)

    //busqueda de productos por etiquetas
    const [searchByCategory, setSearchByCategory] = useState(null)

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
          .then(response => response.json())
          .then(data => setItems(data))
      }, [])

      const filteredItemsByProducts = (items, searchByArticule) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByArticule.toLowerCase()))
      }

      useEffect(() => {
        if (searchByArticule && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY',items, searchByArticule))
        if (searchByArticule && !searchByCategory) setFilteredItems(filterBy('BY_TITLE',items, searchByArticule))
        if (searchByCategory && !searchByArticule) setFilteredItems(filterBy('BY_CATEGORY',items, searchByCategory))
        if (!searchByCategory && !searchByArticule) setFilteredItems(filterBy(null,items, searchByCategory))
      },[items, searchByArticule, searchByCategory, filterBy])

      const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
      }

      const filterBy = (searchType, items, searchByArticule) => {
        if(searchType === 'BY_TITLE') {
            return filteredItemsByProducts(items, searchByArticule)
        }

        if(searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory)
        }
        
        if(searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
        }

        if(!searchType) {
            return items
        }
      }

    return (
        <ShoppingCardContext.Provider value={{
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetail,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckouProductMenu,
            openCheckouProductMenu,
            closeCheckouProductMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByArticule,
            setSearchByArticule,
            filteredItems,
            searchByCategory,
            setSearchByCategory
        }}>
            {children}
        </ShoppingCardContext.Provider>
    )
}