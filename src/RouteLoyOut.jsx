import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './component/dashboard/Dashboard';
import NavBar from './utils/NavBar';
import Sidebar from './utils/Sidebar';
import Footer from './utils/Footer';
import RipotiYaShule from './component/report/RipotiYaShule';
import Shule from './component/report/Shule';
import RipotiYhalmashauri from './component/report/RipotiYhalmashauri';
import TaarifaYaMkoa from './component/report/TaarifaYaMkoa';
import Takwimu from './component/report/Takwimu';
import Test from './component/Test';

export default function RouteLoyOut() {
    return (
        <>
            <NavBar />
            <Sidebar />
            <div class="wrapper">
                <div class="content-wrapper">
                    <LoyOut />
                </div>
            </div>
            <Footer />
        </>
    )
}

const LoyOut = () => {

    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/ripotiYaShule' element={<RipotiYaShule/>} />
            <Route path='/shule' element={<Shule/>} />
            <Route path='/ripotiHalmashauri' element={<RipotiYhalmashauri/>} />
            <Route path='/taarifaYaMkoa' element={<TaarifaYaMkoa/>} />
            <Route path='/takuwimu' element={<Takwimu/>} />
            <Route path='/test' element={<Test/>} />
        </Routes>
    );
}
