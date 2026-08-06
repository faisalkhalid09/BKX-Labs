import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import Container from '../components/layout/Container';
import './BlogPost.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://bkxlabs.com/api';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    body: string;
    meta_title: string;
    meta_description: string;
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

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        fetch(`${API_URL}/posts/${slug}`)
            .then((res) => {
                if (res.status === 404) {
                    navigate('/blog', { replace: true });
                    return null;
                }
                if (!res.ok) throw new Error('Failed to fetch post');
                return res.json();
            })
            .then((json) => {
                if (json) {
                    setPost(json.data);
                }
                setLoading(false);
            })
            .catch(() => {
                navigate('/blog', { replace: true });
            });
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="blog-post-loading">
                <div className="blog-spinner" />
            </div>
        );
    }

    if (!post) return null;

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        url: `https://bkxlabs.com/blog/${post.slug}`,
        datePublished: post.published_at,
        author: {
            '@type': 'Person',
            name: 'Faisal Khalid',
            url: 'https://bkxlabs.com/about',
        },
        publisher: {
            '@type': 'Organization',
            name: 'BKX Labs',
            url: 'https://bkxlabs.com',
        },
        ...(post.cover_image && { image: post.cover_image }),
    };

    return (
        <div>
            <SEO
                title={`${post.meta_title || post.title} | BKX Labs`}
                description={post.meta_description || post.excerpt}
                structuredData={structuredData}
            />

            {/* Cover image */}
            {post.cover_image && (
                <div className="blog-post-cover">
                    <img src={post.cover_image} alt={post.title} />
                </div>
            )}

            <Container>
                <article className="blog-post-article">
                    {/* Breadcrumb */}
                    <nav className="blog-post-breadcrumb" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span aria-hidden>›</span>
                        <Link to="/blog">Blog</Link>
                        <span aria-hidden>›</span>
                        <span>{post.title}</span>
                    </nav>

                    {/* Header */}
                    <header className="blog-post-header">
                        <h1>{post.title}</h1>
                        <div className="blog-post-meta">
                            {post.published_at && (
                                <time dateTime={post.published_at}>
                                    {formatDate(post.published_at)}
                                </time>
                            )}
                            {post.reading_time_mins && (
                                <span>{post.reading_time_mins} min read</span>
                            )}
                            <span>By Faisal Khalid</span>
                        </div>
                    </header>

                    {/* Body */}
                    <div
                        className="blog-post-body"
                        dangerouslySetInnerHTML={{ __html: post.body }}
                    />

                    {/* CTA */}
                    <div className="blog-post-cta">
                        <h3>Does your codebase need a professional review?</h3>
                        <p>
                            BKX Labs provides fixed-price codebase audits for Laravel and
                            React applications. Written Technical Health Report delivered in
                            5-10 business days.
                        </p>
                        <Link to="/codebase-audit" className="btn btn-primary">
                            Learn About Our Codebase Audit
                        </Link>
                        <Link to="/blog" className="blog-post-back">
                            ← Back to all articles
                        </Link>
                    </div>
                </article>
            </Container>
        </div>
    );
}
