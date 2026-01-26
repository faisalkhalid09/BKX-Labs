import { ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

const Section = ({ children, className = '', id }: SectionProps) => {
    return (
        <section className={`section ${className}`} id={id}>
            {children}
        </section>
    );
};

export default Section;
