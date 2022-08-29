import React from 'react'

const HeaderNavigationItem = (props) => {
    const { studioName, studioPhone } = props
    return (
        <div className='container'>
            <div className='navbox'>
                <a href="/">{studioName}</a>

                <div className='navbox-item'>
                    <div className='phone'>
                        <span className={studioPhone}></span>
                    </div>

                    <div className='crossline'></div>


                    <select className='language'>
                        <option>RU</option>
                        <option>EN</option>
                    </select>

                </div>

                <div className='menu'>

                </div>
            </div>
        </div >
    )
}

export default HeaderNavigationItem