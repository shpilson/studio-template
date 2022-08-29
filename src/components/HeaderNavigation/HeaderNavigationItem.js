import React from 'react'

const HeaderNavigationItem = (props) => {
    const { studioName, studioPhone } = props
    return (
        <div className='container'>
            <div className='navbox'>
                <a href="/">{studioName}</a>
                <p>{studioPhone}</p>
            </div>
        </div>
    )
}

export default HeaderNavigationItem