import React from 'react'

const Button = (props) => {
    const { buttonTitle } = props
    return (
        <a href="/">
            <button className="bn632-hover bn26">{buttonTitle}</button>
        </a>
    )
}

export default Button