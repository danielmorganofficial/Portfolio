import { useState } from 'react'

type SectionKey = 'home' | 'about' | 'experience' | 'projects' | 'contact'

type NavbarProps = {
  onNavigate: (section: SectionKey) => void
}

const links: Array<{ label: string; key: Exclude<SectionKey, 'home'> }> = [
  { label: 'About', key: 'about' },
  { label: 'Experience', key: 'experience' },
  { label: 'Projects', key: 'projects' },
  { label: 'Contact', key: 'contact' },
]

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 transition hover:opacity-80 group"
        >
          <span className="text-xl font-semibold text-white transition group-hover:text-cyan-300">
            Daniel Morgan
          </span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          {links.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => onNavigate(link.key)}
              className="transition hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop Social Links */}
        <div className="hidden items-center gap-4 text-sm text-slate-300 md:flex">
          <a href="https://devpost.com/danielmichelmorgan" target="_blank" rel="noreferrer" className="transition hover:text-white">
            Devpost
          </a>
          <a href="https://github.com/danielmorganofficial/" target="_blank" rel="noreferrer" className="transition hover:text-white">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/danielmmorgan/" target="_blank" rel="noreferrer" className="transition hover:text-white">
            LinkedIn
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-300 transition hover:bg-slate-700/50 hover:text-white md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-45' : ''}`}
          >
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950/95 backdrop-blur md:hidden">
          <div className="mx-auto max-w-6xl px-6 py-4">
            <div className="flex flex-col gap-4">
              {/* Navigation Links */}
              <div className="flex flex-col gap-3">
                {links.map((link) => (
                  <button
                    key={link.key}
                    type="button"
                    onClick={() => {
                      onNavigate(link.key)
                      setIsMenuOpen(false)
                    }}
                    className="text-left text-slate-300 transition hover:text-white py-2"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Social Links */}
              <div className="border-t border-slate-800 pt-4 flex flex-col gap-3">
                <a href="https://devpost.com/danielmichelmorgan" target="_blank" rel="noreferrer" className="text-slate-300 transition hover:text-white py-2">
                  Devpost
                </a>
                <a href="https://github.com/danielmorganofficial/" target="_blank" rel="noreferrer" className="text-slate-300 transition hover:text-white py-2">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/danielmmorgan/" target="_blank" rel="noreferrer" className="text-slate-300 transition hover:text-white py-2">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
