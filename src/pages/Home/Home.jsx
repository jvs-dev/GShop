import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Filter from '../../components/Filter/Filter'
import Itemcard from '../../components/Itemcard/Itemcard'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {

    const [items, setItems] = useState(null)

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json(); // Convertendo a resposta em JSON
            })
            .then(data => {
                setItems(data); // Exibindo os dados no console
                console.log(data);

            })
    }, [])

    return (
        <div>
            <Header />
            <Filter />
            <section className='home__section'>
                {items && items.map(el => <Link style={{ textDecoration: "none", color: "#1e1e1e" }} key={el.id} to={`/item?id=${el.id}`}><Itemcard title={el.title} price={el.price} image={el.images[0].replace(`["`, "")} /></Link>)}
            </section>
        </div>
    )
}

export default Home
