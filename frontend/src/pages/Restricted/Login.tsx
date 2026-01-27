import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';
import './Login.css';

const RestrictedLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Using relative path via apiClient which handles base URL
            const response = await apiClient.post('/restricted/login', {
                email,
                password
            });

            localStorage.setItem('restricted_token', response.data.token);
            navigate('/restricted-portal/dashboard');
        } catch (err) {
            setError('Invalid credentials or unauthorized access.');
        }
    };

    return (
        <div className="restricted-login-container">
            <div className="login-card">
                <h2 className="login-title">Restricted Access</h2>
                {error && <div className="login-error">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="login-form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-submit-btn">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RestrictedLogin;
