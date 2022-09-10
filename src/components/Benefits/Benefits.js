import React, {useState, useEffect, useCallback} from "react"
import {client} from '../../client'
import Loader from "../Loader/Loader";

const Benefits = () => {
    const [benefits, setBenefits] = useState({})
    const [isBenefitsLoading, setIsBenefitsLoading] = useState(false)

    const cleanUpBenefits = useCallback((rawData) => {
        const {sys, fields} = rawData
        const {id} = sys

        const sectionTitle = fields.title
        const sectionDescription = fields.description

        // ADVANTAGES CARDS

        const advantagesArray = fields.advantages

        const advantageItem = advantagesArray.map((arrayItem) =>
            <div className='advantage__card-item'>
                <img className='advantage__card-icon' alt='icon' height={64} width={64}
                     src={arrayItem.fields.icon.fields.file.url}/>
                <p className='advantage__card-title'>{arrayItem.fields.title}</p>
                <p className='advantage__card-description'>{arrayItem.fields.description}</p>
            </div>
        );

        // ADVANTAGES CARDS END

        let cleanBenefits = {id, sectionTitle, sectionDescription, advantageItem}

        setBenefits(cleanBenefits)
        console.log(rawData)
    }, [])

    const getBenefits = useCallback(async () => {
        setIsBenefitsLoading(true)
        try {
            const response = await client.getEntry('13x9I9ImN5S5IGHgpKsFTK')
            if (response) {
                cleanUpBenefits(response)
            } else {
                await getBenefits({})
            }
            setIsBenefitsLoading(false)
        } catch (error) {
            console.log(error);
            setIsBenefitsLoading(false)
        }
    }, [cleanUpBenefits])

    useEffect(() => {
        getBenefits()
    }, [getBenefits])

    if (isBenefitsLoading) {
        return <Loader/>
    }

    const {sectionTitle, sectionDescription, advantageItem} = benefits


    return (
        <section className='benefits' id='benefits'>
            <div className='container'>
                <h3 className='section__title'>{sectionTitle}</h3>
                <p className='section__description'>{sectionDescription}</p>
                <div className='underline'/>
                <div className='advantage__cards'>
                    {advantageItem}
                </div>
            </div>
        </section>
    )
}

export default Benefits