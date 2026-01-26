import type { ElementType } from 'react';
import Card from './Card';

interface ServiceCardProps {
    icon: ElementType;
    title: string;
    description: string;
}

const ServiceCard = ({ icon: Icon, title, description }: ServiceCardProps) => {
    return (
        <Card>
            <div style={{ marginBottom: '1rem', color: 'var(--accent)' }}>
                <Icon size={40} strokeWidth={1.5} />
            </div>
            <h3 style={{ marginBottom: '0.75rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-gray)', margin: 0 }}>{description}</p>
        </Card>
    );
};

export default ServiceCard;
