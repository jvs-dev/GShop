import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Article = styled.article`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 220px;
`
const Div = styled.div`
    position: relative;
    width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Img = styled.img`
    border-radius: 10px;
    width: 100%;
    background: #fff;
`
const Div2 = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
`

const Name = styled.p`
    font-family: "Poppins", serif;
    font-size: 14px;
    font-weight: 500;
    margin: 0px;
    margin-top: 24px;
    line-height: 110%;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #1e1e1e;
    text-align: left;
`

const Price = styled.p`
    font-family: "Poppins", serif;
    margin: 0px 0px 0px 0px;
    font-weight: 600;
    font-size: 18px;
`

const Addcart = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1a635;
    border: 0px;
    outline-width: 0px;
    cursor: pointer;
    font-size: 24px;
    color: #fff;
    border-radius: 100%;
    position: absolute;
    bottom: -20px;
    right: 20px;
    padding: 8px;
`

const Itemcard = (props) => {
    const handleClick = () => {
        localStorage.setItem('itemAcessed', props.categorie);
        window.location.href = `/item?id=${props.id}`;        
    }

    return (
        <Article onClick={handleClick}>
            <Div>
                <Img src={props.image} />
                <Addcart><ion-icon name="add-outline"></ion-icon></Addcart>
            </Div>
            <Div2>
                <Name>{props.title}</Name>
                <Price>${props.price}</Price>
            </Div2>
        </Article>
    )
}

export default Itemcard
