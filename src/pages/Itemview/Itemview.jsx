import React, { useEffect, useState } from 'react'
import './Itemview.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Centerdiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;    
`

const Columndiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
`

const Rowdiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;    
    justify-content: center;
    gap: 10px;
    @media (max-width: 600px) {
        flex-direction: column;
    }
`

const Itemview = () => {

    const [item, setItem] = useState(null)

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`).then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
            .then(data => {
                setItem(data);
                console.log(item);

            })

    }, [])

    return (
        <>
            <header className='itemview__header'>
                <Link to={'/'}><button className='itemview__backIcon'><ion-icon name="arrow-back-outline"></ion-icon></button></Link>
                <h1 className='itemview__h1'>{item && item.category.name}</h1>
            </header>
            <Rowdiv>
                <Centerdiv>
                    <div className='itemview__div--1'>
                        <img src={item && item.images[0].replace(`["`, "")} alt="" />
                        <button className='itemview__heart'><ion-icon name="heart-outline"></ion-icon></button>
                        <button className='itemview__close'><ion-icon name="close-outline"></ion-icon></button>
                    </div>
                </Centerdiv>
                <Columndiv>
                    <p className='itemview__ratting'>Rating: <span><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon></span></p>
                    <p className='itemview__name'>{item && item.title}</p>
                    <p className='itemview__description'>{item && item.description}</p>
                    <div className='itemview__div--2'>
                        <p className='itemview__price'>${item && item.price}</p>
                        <div className='itemview__div--3'>
                            <button className='itemview__addCart'>Add to Cart</button>
                            <button className='itemview__buyNow'>Buy Now</button>
                        </div>
                    </div>
                </Columndiv>
            </Rowdiv>
        </>
    )
}

export default Itemview
