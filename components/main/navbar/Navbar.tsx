'use client';

import React, { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'Examples', href: '#gallery' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blog', href: '#blog' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    /* Scroll detection */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* Close menu on outside click */
    useEffect(() => {
        if (!menuOpen) return;
        const handler = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [menuOpen]);

    return (
        <>
            <style>{`
        @keyframes navSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mobileMenuOpen {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <header
                ref={menuRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-[navSlideDown_0.6s_ease_both] ${scrolled ? 'backdrop-blur-md bg-opacity-0' : 'bg-transparent'
                    } font-sans`}
            >
                <nav className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'
                    }`}>
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2.5 no-underline group">
                        <div className="relative w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl border border-white/20 transition-all group-hover:bg-white/15">
                            <svg width="24" height="24" viewBox="0 0 36 36" fill="none" className="w-6 h-6">
                                <rect x="7" y="11" width="16" height="10" rx="2" fill="rgba(255,255,255,0.18)" />
                                <polygon points="15,13.5 23,16 15,18.5" fill="white" />
                                <circle cx="28" cy="9" r="5" fill="white" fillOpacity="0.92" />
                                <path d="M28 6.2L28.8 8.2L31 9L28.8 9.8L28 11.8L27.2 9.8L25 9L27.2 8.2L28 6.2Z" fill="#222" />
                            </svg>
                        </div>
                        <span className="text-lg font-extrabold text-white tracking-tight">
                            Nailart <span className="text-white/55">AI</span>
                        </span>
                    </a>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="relative text-white/70 hover:text-white text-sm font-medium py-1 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white/80 after:transition-all hover:after:w-full after:rounded-full"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href="#login"
                            className="text-white/70 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-xl text-[10px] font-medium transition-all"
                        >
                            Log in
                        </a>
                        <a
                            href="#signup"
                            className="bg-gradient-to-b from-white/20 to-white/10 hover:from-white/25 hover:to-white/15 text-white px-5 py-2.5 rounded-xl text-[12px] font-semibold transition-all shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22),0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.45),0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md"
                        >
                            Get Started Free
                        </a>
                    </div>

                    {/* Hamburger (mobile) */}
                    <button
                        aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((v) => !v)}
                        className="md:hidden flex flex-col gap-1.5 p-2 bg-white/5 rounded-lg border border-white/10"
                    >
                        <span className={`block w-5 h-[1.5px] bg-white/85 rounded transition-all origin-center ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
                        <span className={`block w-5 h-[1.5px] bg-white/85 rounded transition-all ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
                        <span className={`block w-5 h-[1.5px] bg-white/85 rounded transition-all origin-center ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
                    </button>
                </nav>

                {/* Mobile dropdown menu */}
                {menuOpen && (
                    <div className="md:hidden bg-[#080810]/95 backdrop-blur-3xl border-t border-white/10 px-5 py-4 animate-[mobileMenuOpen_0.22s_ease_both]">
                        <div className="flex flex-col gap-1">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="block text-white/75 hover:text-white text-base font-medium py-3 border-b border-white/5 transition-all hover:pl-2"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="flex gap-3 mt-4">
                                <a
                                    href="#login"
                                    className="flex-1 text-center py-3 bg-white/5 border border-white/10 text-white/80 rounded-xl font-medium text-sm no-underline active:scale-95 transition-transform"
                                >
                                    Log in
                                </a>
                                <a
                                    href="#signup"
                                    className="flex-1 text-center py-3 bg-gradient-to-b from-white/0 to-white/10 border border-white/20 text-white rounded-xl font-bold text-sm no-underline active:scale-95 transition-transform"
                                >
                                    Get Started Free
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

export { Navbar };
