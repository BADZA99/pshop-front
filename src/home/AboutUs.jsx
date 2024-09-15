import NavItems from '@/components/NavItems';
import React from 'react'
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
const subTitle = "Why Choose Us";
const title = "Become a Marchant";
const desc =
  "Take courses on your any device with our app & learn all about business what you want. Just download & install & start to learn";
const btnText = "Apply Now";

const countList = [
  {
    iconName: "icofont-users-alt-4",
    count: "12600",
    text: "Marchant Enrolled",
  },
  {
    iconName: "icofont-graduate-alt",
    count: "30",
    text: "Certified Courses",
  },
  {
    iconName: "icofont-notification",
    count: "100",
    text: "Rewards and GitCards",
  },
];

const AboutUs = () => {
  return (
    <>
    
      <div className="instructor-section style-2 padding-tbsection-bg-ash">
        <div className="container">
          <div className="section-wrapper">
            <div className="row g-4 justify-content-center align-items-center row-cols-1 row-cols-md-3 row-cols-xl-3">
              <div className="col">
                {countList.map((count, index) => (
                  <div key={index} className="count-item">
                    <div className="count-inner">
                      <div className="count-icon">
                        <i className={count.iconName}></i>
                      </div>
                      <div className="count-content">
                        <h2>
                          <span>
                            <CountUp end={count.count} />
                          </span>
                          <span>+</span>
                        </h2>
                        <p>{count.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="col">
                <div className="instructor-content">
                  <p className="subtitle">{subTitle}</p>
                  <h2>{title}</h2>
                  <p>{desc}</p>
                  <Link to="/sign-up" className="lab-btn">
                    {btnText}
                  </Link>
                </div>
              </div>

              <div className="col">
                <div className="instructor-thumb">
                  <img
                    src="/src/assets/images/instructor/01.png"
                    alt="instructor thumb"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs
