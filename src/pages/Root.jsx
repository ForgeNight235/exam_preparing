import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../components/Header/Header.jsx";

const Root = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <footer>
        <h2>Footer</h2>
    </footer>
    </>
  )
}

export default Root