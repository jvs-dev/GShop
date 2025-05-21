import React from 'react'
import './Anuncycard.css'

const Anuncycard = (props) => {

    const [day, month, year] = props.addDate.split("-");
    const dateObj = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    const diffTime = today - dateObj;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return (
        <article className='anuncycard'>
            <span className='anuncycard__circle'></span>
            <img className='anuncycard__img' src={props.image} alt={props.title} />
            <div className='anuncycard__content'>
                <div className='anuncycard__div'>
                    <p className='anuncycard__name'>{props.title}</p>
                    {diffDays > 0 && diffDays < 30 ? <span className='anuncycard__new'>Novo</span> : null}
                </div>
                <div className='anuncycard__info'>
                    <p className='anuncycard__rating'>Rating: <div className='anuncycard__stars'><ion-icon name="star-sharp"></ion-icon><ion-icon name="star-sharp"></ion-icon><ion-icon name="star-sharp"></ion-icon><ion-icon name="star-sharp"></ion-icon><ion-icon name="star-sharp"></ion-icon></div></p>
                    <p className='anuncycard__price'>${props.price}</p>
                </div>
            </div>
        </article>
    )
}

export default Anuncycard
