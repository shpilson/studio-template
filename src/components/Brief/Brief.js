import React, {useState, useEffect, useCallback} from "react";
import {client} from '../../client'
import Loader from "../Loader/Loader";
import Button from "../Button/Button";

const Brief = () => {
    const [brief, setBrief] = useState({})
    const [isBriefLoading, setIsBriefLoading] = useState(false)

    const cleanUpBrief = useCallback((rawData) => {
        const {sys, fields} = rawData
        const {id} = sys

        const sectionTitle = fields.title
        const sectionDescription = fields.description
        const buttonCTA = fields.cta
        const action = fields.action
        const helper = fields.helper
        const image = fields.image.fields.file.url

        let cleanBrief = {id, sectionTitle, sectionDescription, buttonCTA, action, helper, image}

        setBrief(cleanBrief)
    }, [])

    const getBrief = useCallback(async () => {
        setIsBriefLoading(true)
        try {
            const response = await client.getEntry('3BqXle5JY1xz1KVqMjquQN')
            if (response) {
                cleanUpBrief(response)
            } else {
                await getBrief({})
            }
            setIsBriefLoading(false)
        } catch (error) {
            console.log(error)
            setIsBriefLoading(false)
        }
    }, [cleanUpBrief])

    useEffect(() => {
        getBrief()
    }, [getBrief])

    if (isBriefLoading) {
        return <Loader/>
    }

    const {sectionTitle, sectionDescription, action, helper, image, buttonCTA} = brief

    return (
        <section className='brief' style={{backgroundImage: `url(${image})`}}>
            <div className='container'>
                <h3 className='section__title'>{sectionTitle}</h3>
                <p className='section__description'>{sectionDescription}</p>
                <div className='underline'/>
                <div className='brief-box'>
                    <div className='brief-action'>
                        {action}
                    </div>
                    <div className='brief-helper'>
                        {helper}
                    </div>
                </div>
                <div className='brief-btn'>
                    <Button buttonTitle={buttonCTA}/>
                </div>
            </div>

        </section>
    )
}

export default Brief