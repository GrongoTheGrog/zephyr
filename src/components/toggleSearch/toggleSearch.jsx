import { useEffect, useRef, useState } from 'react';
import './toggleSearch.css';
import { Link } from 'react-router-dom';

export function ToggleSearch({city}){

    const [current, setCurrent] = useState(0);

    const buttons = [
        {label: 'Your Location', class: 'local', link: `/places/${city}`},
        {label: 'Search Location', class: 'search', link: `/search`}
    ]

    return (
        <section className='buttons-toggle-contaniner'>
            {buttons.map((button, index) => {
                return <Link
                    key={index}
                    className={`toggle-button ${button.class} ${current === index ? 'active-toggle' : null}`}
                    onClick={() => setCurrent(index)}
                    to={button.link}
                >
                    {button.label}
                </Link>
            })}
        </section>
    )
}