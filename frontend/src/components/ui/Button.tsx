import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: ReactNode;
    href?: string;
}

const Button = ({ variant = 'primary', children, href, ...props }: ButtonProps) => {
    const className = `btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'}`;

    if (href) {
        return (
            <a href={href} className={className}>
                {children}
            </a>
        );
    }

    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export default Button;
