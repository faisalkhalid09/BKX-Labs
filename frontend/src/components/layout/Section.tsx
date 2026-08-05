import type { CSSProperties, ReactNode } from 'react';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    style?: CSSProperties;
}

const Section = ({ children, className = '', id, style }: SectionProps) => {
    return (
        <section className={`section ${className}`} id={id} style={style}>
            {children}
        </section>
    );
};

export default Section;
