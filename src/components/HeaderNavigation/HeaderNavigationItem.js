import React from 'react'

const HeaderNavigationItem = (props) => {
    const { studioName, studioPhone } = props
    return (
        <div className='container'>
            <div className='navbox'>
                <a href="/">{studioName}</a>
                <div className="phone">
                    <span className={studioPhone}></span>
                </div>
            </div>
        </div >
    )
}

export default HeaderNavigationItem