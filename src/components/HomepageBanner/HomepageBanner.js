import React, { useState, useEffect, useCallback } from 'react'
import { client } from '../../client'
import Loader from '../Loader/Loader'
import HomepageBannerItem from './HomepageBannerItem'

const HomepageBanner = () => {
    const [isHomepageBannerLoading, setIsHomepageBannerLoading] = useState(false)
    const [homepageBannerItems, setHomepageBannerItems] = useState([])

    const cleanUpHomepageBannerItems = useCallback((rawData) => {
        const cleanItems = rawData.map((item) => {
            const { sys, fields } = item
            const { id } = sys
            const bannerTitle = fields.title
            const bannerDescription = fields.description
            const bannerBg = fields.image.fields.file.url
            const updatedBanner = { id, bannerTitle, bannerDescription, bannerBg }
            return updatedBanner
        })

        setHomepageBannerItems(cleanItems)
    }, [])

    const getHomepageBannerItems = useCallback(async () => {
        setIsHomepageBannerLoading(true)
        try {
            const response = await client.getEntries({ content_type: 'homepageBanner' })
            const responseData = response.items
            if (responseData) {
                cleanUpHomepageBannerItems(responseData)
            } else {
                setHomepageBannerItems([])
            }
            setIsHomepageBannerLoading(false)
        } catch (error) {
            console.log(error)
            setIsHomepageBannerLoading(false)
        }
    }, [cleanUpHomepageBannerItems])

    useEffect(() => {
        getHomepageBannerItems()
    }, [getHomepageBannerItems])

    if (isHomepageBannerLoading) {
        return <Loader />
    }

    if (!Array.isArray(homepageBannerItems) || !homepageBannerItems.length) {
        return null;
    }

    return (
        <div className='homepagebanner'>
            {homepageBannerItems.map((item) => {
                const { id, bannerBg, bannerTitle, bannerDescription } = item
                return (
                    <HomepageBannerItem
                        key={id}
                        bannerTitle={bannerTitle}
                        bannerDescription={bannerDescription}
                        bannerBg={bannerBg} />
                )
            })}
        </div>
    )
}

export default HomepageBanner