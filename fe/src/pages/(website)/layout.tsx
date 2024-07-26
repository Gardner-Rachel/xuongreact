import Footer from '@/components/Footer'
import Headers from '@/components/Header'
import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'
import '../../styles/style.css'

const Layout = () => {
  return (
    <div className="layout-container">
        <Headers />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout