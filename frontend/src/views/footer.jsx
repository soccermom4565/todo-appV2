import React from 'react'

import { Helmet } from 'react-helmet'

import './footer.css'

const Footer = (props) => {
  return (
        <footer className="footerContainer footer-footer1">
          <div className="footer-container1">
            <span className="bodySmall footer-text">
              © 2023 myCompany, All Rights Reserved.
            </span>
            <div className="footer-icon-group">
              <svg
                viewBox="0 0 950.8571428571428 1024"
                className="footer-icon socialIcons"
              >
              </svg>
              <svg
                viewBox="0 0 877.7142857142857 1024"
                className="footer-icon2 socialIcons"
              >
              </svg>
              <svg
                viewBox="0 0 602.2582857142856 1024"
                className="footer-icon4 socialIcons"
              >
              </svg>
            </div>
          </div>
        </footer>
  )
}

export default Footer
