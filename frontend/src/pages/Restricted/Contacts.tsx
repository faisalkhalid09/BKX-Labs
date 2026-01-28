import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';
import axios from 'axios';
import './Contacts.css';

interface Contact {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

const RestrictedContacts = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showClearDialog, setShowClearDialog] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('restricted_token');
        if (!token) {
            navigate('/restricted-portal');
            return;
        }

        fetchContacts(token);
    }, [navigate]);

    const fetchContacts = async (token: string) => {
        try {
            setLoading(true);
            const response = await apiClient.get('/restricted/contacts', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContacts(response.data);
        } catch (error) {
            console.error("Failed to fetch contacts", error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                navigate('/restricted-portal');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRowClick = async (contact: Contact) => {
        setSelectedContact(contact);
        setShowModal(true);
    };

    const handleExport = async () => {
        try {
            const token = localStorage.getItem('restricted_token');
            const response = await apiClient.get('/restricted/contacts/export/excel', {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `contact-submissions-${new Date().toISOString().split('T')[0]}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            setMessage('Contacts exported successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Export failed', error);
            setMessage('Failed to export contacts.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleClearAll = async () => {
        try {
            const token = localStorage.getItem('restricted_token');
            await apiClient.delete('/restricted/contacts/clear', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setContacts([]);
            setShowClearDialog(false);
            setMessage('All contacts cleared successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Clear failed', error);
            setMessage('Failed to clear contacts.');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('restricted_token');
        navigate('/restricted-portal');
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="contacts-container">
            <div className="contacts-card">
                <div className="contacts-header">
                    <div>
                        <h1 className="contacts-title">Contact Form Submissions</h1>
                        <button
                            onClick={() => navigate('/restricted-portal/dashboard')}
                            className="back-btn"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>
                    <div className="header-actions">
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </div>
                </div>

                {message && (
                    <div className={`alert-message ${message.includes('success') ? 'alert-success' : 'alert-info'}`}>
                        {message}
                    </div>
                )}

                <div className="contacts-actions">
                    <button onClick={handleExport} className="export-btn" disabled={contacts.length === 0}>
                        📊 Export to Excel
                    </button>
                    <button
                        onClick={() => setShowClearDialog(true)}
                        className="clear-btn"
                        disabled={contacts.length === 0}
                    >
                        🗑️ Clear All Contacts
                    </button>
                </div>

                <div className="contacts-content">
                    {loading ? (
                        <div className="loading">Loading contacts...</div>
                    ) : contacts.length === 0 ? (
                        <div className="empty-state">
                            <p>No contact submissions yet.</p>
                        </div>
                    ) : (
                        <div className="table-wrapper">
                            <table className="contacts-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Message Preview</th>
                                        <th>Submitted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map((contact) => (
                                        <tr key={contact.id} onClick={() => handleRowClick(contact)}>
                                            <td>{contact.name}</td>
                                            <td className="email-cell">{contact.email}</td>
                                            <td className="message-preview">
                                                {contact.message.substring(0, 50)}
                                                {contact.message.length > 50 ? '...' : ''}
                                            </td>
                                            <td>{formatDate(contact.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Message Detail Modal */}
            {showModal && selectedContact && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Contact Message Details</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="detail-row">
                                <strong>Name:</strong>
                                <span>{selectedContact.name}</span>
                            </div>
                            <div className="detail-row">
                                <strong>Email:</strong>
                                <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a>
                            </div>
                            <div className="detail-row">
                                <strong>Submitted:</strong>
                                <span>{formatDate(selectedContact.created_at)}</span>
                            </div>
                            <div className="detail-row full-width">
                                <strong>Message:</strong>
                                <div className="message-content">{selectedContact.message}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Clear Confirmation Dialog */}
            {showClearDialog && (
                <div className="modal-overlay" onClick={() => setShowClearDialog(false)}>
                    <div className="modal-content confirm-dialog" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>⚠️ Confirm Clear All</h2>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete all {contacts.length} contact submission(s)?</p>
                            <p className="warning-text">This action cannot be undone!</p>
                        </div>
                        <div className="modal-actions">
                            <button onClick={() => setShowClearDialog(false)} className="cancel-btn">
                                Cancel
                            </button>
                            <button onClick={handleClearAll} className="confirm-delete-btn">
                                Yes, Delete All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestrictedContacts;
