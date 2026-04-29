import { motion } from 'framer-motion'

const projects = [
  {
    name: 'Pawmora: Social Pet Matching',
    description: 'Developed product strategy and MVP for a vertical video adoption platform, aligning user experience, backend systems, and go-to-market positioning. Conducted competitive analysis and aligned frontend architecture with core product objectives.',
    tech: 'React · TypeScript · Supabase',
    link: 'https://github.com/danielmorganofficial/Pawmora',
  },
  {
    name: 'UBC Pair: Campus Matchmaking',
    description: 'Built a full-stack dating platform implementing a compatibility algorithm across interests, personality traits, and availability while integrating LLM APIs to generate personalized date ideas.',
    tech: 'Next.js · TypeScript · Firebase · LLM APIs',
    link: 'https://github.com/danielmorganofficial/UBC-Pair',
  },
  {
    name: 'Mockr: AI Interview Simulation',
    description: 'Scoped and built an AI-powered mock interview platform in a 24-hour sprint, prioritizing core user flows and integrating AI for end-to-end functionality.',
    tech: 'TypeScript · Python · OpenCV · LLMs',
    link: 'https://github.com/danielmorganofficial/Mockr',
  },
  {
    name: 'Anchor: Peer Accountability App',
    description: 'Led primary user research and designed a peer-based productivity platform in Figma, validating demand through survey data and differentiating via social accountability features.',
    tech: 'Figma · UX Research · Product Design',
    link: 'https://pin-child-74912954.figma.site',
  },
]

export default function Projects() {
  return (
    <section className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4"
      >
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Projects</p>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Selected work</h2>
        <p className="max-w-2xl text-slate-400">
          Work that highlights product clarity, algorithmic complexity, and robust full-stack execution.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {projects.map((project, idx) => {
          const isLink = !!project.link;

          if (isLink) {
            return (
              <motion.a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col items-start justify-between rounded-3xl bg-white/[0.02] border border-white/[0.05] p-8 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-2 hover:border-cyan-500/30 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex w-full items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white tracking-tight">{project.name}</h3>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] text-white transition-all group-hover:bg-cyan-500 group-hover:text-slate-950">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </span>
                </div>
                <p className="relative z-10 mt-6 text-slate-300 leading-relaxed font-light">{project.description}</p>
                <div className="relative z-10 mt-8 flex flex-wrap gap-2">
                  {project.tech.split('·').map(t => (
                    <span key={t.trim()} className="rounded-full bg-white/[0.05] border border-white/10 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">{t.trim()}</span>
                  ))}
                </div>
              </motion.a>
            );
          } else {
            return (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col items-start justify-between rounded-3xl bg-white/[0.02] border border-white/[0.05] p-8 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-2 hover:border-cyan-500/30 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex w-full items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white tracking-tight">{project.name}</h3>
                </div>
                <p className="relative z-10 mt-6 text-slate-300 leading-relaxed font-light">{project.description}</p>
                <div className="relative z-10 mt-8 flex flex-wrap gap-2">
                  {project.tech.split('·').map(t => (
                    <span key={t.trim()} className="rounded-full bg-white/[0.05] border border-white/10 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">{t.trim()}</span>
                  ))}
                </div>
              </motion.article>
            );
          }
        })}
      </div>
    </section>
  )
}
