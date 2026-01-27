import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
                const response = await axios.get('http://localhost:8000/api/restricted/templates', {
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
            await axios.post('http://localhost:8000/api/restricted/send', {
                client_email: clientEmail,
                subject,
                body
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Email sent successfully!');
            // Optional: reset form
            // setClientEmail('');
            // setSubject('');
            // setBody('');
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
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-white">Client Receipt & Update Portal</h1>
                    <button onClick={handleLogout} className="text-white hover:text-blue-200">Logout</button>
                </div>

                <div className="p-6">
                    {message && (
                        <div className={`p-4 mb-6 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSend}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-gray-700 font-bold mb-2">Select Template</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
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
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                    value={clientEmail}
                                    onChange={(e) => setClientEmail(e.target.value)}
                                    required
                                    placeholder="client@example.com"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2">Subject</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2">Message Body</label>
                            <textarea
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 h-64"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-green-600 text-white font-bold py-3 px-8 rounded hover:bg-green-700 focus:outline-none transition duration-200"
                            >
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
