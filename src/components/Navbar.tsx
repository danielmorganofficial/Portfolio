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

        <div className="flex items-center gap-4 text-sm text-slate-300">
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
      </nav>
    </header>
  )
}
