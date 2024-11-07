import React, { useState } from 'react';

const EmployeeList = ({ employees }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter employees based on search term
    const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Employee List</h1>
                <div>Total Count: {filteredEmployees.length}</div>
                <button style={{ padding: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}>
                    Create Employee
                </button>
            </header>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <label htmlFor="search" style={{ marginRight: '10px' }}>Search:</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Enter Search Keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '8px', width: '200px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f9', borderBottom: '2px solid #ddd' }}>
                        <th style={tableHeaderStyle}>Unique ID</th>
                        <th style={tableHeaderStyle}>Image</th>
                        <th style={tableHeaderStyle}>Name</th>
                        <th style={tableHeaderStyle}>Email</th>
                        <th style={tableHeaderStyle}>Mobile No</th>
                        <th style={tableHeaderStyle}>Designation</th>
                        <th style={tableHeaderStyle}>Gender</th>
                        <th style={tableHeaderStyle}>Course</th>
                        <th style={tableHeaderStyle}>Create Date</th>
                        <th style={tableHeaderStyle}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee, index) => (
                            <tr key={index} style={index % 2 === 0 ? rowStyleEven : rowStyleOdd}>
                                <td style={tableCellStyle}>{employee.id || `EMP${index + 1}`}</td>
                                <td style={tableCellStyle}>
                                    <img src={employee.image || 'placeholder.png'} alt="Employee" style={{ width: '40px', borderRadius: '50%' }} />
                                </td>
                                <td style={tableCellStyle}>{employee.name}</td>
                                <td style={tableCellStyle}>{employee.email}</td>
                                <td style={tableCellStyle}>{employee.mobileNo}</td>
                                <td style={tableCellStyle}>{employee.designation}</td>
                                <td style={tableCellStyle}>{employee.gender === 'M' ? 'Male' : 'Female'}</td>
                                <td style={tableCellStyle}>{employee.courses.join(', ')}</td>
                                <td style={tableCellStyle}>{employee.createDate || 'N/A'}</td>
                                <td style={tableCellStyle}>
                                    <button style={actionButtonStyle}>Edit</button>
                                    <button style={actionButtonStyle}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" style={{ textAlign: 'center', padding: '20px' }}>No employees found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const tableHeaderStyle = {
    padding: '10px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd'
};

const tableCellStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd'
};

const rowStyleEven = {
    backgroundColor: '#f9f9f9'
};

const rowStyleOdd = {
    backgroundColor: '#fff'
};

const actionButtonStyle = {
    padding: '5px 10px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#5a67d8',
    color: '#fff'
};

export default EmployeeList;
