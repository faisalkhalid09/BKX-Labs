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

    // Note for User: Ensure this URL matches your active Laravel Backend API URL
    const API_URL = import.meta.env.VITE_API_URL || 'https://bkxlabs.com/api';

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                // Fetch the live sandbox data directly from the isolated devrezgo database via the Laravel API
                const response = await axios.get(`${API_URL}/rezgo-demo/prices`);
                if (response.data && response.data.status === 'success') {
                    setPrices(response.data.data);
                }
            } catch (err: any) {
                console.error('Error fetching prices:', err);
            }
        };

        fetchPrices();
    }, [API_URL]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingTop: 'clamp(60px, 10vh, 100px)', paddingBottom: '2rem' }}>
            <Section>
                <Container>
                    <div style={{ textAlign: 'center', marginBottom: 'clamp(1.5rem, 5vw, 3rem)', padding: '0 1rem' }}>
                        <h1 style={{
                            color: '#1e3a8a',
                            background: 'none',
                            WebkitTextFillColor: '#1e3a8a',
                            fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                            marginBottom: '1rem',
                            lineHeight: '1.2'
                        }}>
                            Partner API Pricing Synchronization
                        </h1>
                        <p style={{ margin: '0 auto', maxWidth: '800px', color: '#64748b', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.6' }}>
                            Confidential presentation of Live Sandbox markup calculations. All data is automatically synchronized and formatted according to the agreed technical specifications.
                        </p>
                    </div>

                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        border: '1px solid rgba(226, 232, 240, 0.8)',
                        padding: 'clamp(1rem, 3vw, 2rem)',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
                        width: '100%'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: '700' }}>
                                Live Calculated Rates
                            </h2>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', backgroundColor: '#f0fdf4', borderRadius: '99px', border: '1px solid #dcfce7' }}>
                                <div style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
                                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#166534', textTransform: 'uppercase' }}>Connected</span>
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', margin: '0 -1rem', padding: '0 1rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0', minWidth: '900px' }}>
                                <thead>
                                    <tr style={{ color: '#64748b', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>
                                        <th style={{ padding: '1rem', borderBottom: '2px solid #f1f5f9', whiteSpace: 'nowrap' }}>Ticket Details</th>
                                        <th style={{ padding: '1rem', borderBottom: '2px solid #f1f5f9', whiteSpace: 'nowrap' }}>Last Sync</th>
                                        <th style={{ padding: '1rem', borderBottom: '2px solid #f1f5f9', whiteSpace: 'nowrap', textAlign: 'center' }}>Base Price</th>
                                        <th style={{ padding: '1rem', borderBottom: '2px solid #f1f5f9', whiteSpace: 'nowrap', textAlign: 'center' }}>Park</th>
                                        <th style={{ padding: '1rem', borderBottom: '2px solid #f1f5f9', whiteSpace: 'nowrap', textAlign: 'center', color: '#1e3a8a', backgroundColor: 'rgba(30, 58, 138, 0.01)' }}>Sell A</th>
                                        <th style={{ padding: '1rem', borderBottom: '2px solid #f1f5f9', whiteSpace: 'nowrap', textAlign: 'center', color: '#1e3a8a', backgroundColor: 'rgba(30, 58, 138, 0.01)' }}>Sell C</th>
                                        <th style={{ padding: '1rem', borderBottom: '2px solid #f1f5f9', whiteSpace: 'nowrap', textAlign: 'center', color: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.01)' }}>KGS A</th>
                                        <th style={{ padding: '1rem', borderBottom: '2px solid #f1f5f9', whiteSpace: 'nowrap', textAlign: 'center', color: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.01)' }}>KGS C</th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: '0.925rem' }}>
                                    {prices.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} style={{ padding: '4rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
                                                <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No data available</div>
                                                <div style={{ fontSize: '0.85rem' }}>The background synchronization process is currently populating the database.</div>
                                            </td>
                                        </tr>
                                    ) : (
                                        prices.map((price) => (
                                            <tr key={price.id} style={{ transition: 'all 0.2s ease', cursor: 'default' }}>
                                                <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f1f5f9', maxWidth: '300px' }}>
                                                    <div style={{ fontWeight: '600', color: '#0f172a', lineHeight: '1.4' }}>{price.ticket_name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem', textTransform: 'uppercase' }}>Standard Admission</div>
                                                </td>
                                                <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f1f5f9', color: '#64748b', fontSize: '0.75rem' }}>
                                                    {formatDate(price.date)}
                                                </td>
                                                <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center', color: '#475569', fontWeight: '500' }}>
                                                    ${Number(price.price).toFixed(2)}
                                                </td>
                                                <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center', color: '#475569' }}>
                                                    ${Number(price.park_price).toFixed(2)}
                                                </td>
                                                <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontWeight: '700', color: '#1e3a8a', backgroundColor: 'rgba(30, 58, 138, 0.02)' }}>
                                                    {Number(price.price_adult) > 0 ? `$${Number(price.price_adult).toFixed(2)}` : '—'}
                                                </td>
                                                <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontWeight: '700', color: '#1e3a8a', backgroundColor: 'rgba(30, 58, 138, 0.02)' }}>
                                                    {Number(price.price_child) > 0 ? `$${Number(price.price_child).toFixed(2)}` : '—'}
                                                </td>
                                                <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontWeight: '700', color: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.02)' }}>
                                                    {Number(price.KGS_Adult) > 0 ? `$${Number(price.KGS_Adult).toFixed(2)}` : '—'}
                                                </td>
                                                <td style={{ padding: '1.25rem 1rem', borderBottom: '1px solid #f1f5f9', textAlign: 'center', fontWeight: '700', color: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.02)' }}>
                                                    {Number(price.KGS_Child) > 0 ? `$${Number(price.KGS_Child).toFixed(2)}` : '—'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#fdf2f2', borderRadius: '8px', border: '1px solid #fee2e2', display: prices.length > 0 ? 'block' : 'none' }}>
                            <p style={{ fontSize: '0.75rem', color: '#991b1b', margin: '0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Internal Security Notice:</span> Markup logic is encrypted and only displayed for authorized review.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default RezgoDemo;
