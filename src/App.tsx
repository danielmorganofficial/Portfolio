import { useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import ParticlesBackground from './components/ParticlesBackground'

export default function App() {
  const homeRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  type SectionKey = 'home' | 'about' | 'experience' | 'projects' | 'contact'

  const sections = {
    home: homeRef,
    about: aboutRef,
    experience: experienceRef,
    projects: projectsRef,
    contact: contactRef,
  }

  const handleNavigate = (section: SectionKey) => {
    sections[section]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Minimal Background Animation */}
      <ParticlesBackground />
      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen opacity-50 z-0">
        <div className="absolute -top-[20%] -left-[10%] h-[50vw] w-[50vw] animate-[spin_20s_linear_infinite] rounded-full bg-purple-900/30 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[40vw] w-[40vw] animate-[spin_25s_linear_infinite_reverse] rounded-full bg-cyan-900/30 blur-[120px]" />
        <div className="absolute -bottom-[20%] left-[20%] h-[60vw] w-[60vw] animate-[spin_30s_linear_infinite] rounded-full bg-pink-900/20 blur-[150px]" />
      </div>

      <div className="relative z-10 block">
        <Navbar onNavigate={handleNavigate} />

        <main className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 pt-16 md:pb-24 md:pt-24">
          <section ref={homeRef} className="scroll-mt-24">
            <Hero onNavigate={handleNavigate} />
          </section>

          <section ref={aboutRef} className="mt-12 md:mt-20 scroll-mt-24">
            <About />
          </section>

          <section ref={experienceRef} className="mt-12 md:mt-20 scroll-mt-24">
            <Experience />
          </section>

          <section ref={projectsRef} className="mt-12 md:mt-20 scroll-mt-24">
            <Projects />
          </section>

          <section ref={contactRef} className="mt-12 md:mt-20 scroll-mt-24">
            <Contact />
          </section>
        </main>
      </div>
    </div>
  )
}
