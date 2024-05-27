import React from 'react'
const subTitle="Save the Day";
const title = (
  <h2 className="title">
    Join on Day Long Free workshop for{" "}
    <b>
      Advance <span>Mastering</span>
    </b>{" "}
  </h2>
);
const desc = "limited time offer hurry up"
const Register = () => {
  return (
    <section className='register-section padding-tb pb-0'>
      <div className="container">
        <div className="row g-4 row-cols-lg-2 row-cols-1 align-items-center">
            <div className="col">
                <div className="section-header">
                    <span className='subtitle'>{subTitle}</span>
                   {title}
                   <p>{desc}</p>
                </div>
            </div>

            <div className="col">
                <div className="section-wrapper">
                    <h4>Register Now</h4>
                    <form action="" className='register-form'>
                        <input type="text" placeholder="Username" className='reg-input' />
                        <input type="email" placeholder="email" className='reg-input' />
                        <input type="number" placeholder="phone" className='reg-input' />
                        <button type='submit' className='lab-btn'>Register Now</button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Register
