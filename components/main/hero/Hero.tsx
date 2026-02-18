'use client';

import React, { useEffect, useRef, useState } from 'react';

/* ─── Floating thumbnail card data ─── */
const THUMBNAILS = [
    {
        id: 1,
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        title: 'How I Made $10K',
        views: '2.4M views',
        x: '8%',
        y: '18%',
        rotate: '-6deg',
        delay: '0s',
    },
    {
        id: 2,
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        title: 'Ultimate Guide 2025',
        views: '890K views',
        x: '72%',
        y: '10%',
        rotate: '5deg',
        delay: '0.4s',
    },
    {
        id: 3,
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        title: 'I Tried Everything',
        views: '3.1M views',
        x: '80%',
        y: '58%',
        rotate: '-4deg',
        delay: '0.8s',
    },
    {
        id: 4,
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        title: "You Won't Believe",
        views: '1.7M views',
        x: '4%',
        y: '62%',
        rotate: '7deg',
        delay: '1.2s',
    },
];

/* ─── Animated counter ─── */
function useCounter(target: number, duration = 1800) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return count;
}

/* ─── Stat item ─── */
function Stat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
    const count = useCounter(value);
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1,
            }}>
                {count.toLocaleString()}{suffix}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 4, fontWeight: 500 }}>{label}</div>
        </div>
    );
}

/* ─── Floating thumbnail card ─── */
function ThumbnailCard({
    gradient, title, views, x, y, rotate, delay,
}: {
    gradient: string; title: string; views: string;
    x: string; y: string; rotate: string; delay: string;
}) {
    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: 'clamp(130px, 14vw, 190px)',
                borderRadius: 12,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
                transform: `rotate(${rotate})`,
                animation: `floatCard 6s ease-in-out infinite`,
                animationDelay: delay,
                backdropFilter: 'blur(4px)',
                zIndex: 1,
            }}
        >
            <div style={{
                width: '100%',
                aspectRatio: '16/9',
                background: gradient,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="16" fill="rgba(0,0,0,0.4)" />
                    <polygon points="13,10 24,16 13,22" fill="white" />
                </svg>
                <div style={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: 4,
                    padding: '2px 6px',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    color: '#a78bfa',
                    letterSpacing: '0.05em',
                }}>AI</div>
            </div>
            <div style={{
                background: 'rgba(15,15,25,0.92)',
                padding: '8px 10px',
            }}>
                <div style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: '#f1f5f9',
                    lineHeight: 1.3,
                    marginBottom: 3,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>{title}</div>
                <div style={{ fontSize: '0.6rem', color: '#64748b' }}>{views}</div>
            </div>
        </div>
    );
}

