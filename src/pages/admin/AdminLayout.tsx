import { Link, Outlet } from 'react-router-dom';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { Search } from 'lucide-react';

export default function AdminLayout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-main font-sans selection:bg-accent-orange selection:text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border min-h-screen flex flex-col hidden md:flex">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold font-mono tracking-tighter text-white">
              ADMIN<span className="text-accent-orange">PANEL</span>
            </span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className="block px-4 py-2 rounded-md hover:bg-border transition-colors text-text-muted hover:text-white">
            Dashboard
          </Link>
          <Link to="/admin/projects" className="block px-4 py-2 rounded-md hover:bg-border transition-colors text-text-muted hover:text-white">
            Projects
          </Link>
          <Link to="/admin/services" className="block px-4 py-2 rounded-md hover:bg-border transition-colors text-text-muted hover:text-white">
            Services
          </Link>
          <Link to="/admin/blog" className="block px-4 py-2 rounded-md hover:bg-border transition-colors text-text-muted hover:text-white">
            Blog Posts
          </Link>
          <Link to="/admin/users" className="block px-4 py-2 rounded-md hover:bg-border transition-colors text-text-muted hover:text-white">
            User Management
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-text-muted hover:text-white hover:bg-border rounded-md transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="flex items-center justify-between p-4 border-b border-border bg-surface">
          <div className="md:hidden flex-shrink-0 mr-4">
            <Link to="/admin" className="text-xl font-bold font-mono text-white">
              ADMIN<span className="text-accent-orange">PANEL</span>
            </Link>
          </div>
          
          <div className="flex-1 max-w-2xl w-full">
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-text-muted group-focus-within:text-accent-orange transition-colors" />
              </span>
              <input 
                type="text" 
                placeholder="Search projects, services, blog posts, users..." 
                className="w-full bg-bg-dark border border-border text-white text-sm rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-accent-orange transition-colors"
              />
            </div>
          </div>

          <div className="md:hidden flex-shrink-0 ml-4">
            <button onClick={handleLogout} className="text-sm text-text-muted hover:text-white">Logout</button>
          </div>
        </header>
        
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
