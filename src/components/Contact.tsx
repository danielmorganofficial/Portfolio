export default function Contact() {
  return (
    <section className="mb-20">
      <div
        className="rounded-2xl bg-white/[0.02] p-8 md:p-16 border border-white/10 text-center relative overflow-hidden"
      >

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400 mb-4">Next Steps</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-8">Let's build the future.</h2>

          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-2xl bg-white/[0.02] border border-white/5 p-6 backdrop-blur-md hover:bg-white/[0.04] transition-colors mb-8">
            <p className="text-slate-400 font-medium mb-2 uppercase tracking-widest text-xs">Email</p>
            <a
              href="mailto:danielmichelmorgan@gmail.com"
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white transition-colors hover:text-cyan-400"
            >
              danielmichelmorgan<span className="text-slate-500">@gmail.com</span>
            </a>
          </div>

          <p className="text-base text-slate-400 leading-relaxed mb-6 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            Always open to discussing new opportunities, demanding technical challenges, and high-impact product roles. Let's create something meaningful.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://github.com/danielmorganofficial/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              GitHub
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
            <a href="https://www.linkedin.com/in/danielmmorgan/" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              LinkedIn
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
