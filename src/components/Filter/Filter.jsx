import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import FirebaseConfig from '../../scripts/firebaseConfig'
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);


const Div = styled.div`
    display: flex;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    scroll-behavior: smooth;
    scroll-snap-type: proximity;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;
    -ms-overflow-style: none; /* IE and Edge */
    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, and Opera */
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-corner {
        background: transparent;
    }
    &::-webkit-scrollbar-button {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #bbb;
    }
    &::-webkit-scrollbar-thumb:active {
        background: #aaa;
    }       
    width: 100%;
    gap: 12px;
    padding: 0px 20px;
`
const Button = styled.button`
    background: #ECECEC;
    color: #1e1e1e;
    border: 0px;
    outline-width: 0px;
    font-family: "Poppins", serif;
    font-size: 16px;
    font-weight: 500;
    padding: 2px 14px;
    border-radius: 2px;
    cursor: pointer;
`

const Filter = () => {
    const [categories, setCategories] = useState([]);
    async function getData() {
        const querySnapshotCategories = await getDocs(collection(db, "categories"));
        const categoriesArray = [];

        querySnapshotCategories.forEach((doc) => {
            categoriesArray.push({ id: doc.id, ...doc.data() });
        });
        setCategories(categoriesArray);
    }
    useEffect(() => {
        getData();
    }, []);


    return (
        <Div>
            {categories && categories.map(el => <Button key={el.name}>{el.name}</Button>)}
        </Div>
    )
}

export default Filter
