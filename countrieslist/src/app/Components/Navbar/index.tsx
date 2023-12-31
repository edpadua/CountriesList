

import React from 'react'

import tw from "tailwind-styled-components"

import { AiFillFlag } from "react-icons/ai"

const Nav = tw.nav`
    bg-blue-800
    top-0 
    left-0 
    right-0 
    w-full 
    h-20 
    pt-5
`;

const NavContainer = tw.div`
    px-16 
    flex

`;

function Navbar() {
    return (
        <Nav>
            <NavContainer className='px-16 flex'>
                <AiFillFlag style={{ fontSize: '40px', color: "#ffffff" }} />
            </NavContainer>
        </Nav>
    )
}

export default Navbar
