import { useEffect, useState } from 'react';
import axios from 'axios';
import { Smartphone, Monitor, Layout, PenTool, Figma, Code, X, CheckCircle2, Network, Server, Headset, ShieldCheck } from 'lucide-react';

const iconMap: Record<string, any> = {
  Smartphone, Monitor, Layout, PenTool, Figma, Code, Network, Server, Headset, ShieldCheck
};

const titleIconMap: Record<string, any> = {
  'Network Management': Network,
  'System Administration': Server,
  'IT Support': Headset,
  'Cybersecurity': ShieldCheck
};

interface ServiceItem {
  _id: string;
  title: string;
  description: string;
  icon: string;
  detailedDescription?: string;
  features?: string[];
  techPic?: string;
}

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    axios.get('/api/services')
      .then(res => setServices(res.data))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  return (
    <section id="services" className="py-20 bg-bg-dark px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-[1.8rem] font-bold text-text-main">Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => {
            const IconComponent = titleIconMap[service.title] || iconMap[service.icon] || Layout;
            return (
              <div 
                key={service._id} 
                className="bg-surface p-4 rounded-lg border-l-[3px] border-accent-orange border-y border-r border-y-border border-r-border hover:bg-[#222] transition-colors cursor-pointer group relative overflow-hidden"
                onClick={() => setSelectedService(service)}
              >
                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <IconComponent size={20} className="text-accent-orange group-hover:scale-110 transition-transform" />
                  <h3 className="text-[0.9rem] font-bold text-text-main group-hover:text-accent-orange transition-colors">{service.title}</h3>
                </div>
                <p className="text-text-muted text-[0.75rem] leading-relaxed relative z-10">
                  {service.description}
                </p>
                
                {/* Hover Indicator */}
                <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-accent-orange text-xs font-bold flex items-center gap-1">
                  <span>Details</span>
                  <span className="text-lg leading-none">&rarr;</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          ></div>
          
          <div className="relative bg-bg-dark border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-accent-orange text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
            >
              <X size={20} />
            </button>

            <div className="w-full h-64 sm:h-80 relative bg-surface">
              <img 
                src={selectedService.techPic || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
                alt={selectedService.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full flex items-end gap-4">
                <div className="w-16 h-16 rounded-xl bg-accent-orange flex items-center justify-center text-white shrink-0 shadow-lg">
                  {(() => {
                    const ModalIcon = titleIconMap[selectedService.title] || iconMap[selectedService.icon] || Layout;
                    return <ModalIcon size={32} />;
                  })()}
                </div>
                <div>
                  <div className="text-accent-orange text-sm font-bold tracking-wider uppercase mb-1">
                    Service Area
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white">
                    {selectedService.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h4 className="text-xl font-bold text-text-main mb-4 border-b border-border pb-2">Service Overview</h4>
                <p className="text-text-muted leading-relaxed mb-8">
                  {selectedService.detailedDescription || selectedService.description}
                </p>

                {selectedService.features && selectedService.features.length > 0 && (
                  <>
                    <h4 className="text-xl font-bold text-text-main mb-4 border-b border-border pb-2">What's Included</h4>
                    <ul className="space-y-3">
                      {selectedService.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-text-muted">
                          <CheckCircle2 className="text-accent-orange shrink-0 mt-0.5" size={18} />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              <div className="w-full md:w-64 shrink-0">
                <div className="bg-surface border border-border rounded-xl p-6">
                  <h4 className="font-bold text-text-main mb-4">Need this service?</h4>
                  <p className="text-sm text-text-muted mb-6">
                    Let's discuss how I can help optimize your IT infrastructure and operations.
                  </p>
                  <a 
                    href="#contact" 
                    onClick={() => setSelectedService(null)}
                    className="flex items-center justify-center w-full py-3 bg-accent-orange hover:bg-[#e64300] text-white rounded-lg font-medium transition-colors"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
