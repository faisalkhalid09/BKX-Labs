import Hero from '../components/ui/Hero';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import { Globe, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CaseStudy.css';

const CaseStudy = () => {
    return (
        <div>
            <Hero
                title="Success Stories"
                subtitle="Real projects. Complex challenges. Proven results."
            />

            {/* Intro */}
            <Section>
                <Container>
                    <div className="case-intro">
                        <p>
                            We specialize in taking over stalled projects, auditing existing codebases,
                            and delivering production-ready solutions where others have failed. Here are
                            two examples of how we've turned technical challenges into successful deployments.
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Case Study 1: Class Moalimy */}
            <Section className="case-study-section">
                <Container>
                    <div className="case-study-block">
                        <div className="case-badge">
                            <Globe size={24} />
                            <span>EdTech Platform</span>
                        </div>

                        <h2>Class Moalimy</h2>
                        <p className="case-subtitle">International Education Platform — Saudi Arabia</p>

                        {/* Executive Summary */}
                        <div className="case-highlight">
                            <p>
                                A comprehensive EdTech platform serving educators and students across Saudi Arabia,
                                featuring secure cloud storage, role-based access control, and real-time learning
                                management capabilities. We inherited a stalled 20% complete codebase and delivered
                                a full-scale production system.
                            </p>
                        </div>

                        <div className="case-grid">
                            {/* The Challenge */}
                            <div className="case-section-block">
                                <h3>The Challenge</h3>
                                <p>
                                    The client approached us with a partially developed system (approximately 20% complete)
                                    that had been abandoned by the previous development team. The existing codebase
                                    suffered from architectural inconsistencies, security vulnerabilities, and incomplete
                                    feature implementations.
                                </p>
                                <ul>
                                    <li>Unstructured AWS S3 integration with exposed credentials</li>
                                    <li>Missing role-based access control (RBAC) system</li>
                                    <li>No documentation or test coverage</li>
                                    <li>Database schema requiring normalization</li>
                                    <li>Incomplete user authentication flow</li>
                                </ul>
                            </div>

                            {/* The Solution */}
                            <div className="case-section-block">
                                <h3>The Technical Solution</h3>
                                <p>
                                    We conducted a comprehensive code audit, documented all existing functionality,
                                    and implemented a phase-wise recovery plan with clear milestones.
                                </p>
                                <ul>
                                    <li><strong>Phase 1:</strong> Security audit and AWS credential rotation</li>
                                    <li><strong>Phase 2:</strong> Database restructuring and optimization</li>
                                    <li><strong>Phase 3:</strong> Complete RBAC implementation (Admin, Teacher, Student, Parent)</li>
                                    <li><strong>Phase 4:</strong> Secure file upload architecture with pre-signed URLs</li>
                                    <li><strong>Phase 5:</strong> Frontend integration and comprehensive testing</li>
                                </ul>
                            </div>

                            {/* The Closer Impact */}
                            <div className="case-section-block">
                                <h3>The "Closer" Impact</h3>
                                <p>
                                    We didn't just complete the remaining 80% — we optimized the entire system.
                                    Database queries were reduced from 200+ to under 50 per page load. AWS costs
                                    were cut by 40% through proper S3 lifecycle policies. The authentication system
                                    was rebuilt with Laravel Sanctum, ensuring enterprise-grade security.
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="case-section-block tech-block">
                                <h3>Technology Stack</h3>
                                <div className="tech-tags">
                                    <span>Laravel 10</span>
                                    <span>React</span>
                                    <span>TypeScript</span>
                                    <span>MySQL</span>
                                    <span>AWS S3</span>
                                    <span>AWS CloudFront</span>
                                    <span>Laravel Sanctum</span>
                                    <span>Redis</span>
                                    <span>Docker</span>
                                    <span>GitHub Actions</span>
                                </div>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="case-features">
                            <h3>Key Features Delivered</h3>
                            <div className="features-grid">
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>Secure AWS S3 file storage with pre-signed URLs</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>Multi-role access control (Admin, Teacher, Student, Parent)</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>Real-time class scheduling and management</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>Assignment submission and grading system</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>Progress tracking and analytics dashboard</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>Mobile-responsive interface</span>
                                </div>
                            </div>
                        </div>

                        {/* Outcome */}
                        <div className="case-outcome">
                            <h3>The Outcome</h3>
                            <div className="outcome-stats">
                                <div className="stat">
                                    <span className="stat-value">100%</span>
                                    <span className="stat-label">Project Completion</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">40%</span>
                                    <span className="stat-label">AWS Cost Reduction</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">&lt;200ms</span>
                                    <span className="stat-label">Average Response Time</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">Zero</span>
                                    <span className="stat-label">Security Incidents</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Case Study 2: LocaGed */}
            <Section className="case-study-section alt">
                <Container>
                    <div className="case-study-block">
                        <div className="case-badge">
                            <FileText size={24} />
                            <span>Document Management System</span>
                        </div>

                        <h2>LocaGed</h2>
                        <p className="case-subtitle">Enterprise Document Management System — Multi-Language Support</p>

                        {/* Executive Summary */}
                        <div className="case-highlight">
                            <p>
                                A sophisticated enterprise-grade Document Management System featuring OCR-powered
                                document indexing, lightning-fast Elasticsearch queries, and full RTL language support.
                                We inherited a 35% complete stalled project and delivered a production-ready platform
                                processing thousands of documents daily.
                            </p>
                        </div>

                        <div className="case-grid">
                            {/* The Challenge */}
                            <div className="case-section-block">
                                <h3>The Challenge</h3>
                                <p>
                                    The client came to us with a complex DMS project that was approximately 35% complete
                                    and stalled for over 6 months. The previous team had implemented basic file storage
                                    but failed to deliver the core OCR and search functionality that made the system valuable.
                                </p>
                                <ul>
                                    <li>Non-functional OCR integration with poor accuracy</li>
                                    <li>MySQL-based search causing 10+ second query times</li>
                                    <li>No RTL (Right-to-Left) language support for Arabic</li>
                                    <li>Memory leaks in document processing workers</li>
                                    <li>Unoptimized file storage consuming excessive disk space</li>
                                </ul>
                            </div>

                            {/* The Solution */}
                            <div className="case-section-block">
                                <h3>The Technical Solution</h3>
                                <p>
                                    We re-architected the core document processing pipeline using a queue-based
                                    approach with Redis, implemented Elasticsearch for sub-second search, and
                                    built a custom OCR pipeline with Tesseract optimization.
                                </p>
                                <ul>
                                    <li><strong>Phase 1:</strong> Codebase audit and architecture redesign</li>
                                    <li><strong>Phase 2:</strong> Elasticsearch implementation with custom analyzers</li>
                                    <li><strong>Phase 3:</strong> OCR pipeline rebuild with Tesseract + preprocessing</li>
                                    <li><strong>Phase 4:</strong> Redis queue workers for background processing</li>
                                    <li><strong>Phase 5:</strong> RTL support and multi-language interface</li>
                                    <li><strong>Phase 6:</strong> Performance optimization and load testing</li>
                                </ul>
                            </div>

                            {/* The Closer Impact */}
                            <div className="case-section-block">
                                <h3>The "Closer" Impact</h3>
                                <p>
                                    The transformation was dramatic. Search queries dropped from 10+ seconds to under
                                    100 milliseconds. OCR accuracy improved from 65% to 94% through image preprocessing.
                                    The system now processes 5,000+ documents daily with zero downtime. Arabic RTL
                                    support opened the platform to an entirely new market segment.
                                </p>
                            </div>

                            {/* Tech Stack */}
                            <div className="case-section-block tech-block">
                                <h3>Technology Stack</h3>
                                <div className="tech-tags">
                                    <span>Laravel 10</span>
                                    <span>Vue.js</span>
                                    <span>Elasticsearch</span>
                                    <span>Redis</span>
                                    <span>Tesseract OCR</span>
                                    <span>PostgreSQL</span>
                                    <span>Docker</span>
                                    <span>MinIO (S3-compatible)</span>
                                    <span>Laravel Horizon</span>
                                    <span>Nginx</span>
                                </div>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="case-features">
                            <h3>Key Features Delivered</h3>
                            <div className="features-grid">
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>OCR-powered document indexing with 94% accuracy</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>Sub-100ms full-text search via Elasticsearch</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>Full RTL (Arabic) language support</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>Background processing with Redis queues</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>Version control and document history</span>
                                </div>
                                <div className="feature-item">
                                    <CheckCircle size={20} />
                                    <span>Role-based permissions and audit logs</span>
                                </div>
                            </div>
                        </div>

                        {/* Outcome */}
                        <div className="case-outcome">
                            <h3>The Outcome</h3>
                            <div className="outcome-stats">
                                <div className="stat">
                                    <span className="stat-value">100x</span>
                                    <span className="stat-label">Faster Search</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">94%</span>
                                    <span className="stat-label">OCR Accuracy</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">5,000+</span>
                                    <span className="stat-label">Documents/Day</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">99.9%</span>
                                    <span className="stat-label">Uptime</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA */}
            <Section className="case-cta">
                <Container>
                    <div className="cta-content">
                        <h2>Have a Stalled Project?</h2>
                        <p>
                            We specialize in rescuing complex codebases and delivering results.
                            Let's discuss how we can help you reach production.
                        </p>
                        <Link to="/contact" className="btn btn-primary">
                            Book a Technical Consultation <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>
                </Container>
            </Section>
        </div>
    );
};

export default CaseStudy;
