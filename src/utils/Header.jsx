import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {

      // Sidebar toggle
  const toggleSidebar = () => {
    document.body.classList.toggle('toggle-sidebar');
  };

  // Navbar links active state on scroll
  useEffect(() => {
    const selectHeader = document.querySelector('#header');
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };

    window.addEventListener('scroll', headerScrolled);
    window.addEventListener('load', headerScrolled);

    return () => {
      window.removeEventListener('scroll', headerScrolled);
      window.removeEventListener('load', headerScrolled);
    };
  }, []);

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img
              src="/galamticon.png"
              alt="AdminLTE Logo"
              className="brand-image img-circle elevation-3"
              style={{ opacity: 0.8 }}
            />
            <span className="brand-text font-weight-light">GALA - ZANZIBAR</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn" onClick={toggleSidebar}></i>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              {/* <Link to="/" className="nav-link">
                GALA - ZANZIBAR
              </Link> */}
            </li>
          </ul>
        </nav>
      </header>
    )
}


