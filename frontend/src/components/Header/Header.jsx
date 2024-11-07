import React from 'react'
import './header.css'
export default function Header() {
  return (
    <div className='header'>
              <a href="#">Home</a>
              <a href="/employees">EmployeeList</a>
              <a href="#">Admin</a>
              <button>Logout</button>
    </div>
  )
}
