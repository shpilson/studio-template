import React, {useState, useEffect, useCallback} from "react";
import {client} from '../../client'
import Loader from "../Loader/Loader";
import Button from "../Button/Button";

import {Swiper, SwiperSlide} from "swiper/react"

// Import Swiper styles
import "swiper/css";

const Clients = () => {
    const [clients, setClients] = useState({})
    const [isClientsLoading, setIsClientsLoading] = useState(false)

    const cleanUpClients = useCallback((rawData) => {
        const {sys, fields} = rawData
        const {id} = sys

        const sectionTitle = fields.title
        const sectionDescription = fields.description
        const buttonCTA = fields.cta


        // PROJECT CARD

        const projectsArray = fields.projects

        const projectItem = projectsArray.map((arrayItem) =>
            <SwiperSlide>
                <div className='project-card__item'
                     style={{backgroundImage: `url(${arrayItem.fields.preview.fields.file.url})`}}>
                    <div className='client-btn'>
                        <Button buttonTitle={arrayItem.fields.website}/>
                    </div>
                </div>
            </SwiperSlide>
        );

        // PROJECT CARD END

        let cleanClients = {id, sectionTitle, sectionDescription, buttonCTA, projectItem}

        setClients(cleanClients)
    }, [])

    const getClients = useCallback(async () => {
        setIsClientsLoading(true)
        try {
            const response = await client.getEntry('3VKsquMYs26tq4OC7AVx0H')
            if (response) {
                cleanUpClients(response)
            } else {
                await getClients({})
            }
            setIsClientsLoading(false)
        } catch (error) {
            console.log(error)
            setIsClientsLoading(false)
        }
    }, [cleanUpClients])

    useEffect(() => {
        getClients()
    }, [getClients])

    if (isClientsLoading) {
        return <Loader/>
    }

    const {sectionTitle, sectionDescription, buttonCTA, projectItem} = clients

    return (
        <section className='clients'>
            <div className='container'>
                <h3 className='section__title'>{sectionTitle}</h3>
                <p className='section__description'>{sectionDescription}</p>
                <div className='underline'/>
                <div className='clients-box'>
                    <Swiper rewind={true}
                            slidesPerView={3}>
                        {projectItem}
                    </Swiper>
                </div>
                <div className='clients-btn'>
                    <Button buttonTitle={buttonCTA}/>
                </div>

            </div>
        </section>
    )
}

export default Clients