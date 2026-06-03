const projects = [
  {
    name: 'AI Tree Canopy Identification System',
    description: 'Modelled and optimized neural networks for automated identification of urban tree canopies from aerial imagery and LiDAR as part of a project developed for the City of Edmonton using TensorFlow, PyTorch, and LibTorch. Implemented model training, evaluation, and optimization workflows for large-scale geospatial image datasets. Integrated C++ inference workflows for deployment-focused testing and model optimization.',
    tech: 'TensorFlow · PyTorch · LibTorch · C++ · Python',
    link: null,
  },
  {
    name: 'Pawmora: Social Pet Matching Platform',
    description: 'Developed product strategy and MVP for a vertical video adoption platform, aligning user experience, backend systems (React, TypeScript, Supabase), and go-to-market positioning. Conducted competitive analysis and aligned frontend architecture with core product objectives.',
    tech: 'React · TypeScript · Supabase',
    link: 'https://github.com/danielmorganofficial/Pawmora',
  },
  {
    name: 'UBC Pair: AI-Powered Campus Matchmaking Platform',
    description: 'Built a full-stack dating platform using Next.js, TypeScript, and Firebase, implementing recommendation and matching algorithms across interests, personality traits, and availability while integrating LLM APIs to generate personalized date recommendations.',
    tech: 'Next.js · TypeScript · Firebase · LLM APIs',
    link: 'https://github.com/danielmorganofficial/UBC-Pair',
  },
  {
    name: 'Mockr: AI Interview Simulation Platform',
    description: 'Scoped and built an AI-powered mock interview platform in a 24-hour sprint, prioritizing core user flows and integrating TypeScript, Python, OpenCV, and LLM APIs for end-to-end functionality.',
    tech: 'TypeScript · Python · OpenCV · LLM APIs',
    link: 'https://github.com/danielmorganofficial/Mockr',
  },
  {
    name: 'Anchor: Peer Accountability Productivity App',
    description: 'Led primary user research and designed a peer-based productivity platform in Figma, validating demand through survey data and differentiating via social accountability features and incentive-based engagement.',
    tech: 'Figma · UX Research · Product Design',
    link: 'https://pin-child-74912954.figma.site',
  },
]

export default function Projects() {
  return (
    <section className="mt-16">
      <div className="flex flex-col gap-3">
        <p className="section-title">Projects</p>
        <h2 className="section-heading">Selected work</h2>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => {
          const isLink = !!project.link;

          if (isLink) {
            return (
              <a
                key={project.name}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col items-start justify-between rounded-3xl bg-white/[0.02] border border-white/[0.05] p-6 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_0_32px_-10px_rgba(6,182,212,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex w-full items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white tracking-tight">{project.name}</h3>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] text-white transition-all group-hover:bg-cyan-500 group-hover:text-slate-950">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </span>
                </div>
                <p className="relative z-10 mt-5 text-slate-300 leading-7 font-light">{project.description}</p>
                <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                  {project.tech.split('·').map(t => (
                    <span key={t.trim()} className="rounded-full bg-white/[0.05] border border-white/10 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">{t.trim()}</span>
                  ))}
                </div>
              </a>
            );
          } else {
            return (
              <article
                key={project.name}
                className="group relative flex flex-col items-start justify-between rounded-3xl bg-white/[0.02] border border-white/[0.05] p-5 sm:p-6 overflow-hidden transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_0_32px_-10px_rgba(6,182,212,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative z-10 flex w-full items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-white tracking-tight">{project.name}</h3>
                </div>
                <p className="relative z-10 mt-5 text-slate-300 leading-7 font-light">{project.description}</p>
                <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                  {project.tech.split('·').map(t => (
                    <span key={t.trim()} className="rounded-full bg-white/[0.05] border border-white/10 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm">{t.trim()}</span>
                  ))}
                </div>
              </article>
            );
          }
        })}
      </div>
    </section>
  )
}
