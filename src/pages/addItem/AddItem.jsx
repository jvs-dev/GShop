import React, { useState } from 'react'
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import FirebaseConfig from '../../scripts/firebaseConfig'
import './AddItem.css'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const AddItem = () => {

    const [images, setImages] = useState({
        itemFile1: '',
        itemFile2: '',
        itemFile3: ''
    });
    const [picks, setPicks] = useState([]);
    const [itemdata, setItemdata] = useState({ name: '', description: '', price: '', categorie: '' });

    const addPick = () => {
        setPicks((prevPicks) => [
            ...prevPicks,
            { name: 'a', options: ['1'] }
        ]);
    }

    const addOption = (index) => {
        const newPicks = [...picks];
        newPicks[index].options.push('');
        setPicks(newPicks);
    }

    const handlePickNameChange = (index, value) => {
        const newPicks = [...picks];
        newPicks[index].name = value;
        setPicks(newPicks);
        cleanPicks();
    }
    const handlePickOptionChange = (index, value, i) => {
        const newPicks = [...picks];
        newPicks[index].options[i] = value;
        newPicks[index].options = newPicks[index].options.filter(option => option.trim() !== '');
        setPicks(newPicks);
        cleanPicks();
    };

    const cleanPicks = () => {
        const cleaned = picks.filter(pick => {
            const hasName = pick.name.trim() !== '';
            const hasValidOptions = Array.isArray(pick.options) &&
                pick.options.filter(option => option.trim() !== '').length > 0;

            return hasName || hasValidOptions;
        });

        setPicks(cleaned);
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        const item = {
            images: [images.itemFile1, images.itemFile2, images.itemFile3],
            title: itemdata.name,
            description: itemdata.description,
            price: itemdata.price,
            categorie: itemdata.categorie,
            picks: picks,
            addDate: new Date().toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).replace(/\//g, '-'),
            ratting: 5,
            sold: 0,
            views: 0,
            soldOut: false,
        }        
        try {
            const docRef = await addDoc(collection(db, "items"), item);
            setItemdata({ name: '', description: '', price: '', categorie: '' });
            setImages({ itemFile1: '', itemFile2: '', itemFile3: '' });
            setPicks([]);
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Erro ao adicionar item!')
        }
    }

    return (
        <>
            <AdminMenu />
            <form action="" className='addItemForm'>
                <div className="addItemForm__container">
                    <label htmlFor="itemFile1" className="addItemForm__container--labelimg">
                        <img
                            src={images.itemFile1 || ''}
                            alt=""
                            className="addItemForm__container--img"
                        />
                        <input type="url" name="itemFile1" id="itemFile1" className="addItemForm__container--inputLink" value={images.itemFile1} onChange={(e) => setImages((prevImages) => ({
                            ...prevImages,
                            [e.target.name]: e.target.value
                        }))} />
                    </label>

                    <label htmlFor="itemFile2" className="addItemForm__container--labelimg">
                        <img src={images.itemFile2 || ''} alt="" className="addItemForm__container--img" />
                        <input type="url" name="itemFile2" id="itemFile2" className="addItemForm__container--inputLink" value={images.itemFile2} onChange={(e) => setImages((prevImages) => ({
                            ...prevImages,
                            [e.target.name]: e.target.value
                        }))} />
                    </label>

                    <label htmlFor="itemFile3" className="addItemForm__container--labelimg">
                        <img src={images.itemFile3 || ''} alt="" className="addItemForm__container--img" />
                        <input type="url" name="itemFile3" id="itemFile3" className="addItemForm__container--inputLink" value={images.itemFile3} onChange={(e) => setImages((prevImages) => ({
                            ...prevImages,
                            [e.target.name]: e.target.value
                        }))}
                        />
                    </label>
                </div>
                <div className='addItemForm__container--2'>
                    <label htmlFor="" className='addItemForm__container--label'>
                        <p className='addItemForm__container--p'>Nome</p>
                        <input type="text" name="" id="" value={itemdata.name} onChange={(e) => setItemdata((prevState) => ({ ...prevState, name: e.target.value }))} className='addItemForm__container--inputText' />
                    </label>
                    <label htmlFor="" className='addItemForm__container--label'>
                        <p className='addItemForm__container--p'>Descrição</p>
                        <input type="text" name="" id="" value={itemdata.description} onChange={(e) => setItemdata((prevState) => ({ ...prevState, description: e.target.value }))} className='addItemForm__container--inputText' />
                    </label>
                    <div className='addItemForm__container--3'>
                        <label htmlFor="" className='addItemForm__container--label'>
                            <p className='addItemForm__container--p'>Preço</p>
                            <input type="number" value={itemdata.price} onChange={(e) => setItemdata((prevState) => ({ ...prevState, price: e.target.value }))} className='addItemForm__container--inputText' />
                        </label>
                        <label htmlFor="" className='addItemForm__container--label'>
                            <p className='addItemForm__container--p'>Categoria</p>
                            <input type="text" list="opcoes" value={itemdata.categorie} onChange={(e) => setItemdata((prevState) => ({ ...prevState, categorie: e.target.value }))} className='addItemForm__container--inputText' />
                            <datalist id='opcoes'>
                                <option value="Eletrônicos" />
                                <option value="Camisas" />
                                <option value="Calçados" />
                                <option value="Acessórios" />
                                <option value="Utilidades" />
                                <option value="Brinquedos" />
                                <option value="Esportes" />
                                <option value="Livros" />
                            </datalist>
                        </label>
                    </div>
                </div>
                {picks.map((pick, index) => (
                    <div className='addItemForm__container--4' key={index}>
                        <input className='addItemForm__container--inputName' value={pick.name} onChange={(e) => handlePickNameChange(index, e.target.value)} />
                        <div className='addItemForm__container--5'>
                            {pick.options.map((option, i) => (
                                <input type="text" className='addItemForm__container--inputOption' value={option} onChange={(e) => handlePickOptionChange(index, e.target.value, i)} key={i} />
                            ))}
                            <button type="button" className='addItemForm__addPicks' onClick={() => addOption(index)}><i className="bi bi-plus-circle"></i>Add opções</button>
                        </div>
                    </div>
                ))}
                <button type="button" className='addItemForm__addPicks' onClick={addPick}><i className="bi bi-plus-circle"></i>Add Escolhas</button>

                <button type="button" className='addItemForm__addItemBtn' onClick={handleAddItem}>Criar</button>
            </form>
        </>
    )
}

export default AddItem




