import { Link } from 'react-router-dom'

import './styles.css'


export function Header(props) {
    return (
        <header>
            <Link to="/">
                <div className="logo">
                <img src="../src/images/pokedex.png" alt="Pokédex" />
                </div>
            </Link>
            {props.children}
            <div className="header-circle"></div>
        </header>
    )
}

