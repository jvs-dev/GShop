import React, { useEffect, useState } from 'react'
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import FirebaseConfig from '../../scripts/firebaseConfig'
import Header from '../../components/Header/Header'
import Filter from '../../components/Filter/Filter'
import Itemcard from '../../components/Itemcard/Itemcard'
import { Link } from 'react-router-dom'
import Anuncycarrossel from '../../components/Anuncycarrossel/Anuncycarrossel'
import Anuncycard from '../../components/Anuncycard/Anuncycard'
import './Home.css'
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const Home = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    async function getData() {
        const querySnapshotItems = await getDocs(collection(db, "items"));
        const itemsArray = [];

        const querySnapshotCategories = await getDocs(collection(db, "categories"));
        const categoriesArray = [];

        querySnapshotItems.forEach((doc) => {
            itemsArray.push({ id: doc.id, ...doc.data() });
        });
        setItems(itemsArray);

        querySnapshotCategories.forEach((doc) => {
            categoriesArray.push({ id: doc.id, ...doc.data() });
        });
        setCategories(categoriesArray);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <Header />
            <Anuncycarrossel>
                {items && items.map(el => localStorage.itemAcessed == el.categorie ? <Link style={{ textDecoration: "none", color: "#1e1e1e" }} key={el.id} to={`/item?id=${el.id}`}><Anuncycard addDate={el.addDate} title={el.title} price={el.price} image={el.images[0]} /></Link> : null)}
            </Anuncycarrossel>
            <Filter />
            <section className='home__section'>
                {items && items.map(el => <Link style={{ textDecoration: "none", color: "#1e1e1e" }} key={el.id} to={`/item?id=${el.id}`}><Itemcard title={el.title} price={el.price} image={el.images[0]} categorie={el.categorie} id={el.id} /></Link>)}
            </section>
        </div>
    )
}

export default Home
