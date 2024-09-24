/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router-dom'
import NavItems from './NavItems'

export default function PageHeader({
    title,
    curPage
}) {
  return (
    <>
     <NavItems />
    <div className='pageheader-section'>
      <div className="container">
        <div className="row">
            <div className="col-12">
                <div className="page-header-content text-center">
                    <h2 className="title">{title}</h2>
                    <nav aria-label='breadcrumb' className="">
                      <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">{curPage}</li>
                      </ol>
                    </nav>
                </div>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
