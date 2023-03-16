import React from 'react'
import axios from 'axios'
import ProductComponent from '@/components/Product'
// import { findAllProducts } from '@/pages/api/products'

const findAllProducts = async () => {
  const { data } = await axios.get('http://localhost:3000/api/products')
  return data
}

const Home = async () => {
  const products = await findAllProducts()
  // console.log(products)

  const categories = [...new Set(products.map(p => p.category))];
  // console.log({categories})

  return (

    <div className='p-5'>
      <input type="text" className='w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-400' placeholder='Search' />
      <div>
        {categories.map(category => (
          <div key={category}>
            <h2 className='text-2xl py-5 capitalize'>{category}</h2>
            <div className='flex -mx-5 overflow-x-scroll snap-x scrollbar-hide'>
              {products.filter(p => p.category === category).map(productInfo => (
                <div key={productInfo._id} className='px-5 snap-start'>
                  <ProductComponent {...productInfo} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default Home;

