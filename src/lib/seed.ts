import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export const PROJECTS = [
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
  },
  { 
    title: 'E-commerce Platform', 
    category: 'Full Stack', 
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'A robust e-commerce application with real-time inventory management, secure payment gateway integration, and a dynamic user dashboard.',
    features: ['React & Redux State Management', 'Node.js & Express Backend', 'Stripe Payment Integration', 'MongoDB for Scalable Data Storage'],
    techPic: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    title: 'Task Management API', 
    category: 'Backend', 
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    description: 'A RESTful API designed for high-performance task tracking, featuring JWT authentication and automated email notifications.',
    features: ['RESTful API Design', 'JWT Authentication & Authorization', 'Database Schema Optimization', 'Comprehensive API Documentation'],
    techPic: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
];

export const SKILLS = [
  { name: 'Network Administration', percentage: 95 },
  { name: 'System Administration', percentage: 90 },
  { name: 'Cybersecurity', percentage: 85 },
  { name: 'Hardware & Support', percentage: 95 },
  { name: 'HTML5 & CSS3', percentage: 95 },
  { name: 'JavaScript (ES6+)', percentage: 90 },
  { name: 'React.js', percentage: 90 },
  { name: 'Node.js & Express', percentage: 85 },
  { name: 'MongoDB', percentage: 80 },
];

export const SERVICES = [
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
  { 
    title: 'Full Stack Development', 
    description: 'Building end-to-end web applications with modern technologies.', 
    icon: 'Code',
    detailedDescription: 'Crafting responsive and high-performance web applications tailored to your business needs. My full-stack expertise covers everything from intuitive front-end designs to robust back-end architectures and scalable database management.',
    features: ['Modern Single Page Applications (SPA)', 'RESTful & GraphQL API Development', 'Responsive & Mobile-First Design', 'Performance Optimization & SEO'],
    techPic: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
];

export const BLOG_POSTS = [
  {
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends in React, full-stack frameworks, and AI integration for building modern applications.',
    content: 'Web development is evolving rapidly. With the rise of full-stack monolithic frameworks like Next.js and Remix, developers are rethinking how applications are built. But it doesn\'t stop there. AI integration is becoming standard, allowing developers to build responsive and intelligent interfaces faster than ever before. In this post, we explore modern deployment patterns and how the balance between server-side rendering and client-side interactivity is shifting.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Securing Your Enterprise Network',
    excerpt: 'Essential strategies for protecting your organization\'s infrastructure from modern cyber threats.',
    content: 'In today\'s digital landscape, network security is more critical than ever. Phishing attacks, ransomware, and insider threats are on the rise. Understanding how to implement robust firewall rules, network segmentation, and zero-trust principles is essential. This article breaks down practical steps for system administrators to safeguard enterprise networks against sophisticated vulnerabilities.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    title: 'Mastering React 19 Patterns',
    excerpt: 'Discover the new features in React 19 and how they simplify building interactive user interfaces with Concurrent Rendering and async transitions.',
    content: 'React 19 brings powerful new abstractions to the table. By embracing Server Components and Actions, developers can drastically simplify data mutations and state management. No longer do we have to wire up dozens of manual effect hooks to keep the UI in sync. In this deep dive, we look at real-world examples of migrating an enterprise dashboard to these new paradigms, resulting in a significantly reduced bundle size and a more resilient application.',
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  }
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

  const blogPostsSnap = await getDocs(collection(db, 'blogPosts'));
  if (blogPostsSnap.empty) {
    for (const post of BLOG_POSTS) {
      await addDoc(collection(db, 'blogPosts'), {
        ...post,
        createdAt: serverTimestamp()
      });
    }
    console.log('Blog posts seeded');
  }
}
