import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';
import axios from 'axios';
import './Dashboard.css';

interface Template {
    id: number;
    name: string;
    subject: string;
    body: string;
}

const RestrictedDashboard = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
    const [clientEmail, setClientEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('restricted_token');
        if (!token) {
            navigate('/restricted-portal');
            return;
        }

        const fetchTemplates = async () => {
            try {
                const response = await apiClient.get('/restricted/templates', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTemplates(response.data);
            } catch (error) {
                console.error("Failed to fetch templates", error);
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    navigate('/restricted-portal');
                }
            }
        };

        fetchTemplates();
    }, [navigate]);

    const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const templateId = e.target.value;
        setSelectedTemplateId(templateId);

        const template = templates.find(t => t.id === Number(templateId));
        if (template) {
            setSubject(template.subject);
            setBody(template.body);
        } else {
            setSubject('');
            setBody('');
        }
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Sending...');

        try {
            const token = localStorage.getItem('restricted_token');
            await apiClient.post('/restricted/send', {
                client_email: clientEmail,
                subject,
                body
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Email sent successfully!');
        } catch (error) {
            setMessage('Failed to send email.');
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('restricted_token');
        navigate('/restricted-portal');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <div>
                        <h1 className="dashboard-title">Client Receipt & Update Portal</h1>
                        <button
                            onClick={() => navigate('/restricted-portal/contacts')}
                            className="contacts-link"
                        >
                            📧 View Contact Messages
                        </button>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>

                <div className="dashboard-content">
                    {message && (
                        <div className={`alert-message ${message.includes('success') ? 'alert-success' : 'alert-info'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSend}>
                        <div className="form-row">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Select Template</label>
                                <select
                                    className="dash-select"
                                    value={selectedTemplateId}
                                    onChange={handleTemplateChange}
                                >
                                    <option value="">-- Select a Template --</option>
                                    {templates.map(t => (
                                        <option key={t.id} value={t.id}>{t.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Client Email</label>
                                <input
                                    type="email"
                                    className="dash-input"
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    required
                                    placeholder="client@example.com"
                                />
                            </div>
                        </div>

                        <div className="form-group-dash">
                            <label>Subject</label>
                            <input
                                type="text"
                                className="dash-input"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group-dash">
                            <label>Message Body</label>
                            <textarea
                                className="dash-textarea"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="send-btn">
                                Send Email
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RestrictedDashboard;
