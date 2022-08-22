import React from 'react'

const HomepageBannerItem = (props) => {
    const { id, bannerTitle, bannerDescription, bannerBg } = props
    return (
        <div className='slideWrap' style={{ backgroundImage: `url(${bannerBg})` }}>
            <div className='textWrap'>
                <h2>{bannerTitle}</h2>
                <p>{bannerDescription}</p>
            </div>
        </div>
    )
}

export default HomepageBannerItem