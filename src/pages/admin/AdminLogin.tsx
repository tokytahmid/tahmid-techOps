import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Link } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      // Auto-create for specific admin email during setup
      if ((err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') && email === 'tahmidtoky402@gmail.com') {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          // Optional: You could ask them to verify email, but we'll send it and just log them in
          await sendEmailVerification(userCredential.user);
        } catch (createErr: any) {
          console.error(createErr);
          setError('Failed to auto-create admin account or verify. Check console.');
        }
      } else {
        setError(err.message || 'Failed to login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
             <span className="text-2xl font-bold font-mono tracking-tighter text-white">
              Tahmid<span className="text-accent-orange">TechOps</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-text-muted text-sm">Sign in to manage your portfolio</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-bg-dark border border-border rounded-md focus:border-accent-orange focus:outline-none text-white transition-colors"
              required
              placeholder="admin@tahmidtechops.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-muted mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-bg-dark border border-border rounded-md focus:border-accent-orange focus:outline-none text-white transition-colors"
              required
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent-orange hover:bg-[#e64300] text-white rounded-md font-bold transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
