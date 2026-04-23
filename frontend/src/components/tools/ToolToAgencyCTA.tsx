import { ArrowRight, Wrench } from 'lucide-react';
import './ToolToAgencyCTA.css';

/**
 * ToolToAgencyCTA
 * Revenue loop component injected at the bottom of every tool page.
 * Links tool users back to the high-ticket agency service offering.
 */
const ToolToAgencyCTA = () => {
    return (
        <aside className="tool-agency-cta" aria-label="BKX Labs professional implementation services">
            <div className="tool-agency-cta-inner">
                <div className="tool-agency-cta-icon">
                    <Wrench size={28} strokeWidth={1.5} />
                </div>
                <div className="tool-agency-cta-content">
                    <h3>Need this implemented at enterprise scale?</h3>
                    <p>
                        BKX Labs provides enterprise-grade integration, codebase rescue, and compliance
                        engineering for teams that need more than a calculator. Our specialist engineers
                        implement the actual controls — not just the assessments.
                    </p>
                </div>
                <a
                    href="/services"
                    className="tool-agency-cta-btn"
                    aria-label="View BKX Labs software rescue and compliance engineering services"
                >
                    View Services
                    <ArrowRight size={16} />
                </a>
            </div>
        </aside>
    );
};

export default ToolToAgencyCTA;
