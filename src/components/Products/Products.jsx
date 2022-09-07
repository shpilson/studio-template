import React, {useState, useEffect, useCallback} from 'react'
import {client} from '../../client'
import Button from '../Button/Button';
import Loader from '../Loader/Loader';


const Products = () => {
    const [products, setProducts] = useState({})
    const [isProductsLoading, setIsProductsLoading] = useState(false)

    const cleanUpProducts = useCallback((rawData) => {
        const {sys, fields} = rawData
        const {id} = sys
        const productsTitle = fields.title
        const productsDescription = fields.description

        // Cards start
        const cardsArray = fields.cards

        const cardItem = cardsArray.map((arrayItem, arrayItemIndex, wholeArray) =>
            <div className='card-item'>
                <div className='card-icon'>
                    <img alt='icon' height={64} width={64} src={arrayItem.fields.icon.fields.file.url}/>
                </div>
                <p className='card-title'>{arrayItem.fields.title}</p>
                <p className='card-description'>{arrayItem.fields.description}</p>
                <Button buttonTitle={arrayItem.fields.cta}/>
            </div>
        );
        console.log(cardsArray)
        // Cards End


        let cleanProducts = {
            id, productsTitle, productsDescription, cardItem
        }

        setProducts(cleanProducts)
    }, [])

    const getProducts = useCallback(async () => {
        setIsProductsLoading(true)
        try {
            const response = await client.getEntry('114vBOVc5LYjXa1Eo31IOd')
            if (response) {
                cleanUpProducts(response)
            } else {
                await getProducts({})
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
        return <Loader/>
    }

    const {productsTitle, productsDescription, cardItem} = products


    return (
        <section className='products' id='products'>
            <div className='container'>
                <h3 className='products__title'>{productsTitle}</h3>
                <p className='products__description'>{productsDescription}</p>
                <div className='underline'/>
                <div className='cards'>
                    {cardItem}
                </div>
            </div>
        </section>


    )
}

export default Products