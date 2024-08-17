

import { Modal } from "react-bootstrap";
import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import '../components/modal.css'
import { useLocation, useNavigate } from "react-router";
export default function CheckoutPage() {
    const [show, setshow] = useState(false);
    const [activeTab, setactiveTab] = useState('visa')

    // handle tab change
    const handleTabChange = (tab) => {
        setactiveTab(tab);
    }
    const handleShow = () => setshow(true);
    const handleClose = () => setshow(false);

    // redirect to homepage
    const location=useLocation();
    const navigate=useNavigate();
    const from=location.state?.from?.pathname || '/';

    const handleOrderCobfirm = ()=>{
        alert('order confirmed');
        localStorage.removeItem('cart');
        handleClose();
        navigate(from,{replace:true});
    }

  return (
    <div className="modalCard">
      <Button variant="primary" onClick={handleShow}>
        proceed to checkout
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-dialog">
          <h5 className="px-3 mb-3">select your payment method</h5>
          <div className="modal-content">
            <div className="modal-content">
              <div className="modal-body">
                <div className="tabs mt-3">
                  <ul className="nav nav-tabs" id="mytab" role="tablist">
                    {/* visa */}
                    <li className=" nav-item">
                      <a
                        href="#visa"
                        id="visa-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="visa"
                        aria-selected={activeTab === "visa"}
                        onClick={() => handleTabChange("visa")}
                        className={`nav-link ${
                          activeTab === "visa" ? "active" : ""
                        } `}
                      >
                        <img
                          src="src/assets/images/visa.png"
                          alt="visa"
                          width={80}
                        />
                      </a>
                    </li>
                    {/* paypal */}
                    <li className=" nav-item">
                      <a
                        href="#paypal"
                        id="paypal-tab"
                        data-toggle="tab"
                        role="tab"
                        aria-controls="paypal"
                        aria-selected={activeTab === "paypal"}
                        onClick={() => handleTabChange("paypal")}
                        className={`nav-link ${
                          activeTab === "paypal" ? "active" : ""
                        } `}
                      >
                        <img
                          src="src/assets/images/paypal.png"
                          alt="paypal"
                          width={80}
                        />
                      </a>
                    </li>
                  </ul>
                  {/* contents */}
                  <div className="tab-content" id="mytabContent">
                    {/* visa */}
                    <div
                      className={`tab-pane fade ${
                        activeTab === "visa" ? "show active" : ""
                      }`}
                      id="visa"
                      role="tabpanel"
                      aria-labelledby="visa-tab"
                    >
                      {/* visa tab content */}
                      <div className="mt-4 mx-4">
                        <div className="text-center">
                          <h5>credit card</h5>
                        </div>
                        <div className="form mt-3">
                          <div className="inputbox">
                            <input
                              type="text"
                              id="name"
                              name="name"
                              className="form-control"
                            />
                            <span>card holder name</span>
                          </div>

                          <div className="inputbox">
                            <input
                              type="text"
                              id="number"
                              name="number"
                              className="form-control"
                            />
                            <span>card number</span>
                            <i className="fa fa-eye"></i>
                          </div>

                          <div className="d-flex flex-row">
                            <div className="inputbox">
                              <input type="text" className="form-control" />
                              <span>expiration date</span>
                              <i className="fa fa-eye"></i>
                            </div>
                            <div className="inputbox">
                              <input type="text" className="form-control" />
                              <span>cvv</span>
                              <i className="fa fa-eye"></i>
                            </div>
                          </div>
                          <div className="px-5 pay">
                            <button className="btn btn-success btn-block"
                            onClick={handleOrderCobfirm}
                            >
                              order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* paypal */}
                    <div
                      className={`tab-pane fade ${
                        activeTab === "paypal" ? "show active" : ""
                      }`}
                      id="paypal"
                      role="tabpanel"
                      aria-labelledby="paypal-tab"
                    >
                      {/* visa tab content */}
                      <div className="mt-4 mx-4">
                        <div className="text-center">
                          <h5>paypal account</h5>
                        </div>
                        <div className="form mt-3">
                          <div className="inputbox">
                            <input
                              type="email"
                              id="name"
                              name="name"
                              className="form-control"
                            />
                            <span>email</span>
                          </div>

                          <div className="inputbox">
                            <input
                              type="text"
                              id="number"
                              name="number"
                              className="form-control"
                            />
                            <span>name</span>
                            <i className="fa fa-eye"></i>
                          </div>

                          <div className="d-flex flex-row">
                            <div className="inputbox">
                              <input type="text" className="form-control" />
                              <span>extra info</span>
                              <i className="fa fa-eye"></i>
                            </div>
                           
                          </div>
                          <div className="px-5 pay">
                            <button className="btn btn-success btn-block">
                              add paypal
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* payment derscription */}
                  <p className="mt-3 px-4 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus itaque odit ipsum laudantium eius
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
