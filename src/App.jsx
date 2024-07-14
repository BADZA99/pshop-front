import { Outlet } from 'react-router'
import './App.css'
import NavItems from './components/NavItems'
import Footer from './components/Footer'

function App() {


  return (
    <>
     <NavItems/>
     <div className="min-vh-100"><Outlet/></div>
     <Footer/>
    </>
  )
}

export default App

// $ npm i react-router-dom localforage match-sorter sort-by  swiper react-bootstrap