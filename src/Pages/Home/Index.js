import { useContext } from "react"
import { ShoppingCardContext } from "../../Context/Context"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import Card from "../../Components/Card/Card"
import Layout from "../../Components/Layout/Layout"
import ProducDetail from "../../Components/ProductDatail/ProducDetail"


const Index = () => {
  const context = useContext(ShoppingCardContext)

  const renderview = () => {

    if (context.filteredItems?.length > 0) {
      return (
        context.filteredItems?.map((item) => (
          <Card key={item.id} data={item} />
        ))
      )
    } else {
      return (
        <p>
          The product does not exist
        </p>
      )
    }
  }

  return (
    <>
      <Layout>
        <div className='flex items-center justify-center relative w-80 mb-4'>
          <h1 className='font-medium text-xl'>Exclusive Products</h1>
        </div>
        <div className="flex items-center justify-between gap-2">
          <input type="text"
            placeholder="Search a Product"
            className='border border-black rounded-lg mb-4 w-80 h-10 p-4 focus:outline-none'
            onChange={(event) => context.setSearchByArticule(event.target.value)}
          />
          <MagnifyingGlassIcon className="h-6 w-6" />
        </div>
        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
          {
            renderview()
          }

        </div>
        <ProducDetail />
      </Layout>
    </>
  )
}

export default Index