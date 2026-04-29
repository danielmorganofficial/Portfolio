import { motion } from 'framer-motion'

const experienceItems = [
  {
    role: 'Event Manager',
    company: 'Sauder Summit Case Competition',
    period: 'Jan 2026 - Mar 2026',
    details: 'Coordinating execution of an international case competition hosting 16 teams, ensuring structured timeline adherence. Serving as primary liaison between competitors, judges, and organizing committee during high-pressure Global Week.',
  },
  {
    role: 'Competitor & Participant',
    company: 'JDC West Junior Case Development Program',
    period: 'Jan 2026 - Mar 2026',
    details: 'Developed structured recommendations under strict time constraints, synthesizing financial and strategic trade-offs.',
  },
  {
    role: 'Club Executive',
    company: 'Citizens of Churchill Club',
    period: 'Sep 2022 - Jun 2025',
    details: 'Led coordination of large-scale events serving 1,500+ attendees, aligning 150+ volunteers around structured timelines.',
  },
  {
    role: 'Builder & Programmer',
    company: 'VEX Robotics',
    period: 'Jun 2023 - May 2024',
    details: 'Optimized robotics systems using C++, applying iterative prototyping and structured performance testing. Competed at the VEX World Championship, diagnosing and resolving real-time system failures during competition, improving mechanical and code reliability.',
  },
]

export default function Experience() {
  return (
    <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 md:p-8 shadow-[0_20px_80px_rgba(15,23,42,0.4)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-3"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Experience</p>
        <h2 className="text-xl md:text-2xl font-semibold text-white">Professional highlights</h2>
        <p className="max-w-2xl text-sm text-slate-400 leading-relaxed">
          A few meaningful contributions and roles where I combined strategic product thinking, rigorous quantitative analysis, and scalable software engineering to deliver high-impact results.
        </p>
      </motion.div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {experienceItems.map((item, idx) => (
          <motion.article
            key={item.role}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 border border-white/5 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.1)] hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-10 pointer-events-none">
              <span className="font-mono text-6xl font-black text-white">0{idx + 1}</span>
            </div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="mb-4">
                <p className="inline-block rounded-full bg-purple-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-purple-400 border border-purple-500/20">{item.period}</p>
              </div>
              <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{item.role}</h3>
              <p className="text-sm font-semibold text-cyan-400 mb-4">{item.company}</p>
              <p className="text-sm text-slate-400 leading-relaxed mt-auto font-light">{item.details}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
