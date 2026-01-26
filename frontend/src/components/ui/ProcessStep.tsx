import './ProcessStep.css';

interface ProcessStepProps {
    number: string;
    title: string;
    description: string;
}

const ProcessStep = ({ number, title, description }: ProcessStepProps) => {
    return (
        <div className="process-step">
            <div className="process-number">{number}</div>
            <div className="process-content">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default ProcessStep;
