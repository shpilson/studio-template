import React, { useState, useEffect, useCallback } from 'react'
import { client } from '../../client'
import Button from '../Button/Button';
import Loader from '../Loader/Loader';


const Products = () => {
    const [products, setProducts] = useState({})
    const [isProductsLoading, setIsProductsLoading] = useState(false)

    const cleanUpProducts = useCallback((rawData) => {
        const { sys, fields } = rawData
        const { id } = sys
        const productsTitle = fields.title
        const productstDescription = fields.description

        const productsCardIcon = fields.cards[0].fields.icon.fields.file.url
        const productsCardTitle = fields.cards[0].fields.title
        const productsCardDescription = fields.cards[0].fields.description
        const productsCardCTA = fields.cards[0].fields.cta

        let cleanProducts = {
            id, productsTitle, productstDescription,
            productsCardTitle, productsCardIcon, productsCardDescription, productsCardCTA
        }

        setProducts(cleanProducts)
        console.log(rawData)
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

    const { productsTitle, productstDescription, productsCardTitle,
        productsCardIcon, productsCardDescription, productsCardCTA } = products


    return (
        <section className='products' id='products'>
            <div className='container'>
                <h3 className='products__title'>{productsTitle}</h3>
                <p className='products__description'>{productstDescription}</p>
                <div className='underline'></div>

                <div className='cards'>
                    <div className='card-item'>
                        <img alt={productsCardTitle} height={64} width={64} src={productsCardIcon} />
                        <p className='card-title'>{productsCardTitle}</p>
                        <p className='card-description'>{productsCardDescription}</p>
                        <Button buttonTitle={productsCardCTA} />
                    </div>
                </div>
            </div>
        </section>




    )
}

export default Products