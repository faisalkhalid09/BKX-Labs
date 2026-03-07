import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';

interface TicketPrice {
    id: number;
    date: string;
    ticket_name: string;
    price: string | number;
    park_price: string | number;
    price_adult: string | number;
    price_child: string | number;
    KGS_Adult: string | number;
    KGS_Child: string | number;
}

const RezgoDemo: React.FC = () => {
    const [prices, setPrices] = useState<TicketPrice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Note for User: Ensure this URL matches your active Laravel Backend API URL
    const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.bkxlabs.com';

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                // Fetch the live sandbox data directly from the isolated devrezgo database via the Laravel API
                const response = await axios.get(`${API_URL}/api/rezgo-demo/prices`);
                if (response.data && response.data.status === 'success') {
                    setPrices(response.data.data);
                } else {
                    setError('Failed to load pricing data. Ensure database is populated.');
                }
            } catch (err: any) {
                console.error('Error fetching prices:', err);
                setError('Could not connect to the API. Please ensure the backend server is running and the route is accessible.');
            } finally {
                setLoading(false);
            }
        };

        fetchPrices();
    }, [API_URL]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: '80px' }}>
            <Section>
                <Container>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h1 style={{ color: '#1e3a8a', background: 'none', WebkitTextFillColor: '#1e3a8a', fontSize: '2.5rem', marginBottom: '1rem' }}>
                            Partner API Pricing Synchronization
                        </h1>
                        <p style={{ margin: '0 auto', maxWidth: '800px', color: '#64748b' }}>
                            Confidential presentation of Live Sandbox markup calculations. All data is automatically synchronized and formatted according to the agreed technical specifications.
                        </p>
                    </div>

                    <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid rgba(226, 232, 240, 0.8)', padding: '2rem', overflowX: 'auto', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                        <h2 style={{ color: '#0f172a', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                            Live Calculated Rates
                        </h2>

                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading secure database feed...</div>
                        ) : error ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: '#dc2626', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
                                {error}
                            </div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f8fafc', color: '#64748b', textAlign: 'left', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Ticket</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Date</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Base Ours</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>Park</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#1e3a8a' }}>Sell A</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#1e3a8a' }}>Sell C</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#059669' }}>KGS A</th>
                                        <th style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#059669' }}>KGS C</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {prices.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No prices found. Please run the sync script.</td>
                                        </tr>
                                    ) : (
                                        prices.map((price, idx) => (
                                            <tr key={price.id} style={{ backgroundColor: idx % 2 === 0 ? 'white' : '#f8fafc', transition: 'background-color 0.2s ease' }} className="hover:bg-slate-50">
                                                <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', fontWeight: '500', color: '#0f172a' }}>{price.ticket_name}</td>
                                                <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>{formatDate(price.date)}</td>
                                                <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>${Number(price.price).toFixed(2)}</td>
                                                <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0' }}>${Number(price.park_price).toFixed(2)}</td>
                                                <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>{Number(price.price_adult) > 0 ? `$${Number(price.price_adult).toFixed(2)}` : '0.00'}</td>
                                                <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>{Number(price.price_child) > 0 ? `$${Number(price.price_child).toFixed(2)}` : '0.00'}</td>
                                                <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>{Number(price.KGS_Adult) > 0 ? `$${Number(price.KGS_Adult).toFixed(2)}` : '0.00'}</td>
                                                <td style={{ padding: '1rem', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold' }}>{Number(price.KGS_Child) > 0 ? `$${Number(price.KGS_Child).toFixed(2)}` : '0.00'}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default RezgoDemo;
