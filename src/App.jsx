import { Outlet } from 'react-router'
import './App.css'
import NavItems from './components/NavItems'
import Footer from './components/Footer'

function App() {


  return (
    <>
     <NavItems/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default App

// $ npm i react-router-dom localforage match-sorter sort-by  swiper react-bootstrap