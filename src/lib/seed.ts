import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const PROJECTS = [
  { 
    title: 'Network Setup', 
    category: 'Networking', 
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Complete enterprise network infrastructure setup ensuring high availability, security, and seamless connectivity across multiple branch offices.',
    features: ['Router & Switch Configuration', 'Firewall & VPN Setup', 'VLAN Segmentation & Traffic Routing', 'Network Performance Monitoring'],
    techPic: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    title: 'Server Migration', 
    category: 'SysAdmin', 
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Seamless migration of legacy physical servers to a modern, scalable cloud infrastructure with zero data loss and minimal downtime.',
    features: ['Zero Downtime Migration Planning', 'Data Integrity Verification', 'Active Directory Integration', 'Post-migration Performance Optimization'],
    techPic: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    title: 'Security Audit', 
    category: 'Security', 
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Comprehensive security vulnerability assessment and penetration testing to identify and patch critical system weaknesses.',
    features: ['Vulnerability Scanning', 'Penetration Testing', 'Security Policy Review & Enforcement', 'Endpoint Protection Implementation'],
    techPic: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    title: 'Cloud Deployment', 
    category: 'Cloud', 
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Scalable cloud architecture deployment using AWS/Azure, optimizing costs while improving overall system reliability and uptime.',
    features: ['Auto-scaling Configuration', 'Load Balancing Setup', 'Cost Optimization & Resource Allocation', 'CI/CD Pipeline Integration'],
    techPic: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    title: 'Helpdesk System', 
    category: 'Support', 
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'Implementation of an automated IT ticketing and helpdesk system to streamline support requests and improve resolution times.',
    features: ['Automated Ticket Routing', 'SLA Management & Tracking', 'User Self-Service Portal', 'ITIL Best Practices Integration'],
    techPic: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

const SKILLS = [
  { name: 'SysAdmin', percentage: 95 },
  { name: 'Networking', percentage: 90 },
  { name: 'Security', percentage: 85 },
  { name: 'Hardware', percentage: 95 },
  { name: 'Support', percentage: 100 },
];

const SERVICES = [
  { 
    title: 'Network Management', 
    description: 'Designing, implementing, and maintaining robust network infrastructures.', 
    icon: 'Network',
    detailedDescription: 'End-to-end network management services ensuring your business stays connected. From initial architecture design to continuous monitoring and optimization, I provide scalable networking solutions that guarantee high availability and minimal latency.',
    features: ['LAN/WAN Architecture Design', 'Network Performance Monitoring', 'Bandwidth Optimization', 'Hardware Provisioning & Setup'],
    techPic: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    title: 'System Administration', 
    description: 'Managing servers, operating systems, and enterprise software solutions.', 
    icon: 'Server',
    detailedDescription: 'Comprehensive system administration to keep your servers and enterprise applications running smoothly. I handle OS deployments, patch management, user access controls, and system health monitoring to ensure optimal performance.',
    features: ['Linux & Windows Server Management', 'Active Directory & LDAP Setup', 'Automated Patch Management', 'System Health & Resource Monitoring'],
    techPic: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    title: 'IT Support', 
    description: 'Providing comprehensive technical support and troubleshooting for hardware and software.', 
    icon: 'Headset',
    detailedDescription: 'Reliable IT support services to resolve technical issues quickly and efficiently. Whether it is hardware troubleshooting, software configuration, or user assistance, I ensure your team experiences minimal downtime.',
    features: ['L1/L2/L3 Technical Support', 'Hardware Diagnostics & Repair', 'Software Installation & Configuration', 'Remote Desktop Assistance'],
    techPic: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    title: 'Cybersecurity', 
    description: 'Implementing security protocols, firewalls, and conducting system audits.', 
    icon: 'ShieldCheck',
    detailedDescription: 'Proactive cybersecurity measures to protect your critical data and infrastructure from evolving threats. I specialize in vulnerability assessments, firewall configurations, and implementing robust security policies.',
    features: ['Firewall & IDS/IPS Configuration', 'Vulnerability Assessments', 'Data Encryption & Access Control', 'Security Awareness Training'],
    techPic: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
];

export async function seedFirestore() {
  const projectsSnap = await getDocs(collection(db, 'projects'));
  if (projectsSnap.empty) {
    for (const p of PROJECTS) await addDoc(collection(db, 'projects'), p);
    console.log('Projects seeded');
  }

  const skillsSnap = await getDocs(collection(db, 'skills'));
  if (skillsSnap.empty) {
    for (const s of SKILLS) await addDoc(collection(db, 'skills'), s);
    console.log('Skills seeded');
  }

  const servicesSnap = await getDocs(collection(db, 'services'));
  if (servicesSnap.empty) {
    for (const serv of SERVICES) await addDoc(collection(db, 'services'), serv);
    console.log('Services seeded');
  }
}
