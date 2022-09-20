import React, {useState, useEffect, useCallback} from "react";
import {client} from '../../client'
import Loader from "../Loader/Loader";
import Button from "../Button/Button";

// SWIPER
import {Swiper, SwiperSlide} from "swiper/react"

import {Pagination} from "swiper";

import "swiper/css";
import "swiper/css/pagination";

const pagination = {
    clickable: true
};
// END SWIPER

const Reviews = () => {
    const [reviews, setReviews] = useState({})
    const [isReviewsLoading, setIsReviewsLoading] = useState(false)

    const cleanUpReviews = useCallback((rawData) => {
        const {sys, fields} = rawData
        const {id} = sys

        const sectionTitle = fields.title
        const sectionDescription = fields.description
        const buttonCTA = fields.cta

        // FEEDBACK

        const feedbacksArray = fields.feedback
        console.log(feedbacksArray)

        const feedback = feedbacksArray.map((arrayItem) =>
            <SwiperSlide>
                <div className='feedback-item'>
                    <div className='feedback-header'>
                        <div className='feedback-column'>
                            <div className='feedback-item__name'>
                                {arrayItem.fields.name}
                            </div>
                            <div className='underline'/>
                            <div className='feedback-item__position'>
                                {arrayItem.fields.position}
                            </div>
                        </div>
                        <div className='feedback-column'>
                            <img src={arrayItem.fields.photo.fields.file.url}
                                 alt={arrayItem.fields.name}/>
                        </div>
                    </div>
                    <div className='feedback-desc'>
                        {arrayItem.fields.review}
                    </div>
                </div>
            </SwiperSlide>
        );

        // FEEDBACK END

        let cleanReviews = {id, sectionTitle, sectionDescription, buttonCTA, feedback}

        setReviews(cleanReviews)
    }, [])

    const getReviews = useCallback(async () => {
        setIsReviewsLoading(true)
        try {
            const response = await client.getEntry('1xOn94WYuSVE8Jdak1pHAg')
            if (response) {
                cleanUpReviews(response)
            } else {
                await getReviews({})
            }
            setIsReviewsLoading(false)
        } catch (error) {
            console.log(error)
            setIsReviewsLoading(false)
        }
    }, [cleanUpReviews])

    useEffect(() => {
        getReviews()
    }, [getReviews])

    if (isReviewsLoading) {
        return <Loader/>
    }

    const {sectionTitle, sectionDescription, buttonCTA, feedback} = reviews

    return (
        <section className='reviews'>
            <div className='container'>
                <h3 className='section__title'>{sectionTitle}</h3>
                <p className='section__description'>{sectionDescription}</p>
                <div className='underline'/>
                <div className='feedback-box'>
                    <Swiper className='my-swiper'
                            pagination={pagination}
                            modules={[Pagination]}
                            rewind={true}
                            slidesPerView={2}>
                        {feedback}
                    </Swiper>
                </div>
                <div className='reviews-btn'>
                    <Button buttonTitle={buttonCTA}/>
                </div>
            </div>

        </section>
    )
}

export default Reviews