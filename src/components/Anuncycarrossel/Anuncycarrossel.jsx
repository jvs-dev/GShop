import React from 'react'
import styled from 'styled-components'

const AnuncycarrosselStyled = styled.section`
    display: flex;
    justify-content: flex-start;
    align-items: center;    
    padding: 1rem 20px;
    overflow-x: auto;
    overflow-y: hidden;     
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
    gap: 1rem;
    width: 100%;        
`

const Anuncycarrossel = (props) => {
    return (
        <AnuncycarrosselStyled>
            {props.children}
        </AnuncycarrosselStyled>
    )
}

export default Anuncycarrossel
