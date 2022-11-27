import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'


import "./Footer.scss";

function Footer(props) {
  
  
    return (<>
      <footer>
        <div className="container">
          <div className="links">
            <div className="link">
              <Link to="/">Home</Link>
            </div>
            <div className="link">
              <Link to="/about">About</Link>
            </div>
            <div className="link">
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="social">
            <div className="social-link">
              <a href="/"><FontAwesomeIcon icon={faFacebook} /></a>
            </div>
            <div className="social-link">
              <a href="/"><FontAwesomeIcon icon={faTwitter} /></a>
            </div>
            <div className="social-link">
              <a href="/"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </div>
        </div>
      </footer>
    </>)
}

export default Footer;

// //scss
// footer{
//   background-color: #000;
//   color: #fff;
//   padding: 20px 0;
//   .container{
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     .links{
//       display: flex;
//       .link{
//         margin-right: 20px;
//         a{
//           color: #fff;
//           text-decoration: none;
//           &:hover{
//             text-decoration: underline;
//           }
//         }
//       }
//     }
//     .social{
//       display: flex;
//       .social-link{
//         margin-right: 20px;
//         a{
//           color: #fff;
//           text-decoration: none;
//           &:hover{
//             text-decoration: underline;
//           }
//         }
//       }
//     }
//   }
// }