import React, { useState, useEffect, useCallback } from 'react'
import { client } from '../../client'
import Loader from '../Loader/Loader'
import HeaderNavigationItem from './HeaderNavigationItem'


const HeaderNavigation = () => {
    const [isHeaderNavigationLoading, setIsHeaderNavigationLoading] = useState(false)
    const [headerNavigationItems, setHeaderNavigationItems] = useState([])

    const cleanUpHeaderNavigationItems = useCallback((rawData) => {
        const cleanItems = rawData.map((item) => {
            const { sys, fields } = item
            const { id } = sys
            const studioName = fields.studioName
            const studioPhone = fields.studioPhone
            const updatedNavigation = { id, studioName, studioPhone }
            return updatedNavigation
        })

        setHeaderNavigationItems(cleanItems)
    }, [])

    const getHeaderNavigationItems = useCallback(async () => {
        setIsHeaderNavigationLoading(true)
        try {
            const response = await client.getEntries({ content_type: 'headerNavigation' })
            const responseData = response.items
            if (responseData) {
                cleanUpHeaderNavigationItems(responseData)
            } else {
                setHeaderNavigationItems([])
            }
            setIsHeaderNavigationLoading(false)
        } catch (error) {
            console.log(error)
            setIsHeaderNavigationLoading(false)
        }
    }, [cleanUpHeaderNavigationItems])

    useEffect(() => {
        getHeaderNavigationItems()
    }, [getHeaderNavigationItems])

    if (isHeaderNavigationLoading) {
        return <Loader />
    }

    if (!Array.isArray(headerNavigationItems) || !headerNavigationItems.length) {
        return null;
    }

    return (
        <div className="navbar">
            {headerNavigationItems.map((item) => {
                const { id, studioName, studioPhone } = item
                return (
                    <HeaderNavigationItem
                        key={id}
                        studioName={studioName}
                        studioPhone={studioPhone}
                    />
                )
            })}
        </div>
    )
}

export default HeaderNavigation