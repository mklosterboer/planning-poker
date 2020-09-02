import React from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
    const activeStyle = { color: "lightblue" };

    return (
        <nav>
            <NavLink to="/" exact activeStyle={activeStyle}>
                Home
            </NavLink>
        </nav>
    );
}

export default Header;