/* ─── Main Hero component ─── */
export default function Hero() {
    const [inputVal, setInputVal] = useState('');

    return (
        <section style={{
            minHeight: '100vh',
            background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.25) 0%, transparent 60%), #080810',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Outfit', 'Segoe UI', system-ui, -apple-system, sans-serif",
        }}>

            {/* ── Global keyframes ── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        @keyframes floatCard {
          0%, 100% { transform: rotate(var(--r, 0deg)) translateY(0px); }
          50%       { transform: rotate(var(--r, 0deg)) translateY(-14px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .hero-input:focus { outline: none; }
        .hero-input::placeholder { color: #475569; }
        .cta-btn {
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 48px rgba(139,92,246,0.5) !important;
        }
        .cta-btn:active { transform: translateY(0); }
        .secondary-btn {
          transition: background 0.18s ease, color 0.18s ease;
        }
        .secondary-btn:hover {
          background: rgba(255,255,255,0.08) !important;
        }
      `}</style>

            {/* ── Background grid ── */}
            <svg
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                        <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* ── Glow orbs ── */}
            <div style={{
                position: 'absolute',
                width: 600,
                height: 600,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                animation: 'pulseGlow 8s ease-in-out infinite',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)',
                top: '20%',
                right: '15%',
                animation: 'pulseGlow 6s ease-in-out infinite 2s',
                pointerEvents: 'none',
            }} />

            {/* ── Floating thumbnail cards ── */}
            {THUMBNAILS.map(card => (
                <ThumbnailCard key={card.id} {...card} />
            ))}

            {/* ── Rotating ring SVG ── */}
            <svg
                style={{
                    position: 'absolute',
                    width: 'min(700px, 90vw)',
                    height: 'min(700px, 90vw)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0.07,
                    animation: 'rotateSlow 40s linear infinite',
                    pointerEvents: 'none',
                }}
                viewBox="0 0 700 700"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="350" cy="350" r="340" stroke="url(#ringGrad)" strokeWidth="1" strokeDasharray="8 16" />
                <circle cx="350" cy="350" r="280" stroke="url(#ringGrad)" strokeWidth="0.5" strokeDasharray="4 20" />
                <defs>
                    <linearGradient id="ringGrad" x1="0" y1="0" x2="700" y2="700" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#a78bfa" />
                        <stop offset="1" stopColor="#60a5fa" />
                    </linearGradient>
                </defs>
            </svg>

            {/* ── Main content ── */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 'min(6vw, 48px) 24px',
                maxWidth: 780,
                animation: 'slideUp 0.8s ease both',
            }}>

                {/* Badge */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(139,92,246,0.12)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    borderRadius: 100,
                    padding: '6px 16px',
                    marginBottom: 28,
                    animation: 'slideUp 0.8s ease 0.1s both',
                }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#a78bfa" />
                    </svg>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#a78bfa', letterSpacing: '0.04em' }}>
                        AI-Powered Thumbnail Generator
                    </span>
                </div>

                {/* Logo / Brand */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 20,
                    animation: 'slideUp 0.8s ease 0.15s both',
                }}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="10" fill="url(#logoGrad)" />
                        <rect x="8" y="12" width="24" height="16" rx="3" fill="rgba(255,255,255,0.15)" />
                        <polygon points="17,15 28,20 17,25" fill="white" />
                        <circle cx="32" cy="10" r="5" fill="#a78bfa" />
                        <path d="M30 10 L32 8 L34 10 L32 12 Z" fill="white" />
                        <defs>
                            <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#7c3aed" />
                                <stop offset="1" stopColor="#2563eb" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span style={{
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: '#f8fafc',
                        letterSpacing: '-0.02em',
                    }}>
                        Nailart <span style={{ color: '#a78bfa' }}>AI</span>
                    </span>
                </div>

                {/* Headline */}
                <h1 style={{
                    margin: '0 0 20px',
                    fontSize: 'clamp(2.4rem, 6.5vw, 5rem)',
                    fontWeight: 900,
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                    color: '#f8fafc',
                    animation: 'slideUp 0.8s ease 0.2s both',
                }}>
                    Explode Your Views{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'shimmer 4s linear infinite',
                    }}>
                        with AI
                    </span>
                </h1>

                {/* Subtitle */}
                <p style={{
                    margin: '0 0 36px',
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    lineHeight: 1.7,
                    color: '#94a3b8',
                    maxWidth: 560,
                    animation: 'slideUp 0.8s ease 0.3s both',
                }}>
                    Nailart AI analyzes your content to generate high-CTR{' '}
                    <strong style={{ color: '#cbd5e1', fontWeight: 600 }}>YouTube Thumbnails</strong> in
                    just 10 seconds.
                </p>

                {/* Input + CTA */}
                <div style={{
                    width: '100%',
                    maxWidth: 580,
                    animation: 'slideUp 0.8s ease 0.4s both',
                    marginBottom: 20,
                }}>
                    <div style={{
                        display: 'flex',
                        gap: 10,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 16,
                        padding: '6px 6px 6px 20px',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 0 0 1px rgba(139,92,246,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }}>
                        <svg
                            width="20" height="20" viewBox="0 0 20 20" fill="none"
                            style={{ flexShrink: 0, alignSelf: 'center', opacity: 0.5 }}
                        >
                            <rect x="1" y="4" width="13" height="12" rx="2" stroke="#94a3b8" strokeWidth="1.5" />
                            <path d="M14 8L19 5V15L14 12V8Z" stroke="#94a3b8" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                        <input
                            className="hero-input"
                            value={inputVal}
                            onChange={e => setInputVal(e.target.value)}
                            placeholder="Enter your video title or topic..."
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                color: '#f1f5f9',
                                fontSize: '0.95rem',
                                fontFamily: 'inherit',
                                padding: '10px 0',
                            }}
                        />
                        <button
                            className="cta-btn"
                            style={{
                                flexShrink: 0,
                                padding: '12px 24px',
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
                                letterSpacing: '0.01em',
                                fontFamily: 'inherit',
                            }}
                        >
                            Generate
                        </button>
                    </div>
                </div>

                {/* Secondary CTA */}
                <div style={{
                    display: 'flex',
                    gap: 12,
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    animation: 'slideUp 0.8s ease 0.5s both',
                    marginBottom: 56,
                }}>
                    <button
                        className="secondary-btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '10px 20px',
                            borderRadius: 10,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#cbd5e1',
                            fontWeight: 500,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="#94a3b8" strokeWidth="1.2" />
                            <polygon points="6.5,5 12,8 6.5,11" fill="#94a3b8" />
                        </svg>
                        Watch Demo
                    </button>
                    <button
                        className="secondary-btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '10px 20px',
                            borderRadius: 10,
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#cbd5e1',
                            fontWeight: 500,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1L9.8 6H15L10.6 9.2L12.4 14.2L8 11L3.6 14.2L5.4 9.2L1 6H6.2L8 1Z" stroke="#94a3b8" strokeWidth="1.2" strokeLinejoin="round" />
                        </svg>
                        View Examples
                    </button>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'flex',
                    gap: 'clamp(24px, 5vw, 56px)',
                    padding: '24px 40px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 20,
                    backdropFilter: 'blur(8px)',
                    animation: 'slideUp 0.8s ease 0.6s both',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                    <Stat value={50000} label="Thumbnails Generated" suffix="+" />
                    <div style={{ width: 1, background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch' }} />
                    <Stat value={320} label="Avg. CTR Boost" suffix="%" />
                    <div style={{ width: 1, background: 'rgba(255,255,255,0.08)', alignSelf: 'stretch' }} />
                    <Stat value={12000} label="Active Creators" suffix="+" />
                </div>
            </div>

            {/* ── Bottom gradient fade ── */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 120,
                background: 'linear-gradient(to top, #080810, transparent)',
                pointerEvents: 'none',
            }} />
        </section>
    );
}

export { Hero };
