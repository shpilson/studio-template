import React, {useState, useEffect, useCallback} from "react";
import {client} from '../../client'
import Loader from "../Loader/Loader";

const CallMeBanner = () => {
    const [callmebanner, setCallmebanner] = useState({})
    const [isCallmeBannerLoading, setIsCallMeBannerLoading] = useState(false)

    const cleanUpCallMeBanner = useCallback((rawData) => {
        const {sys, fields} = rawData
        const {id} = sys

        const bannerTitle = fields.title
        const inputName = fields.name
        const inputEmail = fields.email
        const buttonText = fields.button

        let cleanCallMeBanner = {id, bannerTitle, inputName, inputEmail, buttonText}

        setCallmebanner(cleanCallMeBanner)
    }, [])

    const getCallMeBanner = useCallback(async () => {
        setIsCallMeBannerLoading(true)
        try {
            const response = await client.getEntry('4Inzsit97KmtplXiIGLdQ2')
            if (response) {
                cleanUpCallMeBanner(response)
            } else {
                await getCallMeBanner({})
            }
            setIsCallMeBannerLoading(false)
        } catch (error) {
            console.log(error)
            setIsCallMeBannerLoading(false)
        }
    }, [cleanUpCallMeBanner])

    useEffect(() => {
        getCallMeBanner()
    }, [getCallMeBanner])

    if (isCallmeBannerLoading) {
        return <Loader/>
    }

    const {bannerTitle, inputName, inputEmail, buttonText} = callmebanner

    return (
        <section className='callmebanner' id='callmebanner'>
            <div className='container'>
                <h2 className='callmebanner__title'>{bannerTitle}</h2>
                <div className='cmb__box'>
                    <input type='text' placeholder={inputName}/>
                    <input type='email' placeholder={inputEmail}/>
                    <button>{buttonText}</button>
                </div>
            </div>
        </section>
    )
}

export default CallMeBanner