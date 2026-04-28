import { useState, useEffect } from 'react';
import { firebaseService } from '../../services/firebaseService';

export default function AdminServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const servicesData = await firebaseService.getServices();
      setServices(servicesData);
    } catch(err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Services</h1>
        <button className="px-4 py-2 bg-accent-orange text-white rounded-md font-bold hover:bg-[#e64300] transition-colors">
          Add New Service
        </button>
      </div>

      {loading ? (
        <div className="text-white">Loading services...</div>
      ) : (
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="space-y-4">
            {services.map((service, idx) => (
               <div key={service.id || idx} className="flex justify-between items-center p-4 bg-bg-dark border border-border rounded-lg">
                <div>
                  <p className="font-medium text-white">{service.title}</p>
                  {service.id?.startsWith('local-') && <p className="text-xs text-red-400">Local data (Cannot edit without DB connection)</p>}
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-surface border border-border text-white rounded text-sm hover:text-accent-orange transition-colors">Edit</button>
                  <button className="px-3 py-1 bg-surface border border-red-500/30 text-red-400 rounded text-sm hover:bg-red-500/10 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
