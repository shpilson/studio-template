import React, {useState, useEffect, useCallback} from "react";
import {client} from '../../client'
import Loader from "../Loader/Loader";

const Clients = () => {
    const [clients, setClients] = useState({})
    const [isClientsLoading, setIsClientsLoading] = useState(false)

    const cleanUpClients = useCallback((rawData) => {
        const {sys, fields} = rawData
        const {id} = sys

        const sectionTitle = fields.title
        const sectionDescription = fields.description

        let cleanClients = {id, sectionTitle, sectionDescription}

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

    const {sectionTitle, sectionDescription} = clients

    return (
        <section className='clients'>
            <div className='container'>
                <h3 className='section__title'>{sectionTitle}</h3>
                <p className='section__description'>{sectionDescription}</p>
                <div className='underline'/>
            </div>
        </section>
    )
}

export default Clients