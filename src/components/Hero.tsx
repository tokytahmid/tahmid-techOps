import { Linkedin, Github } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 text-center md:text-left">
            <p className="text-text-muted text-lg mb-2">Hi I am</p>
            <h2 className="text-text-main text-3xl md:text-4xl font-medium mb-2">Khandkar Toky Tahmid</h2>
            <h1 className="text-text-main text-[2.4rem] md:text-[3.2rem] leading-[1.1] font-bold mb-4">
              IT Specialist & <br className="hidden md:block" />
              <span className="text-accent-orange">Full Stack Developer</span>
            </h1>
            <p className="text-text-muted leading-[1.6] mb-6 text-base max-w-lg mx-auto md:mx-0">
              Versatile technology professional specializing in system administration, network infrastructure, and building modern full-stack web applications.
            </p>
            
            <div className="flex items-center justify-center md:justify-start gap-4 mb-10">
              <a href="https://www.linkedin.com/in/toky-tahmid/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted hover:text-white hover:border-accent-orange transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/tokytahmid" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted hover:text-white hover:border-accent-orange transition-all">
                <Github size={18} />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-12">
              <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-accent-orange hover:bg-[#e64300] text-white rounded-md font-bold transition-colors text-center">
                HIRE ME NOW
              </a>
              <a href="/Khandkar_Toky_Tahmid_CV.pdf" download="Khandkar_Toky_Tahmid_CV.pdf" className="w-full sm:w-auto px-8 py-4 bg-surface border border-border hover:border-accent-orange text-text-main rounded-md font-bold transition-colors text-center">
                Download CV
              </a>
            </div>

            <div className="flex gap-5">
              <div className="bg-surface p-4 rounded-lg border border-border flex-1 text-center">
                <span className="text-2xl font-bold text-accent-orange block">2+</span>
                <span className="text-[0.7rem] text-text-muted uppercase tracking-[1px]">Experiences</span>
              </div>
              <div className="bg-surface p-4 rounded-lg border border-border flex-1 text-center">
                <span className="text-2xl font-bold text-accent-orange block">10+</span>
                <span className="text-[0.7rem] text-text-muted uppercase tracking-[1px]">Project done</span>
              </div>
              <div className="bg-surface p-4 rounded-lg border border-border flex-1 text-center">
                <span className="text-2xl font-bold text-accent-orange block">30+</span>
                <span className="text-[0.7rem] text-text-muted uppercase tracking-[1px]">Happy Clients</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 bg-surface rounded-full border border-border"></div>
              <img 
                src="/profile.jpg" 
                alt="Khandkar Toky Tahmid" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                className="absolute inset-0 w-full h-full object-cover rounded-full shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
