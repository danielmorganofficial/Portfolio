import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="mt-32 pt-8 relative">
      <div className="absolute -inset-x-0 -top-40 -z-10 h-96 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -right-40 top-0 -z-10 h-64 w-64 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] p-10 md:p-16 backdrop-blur-xl shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />

        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-sm font-semibold tracking-wide text-cyan-300 mb-6 self-start">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
              ABOUT ME
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-8">
              Building systems, solving problems.
            </h2>
            <div className="space-y-6 text-lg text-slate-300 leading-relaxed font-light">
              <p>
                I am a student at UBC Sauder pursuing a Combined Major in <strong className="text-white font-medium">Business and Computer Science</strong>. I specialize in building scalable software, designing data-driven systems, and translating complex user problems into elegant technical solutions.
              </p>
              <p>
                Whether I am developing full-stack applications, analyzing algorithmic models, or executing high-level product strategies, my focus is always on creating efficient and impactful systems. I am deeply passionate about technology-driven problem solving in fast-paced environments.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 self-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-1 sm:col-span-2 rounded-3xl bg-white/[0.03] p-6 border border-white/5 hover:border-purple-500/30 transition-colors"
            >
              <h3 className="text-purple-400 font-semibold mb-2">Education</h3>
              <p className="text-white font-medium text-lg mb-1">UBC Sauder School of Business</p>
              <p className="text-slate-400 font-light">Combined Major: Business & Computer Science</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl bg-white/[0.03] p-6 border border-white/5 hover:border-cyan-500/30 transition-colors"
            >
              <h3 className="text-cyan-400 font-semibold mb-3">Key Awards</h3>
              <ul className="text-slate-300 font-light space-y-2 text-sm">
                <li className="flex gap-2"><span className="text-cyan-500">▹</span> UX Open Best Design '25</li>
                <li className="flex gap-2"><span className="text-cyan-500">▹</span> VEX Tournament Champs '24</li>
                <li className="flex gap-2"><span className="text-cyan-500">▹</span> CEMC Math Distinction</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-3xl bg-white/[0.03] p-6 border border-white/5 hover:border-pink-500/30 transition-colors"
            >
              <h3 className="text-pink-400 font-semibold mb-3">Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'React', 'Next.js', 'Python', 'C++', 'Tailwind', 'Figma', 'Git'].map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/[0.05] border border-white/10 rounded-full text-xs font-medium text-slate-300 backdrop-blur-sm transition-colors hover:bg-white/10">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
