import React, {useState, useEffect, useCallback} from 'react'
import {client} from '../../client'
import Loader from '../Loader/Loader';

const Footer = () => {
    const [footer, setFooter] = useState({})
    const [isFooterLoading, setIsFooterLoading] = useState(false)

    const cleanUpFooter = useCallback((rawData) => {
        const {sys, fields} = rawData
        const {id} = sys

        const studioName = fields.studioName
        const workingYears = fields.workingYears
        const phoneTitle = fields.phoneTitle
        const phone = fields.phone
        const emailTitle = fields.emailTitle
        const email = fields.email
        const socialsTitle = fields.socialsTitle
        const telegram = fields.telegram
        const behance = fields.behance
        const github = fields.github

        const servicesTitle = fields.servicesTitle
        // SERVICES LINKS START
        const servicesArray = fields.servicesLinks
        const serviceLink = servicesArray.map((arrayItem) =>
            <div className='service-link'>
                <a className='footer__link' href={arrayItem.fields.link}>{arrayItem.fields.title}</a>
            </div>
        );
        // SERVICES LINKS END

        const infoTitle = fields.infoTitle
        // INFO LINKS START
        const infoArray = fields.infoLinks
        const infoLink = infoArray.map((arrayItem) =>
            <div className='info-link'>
                <a className='footer__link' href={arrayItem.fields.link}>{arrayItem.fields.title}</a>
            </div>
        );
        // INFO LINKS END

        let cleanFooter = {
            id, studioName, workingYears, phoneTitle, phone, emailTitle,
            email, socialsTitle, telegram, behance, github, servicesTitle, serviceLink, infoTitle, infoLink
        }

        setFooter(cleanFooter)
    }, [])

    const getFooter = useCallback(async () => {
        setIsFooterLoading(true)
        try {
            const response = await client.getEntry('46hA62wll3ApTt5RzDTkvk')
            if (response) {
                cleanUpFooter(response)
            } else {
                await getFooter({})
            }
            setIsFooterLoading(false)
        } catch (error) {
            console.log(error);
            setIsFooterLoading(false)
        }
    }, [cleanUpFooter])

    useEffect(() => {
        getFooter()
    }, [getFooter])

    if (isFooterLoading) {
        return <Loader/>
    }

    const {
        studioName, workingYears, phoneTitle, phone, emailTitle,
        email, socialsTitle, telegram, behance, github, servicesTitle, serviceLink, infoTitle, infoLink
    } = footer

    return (
        <footer>
            <div className='container'>
                <div className='footer-box'>
                    <div className='footer-column'>
                        <div className='footer__brand'>{studioName}</div>
                        <div className='footer__years'>{workingYears}</div>

                        <div className='footer__phone-box'>
                            <div className='footer__phone-box-title'>
                                {phoneTitle}
                            </div>
                            <div className='footer__phone-box-phone'>
                                {phone}
                            </div>
                        </div>

                        <div className='footer__email-box'>
                            <div className='footer__email-box-title'>
                                {emailTitle}
                            </div>
                            <div className='footer__email-box-email'>
                                {email}
                            </div>
                        </div>

                        <div className='footer__socials-box'>
                            <div className='footer__socials-box-title'>
                                {socialsTitle}
                            </div>
                            <div className='footer__socials-box-links'>
                                <a href={telegram} target='_blank' rel="noreferrer">
                                    <div className='footer__social-box-links-telegram'/>
                                </a>
                                <a href={behance} target='_blank' rel="noreferrer">
                                    <div className='footer__social-box-links-behance'/>
                                </a>
                                <a href={github} target='_blank' rel="noreferrer">
                                    <div className='footer__social-box-links-github'/>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='footer-column'>
                        <div className='footer__services'>
                            {servicesTitle}
                        </div>
                        <div className='footer__services-list'>
                            {serviceLink}
                        </div>
                    </div>

                    <div className='footer-column'>
                        <div className='footer__info'>
                            {infoTitle}
                        </div>
                        <div className='footer__info-list'>
                            {infoLink}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer