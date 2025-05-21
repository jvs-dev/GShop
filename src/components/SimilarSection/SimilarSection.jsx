import React, { useEffect, useState } from 'react'
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import FirebaseConfig from '../../scripts/firebaseConfig'
import Itemcard from '../../components/Itemcard/Itemcard'
import { Link } from 'react-router-dom'
import './SimilarSection.css'
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const SimilarSection = (props) => {
    const [items, setItems] = useState([]);
    async function getData() {
        const querySnapshotItems = await getDocs(collection(db, "items"));
        const itemsArray = [];
        querySnapshotItems.forEach((doc) => {
            itemsArray.push({ id: doc.id, ...doc.data() });
        });
        setItems(itemsArray);
    }
    useEffect(() => {
        getData();
    }, []);

    console.log(items);


    return (
        <section className='similarSection__div'>
            {items && items.map(el => el.categorie == props.categorie ? <Itemcard key={el.id} id={el.id} title={el.title} price={el.price} image={el.images[0]} /> : null)}
        </section>
    )
}

export default SimilarSection
