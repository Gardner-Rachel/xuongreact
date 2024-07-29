import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../styles/style.css'
import Header from './_components/Header'
import Footer from './_components/Footer'


const Layout = () => {
  return (
    <div className="layout-container">
        <Header />
        <Outlet />
        <Footer />
      
    </div>
  )
}

export default Layout