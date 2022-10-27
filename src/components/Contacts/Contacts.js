import React, {useState, useEffect, useCallback} from "react";
import {client} from '../../client'
import Loader from "../Loader/Loader";
import Button from "../Button/Button";

const Contacts = () => {
    const [contacts, setContacts] = useState({})
    const [isContactsLoading, setIsContactsLoading] = useState(false)

    const cleanUpContacts = useCallback((rawData) => {
        const {sys, fields} = rawData
        const {id} = sys

        const title = fields.title
        const description = fields.description
        const telegram = fields.telegram
        const phone = fields.phone
        const email = fields.email

        const boxTitle = fields.boxTitle
        const boxName = fields.boxName
        const boxPhone = fields.boxPhone
        const boxEmail = fields.boxEmail
        const boxMessage = fields.boxMessage
        const boxCTA = fields.boxCta

        let cleanContacts = {
            id, title, description, telegram, phone, email,
            boxTitle, boxName, boxPhone, boxEmail, boxMessage, boxCTA
        }

        setContacts(cleanContacts)
    }, [])

    const getContacts = useCallback(async () => {
        setIsContactsLoading(true)
        try {
            const response = await client.getEntry('1464Q9VCedzkAvksT1VuX6')
            if (response) {
                cleanUpContacts(response)
            } else {
                await getContacts({})
            }
            setIsContactsLoading(false)
        } catch (error) {
            console.log(error)
            setIsContactsLoading(false)
        }
    }, [cleanUpContacts])

    useEffect(() => {
        getContacts()
    }, [getContacts])

    if (isContactsLoading) {
        return <Loader/>
    }

    const {
        id, title, description, telegram, phone, email,
        boxTitle, boxName, boxPhone, boxEmail, boxMessage, boxCTA
    } = contacts

    return (
        <section className='contacts'>
            <div className='container'>
                <h3 className='section__title'>{title}</h3>
                <p className='section__description'>{description}</p>
                <div className='underline'/>

                <div className='contacts__content'>
                    <div className='contacts__info'>
                        <div className='contacts__info-box'>
                            <div className='contacts__info-telegram'>
                                {telegram}
                            </div>
                            <div className='contacts__info-phone'>
                                {phone}
                            </div>
                            <div className='contacts__info-email'>
                                {email}
                            </div>
                        </div>
                    </div>

                    <form className='contacts__box'>
                        <h4 className='contacts__box-title'>{boxTitle}</h4>
                        <div className='contacts__box-upper-inputs'>
                            <input className='contacts__box-name' placeholder={boxName}/>
                            <input className='contacts__box-phone' placeholder={boxPhone}/>
                        </div>
                        <input className='contacts__box-email' placeholder={boxEmail}/>
                        <textarea className='contacts__box-message' placeholder={boxMessage}/>

                        <div className='contacts__button'>
                            <Button buttonTitle={boxCTA}/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contacts