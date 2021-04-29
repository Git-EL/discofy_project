import "./Contact.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import discofy_logo_small from "../../assets/discofy_logo_small.svg";

function Contact() {
  const [name] = useState("Suzana Jovanovic");
  const [job] = useState("Full Stack Web Developer");
  const [about] = useState("My interest..");
  const [name2] = useState("Esther Lee");
  const [job2] = useState("Full Stack Web Developer");
  const [about2] = useState("My interest...");
  return (
    <div className="contact-container">
      <img src={discofy_logo_small} alt="discofy-logo" className="logo_small" />
      <div className="big-container">
        <div className="Card">
          <div className="upper-container">
            <div className="image-container">
              <img
                src="https://avatars.githubusercontent.com/u/65951047?s=400&u=b8b905ad11fc8a6e213014149407099b5e5dc978&v=4"
                alt=""
                height="100px"
                width="100px"
              />
            </div>
          </div>

          <div className="botton-container">
            <h3> {name} </h3>
            <h4> {job} </h4>
            <p> {about}</p>
          </div>
          <div className="ft-social">
            <ul className="ft-social-list">
              <li>
                <a href="https://github.com/Suzy1412">
                  <i class="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="mailto:suzy.91@outlook.com">
                  <i class="fas fa-envelope-open-text"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/suzana-jovanovic-1b9ab81b2/">
                  <i class="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="Card-2">
          <div className="upper-container">
            <div className="image-container">
              <img
                src="https://media-exp1.licdn.com/dms/image/C4E35AQFWgoJeYA-J_g/profile-framedphoto-shrink_800_800/0/1616377997019?e=1619769600&v=beta&t=HQ0Ow5Yjv7WUXbYnLTiZZlk10Ce_diqpd3jKeUCSohQ"
                alt=""
                height="100px"
                width="100px"
              />
            </div>
          </div>

          <div className="botton-container">
            <h3> {name2} </h3>
            <h4> {job2} </h4>
            <p> {about2}</p>
          </div>
          <div className="ft-social">
            <ul className="ft-social-list">
              <li>
                <a href="https://github.com/Git-EL">
                  <i className="fab fa-github"></i>
                </a>
              </li>
              <li>
                <a href="mailto:lee_esther@live.com">
                  <i className="fas fa-envelope-open-text"></i>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/esther-lee-627451205/">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <button className="home-button">
          <Link to="/" className="home-first">
            {" "}
            Back to Home
          </Link>
          <Link to="/"> Back to Home</Link>
        </button>
      </div>
    </div>
  );
}
export default Contact;
