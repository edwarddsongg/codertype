import React from 'react';
import './nav.css'
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements'

const NavBar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavMenu>
                        <NavLink to='/code' activeStyle>
                            Code
                        </NavLink>
                        <NavLink class = "nav_hover" to='/standings' activeStyle>
                            Standings
                        </NavLink>
                        <NavLink class = "nav_hover" to='/contact' activeStyle>
                            Contact
                        </NavLink>
                        <NavLink class = "nav_hover" to='/sign-up' activeStyle>
                            Sign Up
                        </NavLink>
                        {/* Second Nav */}
                        {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                    </NavBtn>
                </NavMenu>
            </Nav>
        </>
    );
};

export default NavBar;