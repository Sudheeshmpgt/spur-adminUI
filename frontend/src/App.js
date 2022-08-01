import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import AdminRegisterPage from './pages/Admin/AdminRegisterPage';
import AdminDashboardPage from './pages/Admin/AdminDashboardPage';
import ManageUserPage from './pages/Admin/ManageUserPage';
import UpdateUserPage from './pages/Admin/UpdateUserPage';
import ManageInterviewerPage from './pages/Admin/ManageInterviewerPage';
import UpdateInterviewerPage from './pages/Admin/UpdateInterviewerPage';
import MangeInterviewPage from './pages/Admin/MangeInterviewPage'
import ReportPage from './pages/Admin/ReportPage';



function App() {
  return (
      <Routes>
        <Route path='/' element={<AdminLoginPage/>} />
        <Route path='/admin/login' element={<AdminLoginPage/>} />
        <Route path='/admin/register' element={<AdminRegisterPage/>} />
        <Route path='/admin/dashboard' element={<AdminDashboardPage/>} />
        <Route path='/admin/user' element={<ManageUserPage/>} />
        <Route path='/admin/user/update' element={<UpdateUserPage/>} />
        <Route path='/admin/interviewer' element={<ManageInterviewerPage/>}/>
        <Route path='/admin/interviewer/update' element={<UpdateInterviewerPage/>}/>
        <Route path='/admin/interview' element={<MangeInterviewPage/>}/>
        <Route path='/admin/report' element={<ReportPage/>}/>
      </Routes>
  ); 
}

export default App;
