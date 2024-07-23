import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'


export default function Sidebar() {

    const [navStyle, setNavStyle] = useState(false);
    const location = useLocation();

    const changeNav = () => {
        if (window.scrollY > 45) {
            setNavStyle(true);
        } else {
            setNavStyle(false);
        }
    };

    // useEffect(() => {
    //     window.addEventListener('scroll', changeNav);

    //     // Cleanup the event listener on component unmount
    //     return () => {
    //         window.removeEventListener('scroll', changeNav);
    //     };
    // }, []);

    return (
        <>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">GALA - MTWARA</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">

                    {/* SidebarSearch Form */}
                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                            <li className="nav-item">
                                <Link to='/dashboard' className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/ripotiYaShule' className={`nav-link ${location.pathname === '/ripotiYaShule' ? 'active' : ''}`}>
                                    <i className="nav-icon fas fa-th" />
                                    <p>
                                        Ripoti Ya Shule
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to='/ripotiHalmashauri' className={`nav-link ${location.pathname === '/ripotiHalmashauri' ? 'active' : ''}`}>
                                    <i className="nav-icon far fa-calendar-alt" />
                                    <p>
                                        Ripoti Ya Halmashauri
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/takuwimu'className={`nav-link ${location.pathname === '/takuwimu' ? 'active' : ''}`}>
                                    <i className="nav-icon far fa-image" />
                                    <p>
                                        Takwimu Zingine
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/shule' className={`nav-link ${location.pathname === '/shule' ? 'active' : ''}`}>
                                    <i className="nav-icon fas fa-columns" />
                                    <p>
                                        Shule
                                    </p>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to='/taarifaYaMkoa' className={`nav-link ${location.pathname === '/taarifaYaMkoa' ? 'active' : ''}`}>
                                    <i className="nav-icon fas fa-book" />
                                    <p>
                                        Taarifa Ya Mkoa
                                    </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/test' className={`nav-link ${location.pathname === '/test' ? 'active' : ''}`}>
                                    <i className="nav-icon fas fa-book" />
                                    <p>
                                        Test
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </>
    )
}
