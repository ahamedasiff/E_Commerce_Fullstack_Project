import React, { useContext, useEffect, useState } from 'react'
import { ShopContxt } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProduct = ({ category, subcategory }) => {

    const { products } = useContext(ShopContxt)
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice()

            productsCopy = productsCopy.filter(product => product.category === category)
            productsCopy = productsCopy.filter(product => product.subCategory === subcategory)

            setRelated(productsCopy.slice(0, 5)) // Get only 5 related products
        }

    },[products])

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>   

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((item, index) => (
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))}
        </div>   
    </div>
  )
}

export default RelatedProduct
  