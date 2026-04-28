import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Services', href: '/#services' },
    { name: 'About me', href: '/#about' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact me', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg-dark border-b border-border py-5 px-10 flex justify-between items-center">
      <div className="flex-shrink-0">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center">
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
            className="h-10 w-auto object-contain" 
          />
        </Link>
      </div>
      
      {/* Desktop Menu */}
      <nav className="hidden md:flex">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.href || location.hash === link.href.replace('/', '');
          return (
            <Link
              key={link.name}
              to={link.href}
              className={`ml-6 text-[0.9rem] font-medium no-underline transition-colors ${isActive ? 'text-accent-orange' : 'text-text-muted hover:text-accent-orange'}`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="hidden md:block">
        <Link
          to="/#contact"
          className="bg-accent-orange hover:bg-[#e64300] text-white px-6 py-2.5 rounded-md font-medium transition-colors"
        >
          Hire Me
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-text-muted hover:text-white p-2"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-bg-dark border-b border-border md:hidden">
          <div className="px-4 py-4 space-y-4 flex flex-col">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || location.hash === link.href.replace('/', '');
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-[0.9rem] font-medium no-underline transition-colors ${isActive ? 'text-accent-orange' : 'text-text-muted hover:text-accent-orange'}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/#contact"
              onClick={() => setIsOpen(false)}
              className="inline-block px-6 py-2.5 bg-accent-orange text-white rounded-md font-medium text-center"
            >
              Hire Me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
