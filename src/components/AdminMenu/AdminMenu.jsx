import React from 'react'
import './AdminMenu.css'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <aside className='adminMenu'>
            <h2 className='adminMenu__title'>Admin Menu</h2>
            <Link style={{ textDecoration: "none" }} to={`/`}><button className='adminMenu__Btn'><i className="bi bi-house-door-fill"></i>Home</button></Link>
            <Link style={{ textDecoration: "none" }} to={`/create`}><button className='adminMenu__Btn active'><i className="bi bi-plus-circle"></i>Create</button></Link>
            <Link style={{ textDecoration: "none" }} to={`/`}><button className='adminMenu__Btn'><i className="bi bi-tag-fill"></i>Sell</button></Link>
            <Link style={{ textDecoration: "none" }} to={`/`}><button className='adminMenu__Btn'><i className="bi bi-graph-up-arrow"></i>ANALYTCS</button></Link>
            <Link style={{ textDecoration: "none" }} to={`/`}><button className='adminMenu__Btn'><i className="bi bi-box-seam"></i>STOCK</button></Link>
            <Link style={{ textDecoration: "none" }} to={`/`}><button className='adminMenu__Btn'><i className="bi bi-house-door-fill"></i>PAYMENTS</button></Link>
            <Link style={{ textDecoration: "none" }} to={`/`}><button className='adminMenu__Btn'><i className="bi bi-truck"></i>deliveries</button></Link>
            <Link style={{ textDecoration: "none" }} to={`/`}><button className='adminMenu__Btn'><i className="bi bi-question-diamond"></i>Support</button></Link>
        </aside>
    )
}

export default AdminMenu
