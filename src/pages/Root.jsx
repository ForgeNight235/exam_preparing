import React from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <>
    <header>
        <h2>Header</h2>
    </header>
    <Outlet/>
    <footer>
        <h2>Footer</h2>
    </footer>
    </>
  )
}

export default Root