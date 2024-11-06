import React from 'react'
import styled from 'styled-components'

const H1 = styled.h1`
    color: #1e1e1e;
    font-family: "Poppins", serif;
    font-weight: 700;
    font-size: 30px;
    margin: 0px;
`
const Headerstyl = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin: 0px 0px 20px 0px;
`
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0px;
    outline-width: 0px;
    cursor: pointer;
    font-size: 32px;
    color: #1e1e1e;
`

const Header = () => {
    return (
        <Headerstyl>
            <H1>GShop</H1>
            <Button><ion-icon name="bag-handle-outline"></ion-icon></Button>
        </Headerstyl>
    )
}

export default Header
