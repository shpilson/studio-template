import React from 'react'
import Button from '../Button/Button'


const HomepageBannerItem = (props) => {
    const { bannerTitle, bannerDescription, bannerBg, buttonTitle } = props
    return (
        <div className='slideWrap'
            style={{ backgroundImage: `url(${bannerBg})` }}>
            <div className='container'>
                <div className='textWrap'>
                    <h2>{bannerTitle}</h2>
                    <div className='line' />
                    <p>{bannerDescription}</p>

                    <Button buttonTitle={buttonTitle} />
                </div>
            </div>
        </div>

    )
}

export default HomepageBannerItem