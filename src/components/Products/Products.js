import React, { useState, useEffect, useCallback } from 'react'
import { client } from '../../client'
import Loader from '../Loader/Loader';

const Products = () => {
    const [products, setProducts] = useState({})
    const [isProductsLoading, setIsProductsLoading] = useState(false)

    const cleanUpProducts = useCallback((rawData) => {
        const { sys, fields } = rawData
        const { id } = sys
        const productsTitle = fields.title
        const productstDescription = fields.description
        let cleanProducts = { id, productsTitle, productstDescription }

        setProducts(cleanProducts)
    }, [])

    const getProducts = useCallback(async () => {
        setIsProductsLoading(true)
        try {
            const response = await client.getEntry('114vBOVc5LYjXa1Eo31IOd')
            if (response) {
                cleanUpProducts(response)
            } else {
                getProducts({})
            }
            setIsProductsLoading(false)
        } catch (error) {
            console.log(error);
            setIsProductsLoading(false)
        }
    }, [cleanUpProducts])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    if (isProductsLoading) {
        return <Loader />
    }

    const { productsTitle, productstDescription } = products


    return (
        <section className='products' id='products'>
            <div className='container'>
                <h3 className='products__title'>{productsTitle}</h3>
                <p className='products__description'>{productstDescription}</p>
                <div className='underline'></div>
            </div>
        </section>




    )
}

export default Products