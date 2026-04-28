import { useState, useEffect } from 'react';
import { firebaseService } from '../../services/firebaseService';

export default function AdminDashboard() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', percentage: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const skillsData = await firebaseService.getSkills();
      setSkills(skillsData);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (skill: any) => {
    setEditingId(skill.id);
    setEditForm({ name: skill.name, percentage: skill.percentage });
  };

  const handleSave = async (id: string) => {
    try {
      await firebaseService.updateSkill(id, { name: editForm.name, percentage: Number(editForm.percentage) });
      setEditingId(null);
      await fetchData(); // Refresh data
    } catch (error: any) {
      alert("Failed to save. Note: Local fallback data cannot be edited. " + error.message);
    }
  };

  if (loading) {
    return <div className="text-white">Loading dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
      
      <div className="bg-surface border border-border rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Content Management</h2>
        <p className="text-text-muted mb-4">
          To modify all parts of the website without code, you can use the complete Database Dashboard.
          The skills editor below provides a quick way to edit skills.
        </p>
        <p className="text-text-muted mb-4">
          <strong>Full Database Link:</strong> <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-accent-orange hover:underline font-bold">Firebase Console</a>
        </p>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Your Skills</h2>
        <div className="space-y-4">
          {skills.map((skill, idx) => (
             <div key={skill.id || idx} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-bg-dark border border-border rounded-lg gap-4">
              {editingId === skill.id && !skill.id.startsWith('local-') ? (
                <>
                  <div className="flex-1 flex gap-4">
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                      className="flex-1 px-3 py-2 bg-surface border border-border rounded text-white"
                    />
                    <input 
                      type="number" 
                      value={editForm.percentage} 
                      onChange={e => setEditForm({...editForm, percentage: Number(e.target.value)})}
                      className="w-24 px-3 py-2 bg-surface border border-border rounded text-white"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleSave(skill.id)} className="px-4 py-2 bg-accent-orange text-white rounded text-sm hover:bg-[#e64300]">Save</button>
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-surface border border-border text-white rounded text-sm">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <p className="font-medium text-white">{skill.name}</p>
                    {skill.id.startsWith('local-') && <p className="text-xs text-red-400">Local data (Cannot edit without DB connection)</p>}
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-accent-orange font-bold">
                      {skill.percentage}%
                    </div>
                    {!skill.id.startsWith('local-') && (
                      <button onClick={() => handleEditClick(skill)} className="text-sm text-text-muted hover:text-white underline">
                        Edit
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
