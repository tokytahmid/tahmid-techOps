import { auth } from '../../lib/firebase';

export default function AdminUsers() {
  const currentUser = auth.currentUser;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Users</h1>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">User Management</h2>
        <p className="text-text-muted mb-4">
          For security reasons, Firebase does not allow listing all authentication users directly from the client application.
          To view all users, add new administrators, or manage access (like disabling accounts or changing passwords), please use the Firebase Authentication Console.
        </p>
        <a 
          href="https://console.firebase.google.com/project/_/authentication/users" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-block px-6 py-2 bg-accent-orange text-white rounded-md font-medium hover:bg-[#e64300] transition-colors"
        >
          Open Firebase Auth Console
        </a>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
         <h2 className="text-xl font-bold text-white mb-4">Current Active Session</h2>
         <div className="flex justify-between items-center p-4 bg-bg-dark border border-border rounded-lg">
            <div>
              <p className="font-medium text-white">{currentUser?.email || 'Unknown User'}</p>
              <p className="text-sm text-text-muted">Administrator</p>
            </div>
            <div>
               <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium border border-green-500/30">Active</span>
            </div>
         </div>
      </div>
    </div>
  );
}
