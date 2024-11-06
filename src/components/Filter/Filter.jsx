import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Div = styled.div`
    display: flex;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
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

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/categories')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setCategories(data);
                console.log(data);
            })
    }, [])


    return (
        <Div>
            {categories && categories.map(el => <Button key={el.id}>{el.name}</Button>)}
        </Div>
    )
}

export default Filter
