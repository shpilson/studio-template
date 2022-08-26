import React from 'react'

const HomepageBannerItem = (props) => {
    const { bannerTitle, bannerDescription, bannerBg } = props
    return (
        <div className='slideWrap' style={{ backgroundImage: `url(${bannerBg})` }}>
            <div className='container'>
                <div className='textWrap'>
                    <h2>{bannerTitle}</h2>
                    <div className='line'></div>
                    <p>{bannerDescription}</p>

                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                            <filter id="gooey">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                                <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="highContrastGraphic" />
                                <feComposite in="SourceGraphic" in2="highContrastGraphic" operator="atop" />
                            </filter>
                        </defs>
                    </svg>

                    <button id="gooey-button">
                        Заказать разработку
                        <span class="bubbles">
                            <span class="bubble"></span>
                            <span class="bubble"></span>
                            <span class="bubble"></span>
                            <span class="bubble"></span>
                            <span class="bubble"></span>
                            <span class="bubble"></span>
                            <span class="bubble"></span>
                            <span class="bubble"></span>
                            <span class="bubble"></span>
                            <span class="bubble"></span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomepageBannerItem