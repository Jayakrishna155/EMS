import React from 'react'
import Header from '../components/Header/Header'
import EmployeeList from './Employeelist'
import AddEmployee from './Addemployee';
import {Routes,Route} from 'react-router-dom'
export default function Home() {
  const employees = [
    {
        name: "Jayakrishna",
        email: "jk@gmail.com",
        mobileNo: "9398415710",
        designation: "HR",
        gender: "M",
        courses: ["BTech"]
    },
];
  return (
    <div>
       <Header/>
       <Routes>
           <Route to="/home" element={<h1 style={{width:"100%",height:"70vh"}}>Welcome to Dashboard</h1>}></Route>

       </Routes>
        
        <EmployeeList employees={employees}/>
        <AddEmployee/>
    </div>
  )
}
