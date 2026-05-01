import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'

type SectionKey = 'home' | 'about' | 'experience' | 'projects' | 'contact'
type HeroProps = {
  onNavigate: (section: SectionKey) => void
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="flex min-h-[78vh] flex-col justify-center gap-10 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >


        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">UBC Business & CS student</p>
      </motion.div>

      <motion.div
        className="max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl min-h-[120px] sm:min-h-[140px] md:min-h-[80px] flex items-center">
          <span>
            Hello World! I'm{' '}
            <TypeAnimation
              sequence={[
                "Daniel Morgan.",
                3000,
                "a developer.",
                2000,
                "a designer.",
                2000,
                "a builder.",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
            />
          </span>
        </h1>



        <motion.div
          className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 shadow-lg shadow-purple-500/30"
          >
            Resume Link
          </a>
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            View Projects
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Let's Connect
          </button>
        </motion.div>
      </motion.div>
    </section>
  )
}
