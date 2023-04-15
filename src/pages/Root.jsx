import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../components/Header/Header.jsx";

const Root = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <footer>
        <h2 className="footer_article">
          Footer
        </h2>
    </footer>
    </>
  )
}

export default Root