import React from 'react'

const HeaderNavigationItem = (props) => {
    const {studioName, studioPhone} = props
    return (
        <div className='container'>
            <div className='navbox'>
                <a className='logo' href="/">{studioName}</a>

                <div className='navbox-item'>
                    <div className='phone'>
                        <a className='phone' href='https://t.me/imkowalenko'><span className={studioPhone}></span></a>
                    </div>
                    <div className='crossline'></div>
                    <select className='language'>
                        <option>EN</option>
                        <option>RU</option>
                    </select>

                </div>

                <div className='hamburger-menu'>
                    <input type="checkbox" id="main-navigation-toggle" class="btn btn--close"
                           title="Toggle main navigation"/>
                    <label for="main-navigation-toggle">
                        <span></span>
                    </label>

                    <nav id="main-navigation" class="nav-main">
                        <ul class="menu">
                            <li class="menu__item">
                                <a class="menu__link" href="/">Home</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="/development">Development</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="/design">Design</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="/support">Support</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="/portfolio">Portfolio</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="/reviews">Reviews</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="/brief">Brief</a>
                            </li>
                            <li class="menu__item">
                                <a class="menu__link" href="/contacts">Contacts</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default HeaderNavigationItem