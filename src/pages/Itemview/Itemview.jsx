import React, { useEffect, useState } from 'react'
import './Itemview.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore, collection, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import FirebaseConfig from '../../scripts/firebaseConfig'
import SimilarSection from '../../components/SimilarSection/SimilarSection';
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

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
    const [items, setItems] = useState();
    async function getData() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const docRef = doc(db, "items", `${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setItems(docSnap.data());
        } else {
            console.log("No such document!");
        }
    }
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <header className='itemview__header'>
                <Link to={'/'}><button className='itemview__backIcon'><ion-icon name="arrow-back-outline"></ion-icon></button></Link>
                <h1 className='itemview__h1'>{items && items.categorie}</h1>
            </header>
            <Rowdiv>
                <Centerdiv>
                    <div className='itemview__div--1'>
                        <img src={items && items.images[0].replace(`["`, "")} alt="" />
                        <button className='itemview__heart'><ion-icon name="heart-outline"></ion-icon></button>
                        <button className='itemview__close'><ion-icon name="close-outline"></ion-icon></button>
                    </div>
                </Centerdiv>
                <Columndiv>
                    <p className='itemview__ratting'>Rating: <span><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon><ion-icon name="star"></ion-icon></span></p>
                    <p className='itemview__name'>{items && items.title}</p>
                    <p className='itemview__description'>{items && items.description}</p>
                    <div className='itemview__div--2'>
                        <p className='itemview__price'>${items && items.price}</p>
                        <div className='itemview__div--3'>
                            <button className='itemview__addCart'>Add to Cart</button>
                            <button className='itemview__buyNow'>Buy Now</button>
                        </div>
                    </div>
                </Columndiv>
            </Rowdiv>
            {items && <SimilarSection categorie={items.categorie} />}
        </>
    )
}

export default Itemview
