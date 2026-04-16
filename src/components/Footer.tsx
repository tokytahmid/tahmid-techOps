import { Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-dark py-12 border-t border-border px-10">
      <div className="max-w-7xl mx-auto text-center">
        <a href="/" className="inline-block mb-8">
          <img 
            src="/logo.png" 
            alt="KT Logo" 
            onError={(e) => { 
              e.currentTarget.style.display = 'none'; 
              const span = document.createElement('span');
              span.className = 'text-text-main font-extrabold text-2xl';
              span.innerHTML = 'KT<span class="text-accent-orange">.</span>';
              e.currentTarget.parentElement?.appendChild(span);
            }}
            className="h-12 w-auto object-contain mx-auto" 
          />
        </a>
        
        <nav className="flex flex-wrap justify-center gap-6 md:gap-8 mb-8">
          <a href="#home" className="text-text-muted hover:text-accent-orange transition-colors text-sm font-medium">Home</a>
          <a href="#services" className="text-text-muted hover:text-accent-orange transition-colors text-sm font-medium">Services</a>
          <a href="#about" className="text-text-muted hover:text-accent-orange transition-colors text-sm font-medium">About me</a>
          <a href="#portfolio" className="text-text-muted hover:text-accent-orange transition-colors text-sm font-medium">Portfolio</a>
          <a href="#contact" className="text-text-muted hover:text-accent-orange transition-colors text-sm font-medium">Contact me</a>
        </nav>

        <div className="flex items-center justify-center gap-4 mb-8">
          <a href="https://www.linkedin.com/in/toky-tahmid/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted hover:text-white hover:border-accent-orange transition-all">
            <Linkedin size={18} />
          </a>
          <a href="https://github.com/tokytahmid" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted hover:text-white hover:border-accent-orange transition-all">
            <Github size={18} />
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-text-muted text-sm mb-8">
          <a href="mailto:khandkartokytahmid@gmail.com" className="hover:text-white transition-colors">
            khandkartokytahmid@gmail.com
          </a>
          <a href="tel:+8801647236479" className="hover:text-white transition-colors">
            +8801647236479
          </a>
        </div>

        <p className="text-[#555] text-xs">
          © 2024 Khandkar Toky Tahmid. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
