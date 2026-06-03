const experienceItems = [
  {
    role: 'Event Manager',
    company: 'Sauder Summit Case Competition',
    period: 'Jan 2026 - Mar 2026',
    details: 'Coordinated execution of an international case competition hosting 16 teams, managing event logistics and operational timelines. Served as the primary liaison between competitors, judges, and the organizing committee during high-pressure Global Week.',
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
    details: 'Optimized robotics systems using C++, applying iterative prototyping and structured performance testing. Competed at the VEX World Championship, diagnosing and resolving real-time system failures during competition.',
  },
]

export default function Experience() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 md:p-9">
      <div className="flex flex-col gap-4">
        <p className="section-title">Experience</p>
        <h2 className="section-heading">Professional highlights</h2>
      </div>

      <div className="mt-4 space-y-4">
        {experienceItems.map((item) => (
          <article
            key={item.role}
            className="rounded-3xl bg-white/[0.02] p-4 sm:p-5 border border-white/10 border-l-4 border-l-cyan-400/25 transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.04]"
          >
            <div className="space-y-2">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white tracking-tight">{item.role}</h3>
                  <p className="text-sm text-slate-300">{item.company}</p>
                </div>
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-400">{item.period}</p>
              </div>
              <p className="text-sm text-slate-400 leading-7">{item.details}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
