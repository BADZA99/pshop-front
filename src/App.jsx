import { Outlet } from 'react-router'
import './App.css'
import NavItems from './components/NavItems'

function App() {


  return (
    <>
     <NavItems/>
     <Outlet/>
    </>
  )
}

export default App

// $ npm i react-router-dom localforage match-sorter sort-by  swiper react-bootstrap