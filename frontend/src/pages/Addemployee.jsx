import React, { useState } from 'react';

const AddEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        courses: '',
        createDate: new Date().toLocaleDateString()
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    // Handle change for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    // Handle file upload for image
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!employeeData.name || !employeeData.email || !employeeData.mobileNo || !employeeData.designation || !employeeData.gender || !employeeData.courses) {
            setError('Please fill all the fields');
            return;
        }

        // Simulate API call with form data
        const formData = new FormData();
        formData.append('name', employeeData.name);
        formData.append('email', employeeData.email);
        formData.append('mobileNo', employeeData.mobileNo);
        formData.append('designation', employeeData.designation);
        formData.append('gender', employeeData.gender);
        formData.append('courses', employeeData.courses);
        formData.append('createDate', employeeData.createDate);
        if (image) {
            formData.append('image', image);
        }

        // Clear form on success
        setEmployeeData({
            name: '',
            email: '',
            mobileNo: '',
            designation: '',
            gender: '',
            courses: '',
            createDate: new Date().toLocaleDateString()
        });
        setImage(null);
        setError('');
        alert('Employee added successfully');
    };

    return (
        <div style={formContainerStyle}>
            <h1 style={{ textAlign: 'center'}}>Add Employee</h1>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={handleSubmit} style={formStyle}>
                <label style={labelStyle}>Name:</label>
                <input type="text" name="name" value={employeeData.name} onChange={handleChange} style={inputStyle} required />

                <label style={labelStyle}>Email:</label>
                <input type="email" name="email" value={employeeData.email} onChange={handleChange} style={inputStyle} required />

                <label style={labelStyle}>Mobile No:</label>
                <input type="tel" name="mobileNo" value={employeeData.mobileNo} onChange={handleChange} style={inputStyle} required />

                <label style={labelStyle}>Designation:</label>
                <input type="text" name="designation" value={employeeData.designation} onChange={handleChange} style={inputStyle} required />

                <label style={labelStyle}>Gender:</label>
                <select className='gender' name="gender"  value={employeeData.gender} onChange={handleChange} style={inputStyle} required>
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>

                <label style={labelStyle}>Courses:</label>
                <input type="text" name="courses" value={employeeData.courses} onChange={handleChange} style={inputStyle} placeholder="Comma-separated (e.g., Btech, MBA)" required />

                <label style={labelStyle}>Image:</label>
                <input type="file" name="image" onChange={handleImageChange} style={inputStyle} />

                <button type="submit" style={buttonStyle}>Add Employee</button>
            </form>
        </div>
    );
};

// Inline styling for the form and elements
const formContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"column",
    backgroundColor: '#f4f4f9',
    fontFamily: 'Arial, sans-serif'
};

const formStyle = {
    backgroundColor: '#fff',
    padding: '2.2em',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
};

const labelStyle = {
    display: 'block',
    marginBottom: '0.5em',
    color: '#333',
    fontWeight: 'bold'
};

const inputStyle = {
    width: '80%',
    padding: '0.8em',
    marginBottom: '1em',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    fontSize: '1rem',
};

const buttonStyle = {
    width: '80%',
    padding: '0.8em',
    border: 'none',
    backgroundColor: '#5a67d8',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
};

export default AddEmployee;
