import React, { useState } from 'react';

function LoginPage() {
    const [f_sno, setSno] = useState('');
    const [f_userName, setUsername] = useState('');
    const [f_Pwd, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(f_sno,f_userName,f_Pwd);
    };

    return (
        <div style={styles.body}>
            <div style={styles.loginContainer}>
                <h1 style={styles.heading}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label style={styles.label} htmlFor="sno">Serial Number:</label>
                    <input
                        type="text"
                        id="sno"
                        name="f_sno"
                        value={f_sno}
                        onChange={(e) => setSno(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <label style={styles.label} htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="f_userName"
                        value={f_userName}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <label style={styles.label} htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="f_Pwd"
                        value={f_Pwd}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <button type="submit" style={styles.button}>Login</button>
                </form>
                {error && <div style={styles.error}>{error}</div>}
            </div>
        </div>
    );
}

const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
    },
    loginContainer: {
        backgroundColor: '#fff',
        padding: '2em',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '420px',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '1.5em',
        color: '#333',
    },
    label: {
        display: 'block',
        marginBottom: '0.5em',
        color: '#555',
    },
    input: {
        width: '70%',
        padding: '0.8em',
        marginBottom: '1em',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        fontSize: '1rem',
    },
    button: {
        width: '60%',
        padding: '0.8em',
        border: 'none',
        backgroundColor: '#5a67d8',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 'bold',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    error: {
        color: 'red',
        fontSize: '0.9rem',
        textAlign: 'center',
        marginTop: '1em',
    },
};

export default LoginPage;
