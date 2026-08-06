import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import Container from '../components/layout/Container';
import Section from '../components/layout/Section';
import './Blog.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://bkxlabs.com/api';

interface PostSummary {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    cover_image: string | null;
    reading_time_mins: number | null;
    published_at: string;
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export default function Blog() {
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/posts`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch posts');
                return res.json();
            })
            .then((json) => {
                setPosts(json.data ?? []);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'BKX Labs Insights',
        description:
            'Technical articles on Laravel, React, codebase audits, technical debt remediation, and software rescue methodology from the BKX Labs engineering team.',
        url: 'https://bkxlabs.com/blog',
        publisher: {
            '@type': 'Organization',
            name: 'BKX Labs',
            url: 'https://bkxlabs.com',
        },
    };

    return (
        <div>
            <SEO
                title="Insights | BKX Labs Engineering Blog"
                description="Technical articles on Laravel architecture, React performance, codebase audits, technical debt, and software rescue. Written by the BKX Labs engineering team."
                keywords="laravel technical articles, react codebase advice, technical debt blog, software audit insights, bkx labs blog, binkhalid labs insights"
                structuredData={structuredData}
            />

            <div className="blog-hero">
                <Container>
                    <div className="blog-hero-inner">
                        <span className="blog-hero-label">Engineering Insights</span>
                        <h1>The BKX Labs Blog</h1>
                        <p>
                            Technical articles on Laravel, React, codebase audits, and
                            software rescue. Written by engineers, for engineers and the
                            CTOs who manage them.
                        </p>
                    </div>
                </Container>
            </div>

            <Section>
                <Container>
                    {loading && (
                        <div className="blog-state">
                            <div className="blog-spinner" />
                            <p>Loading articles...</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="blog-state">
                            <p>Could not load articles. Please try again later.</p>
                        </div>
                    )}

                    {!loading && !error && posts.length === 0 && (
                        <div className="blog-state">
                            <p>No articles published yet. Check back soon.</p>
                        </div>
                    )}

                    {!loading && !error && posts.length > 0 && (
                        <div className="blog-grid">
                            {posts.map((post) => (
                                <article key={post.id} className="blog-card">
                                    {post.cover_image && (
                                        <Link to={`/blog/${post.slug}`} className="blog-card-image-link" tabIndex={-1} aria-hidden>
                                            <img
                                                src={post.cover_image}
                                                alt={post.title}
                                                className="blog-card-image"
                                                loading="lazy"
                                            />
                                        </Link>
                                    )}
                                    <div className="blog-card-body">
                                        <div className="blog-card-meta">
                                            {post.published_at && (
                                                <time dateTime={post.published_at}>
                                                    {formatDate(post.published_at)}
                                                </time>
                                            )}

                                        </div>
                                        <h2 className="blog-card-title">
                                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                        </h2>
                                        <p className="blog-card-excerpt">{post.excerpt}</p>
                                        <Link to={`/blog/${post.slug}`} className="blog-card-read-more">
                                            Read article →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </Container>
            </Section>
        </div>
    );
}
