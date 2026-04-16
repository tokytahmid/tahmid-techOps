import express from 'express';
import { createServer as createViteServer } from 'vite';
import mongoose from 'mongoose';
import cors from 'cors';
import { MongoMemoryServer } from 'mongodb-memory-server';
import path from 'path';

// --- Mongoose Schemas ---
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String },
  description: { type: String },
  features: [{ type: String }],
  techPic: { type: String }
});

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
});

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // We'll store icon names
  detailedDescription: { type: String },
  features: [{ type: String }],
  techPic: { type: String }
});

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', ProjectSchema);
const Skill = mongoose.model('Skill', SkillSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Contact = mongoose.model('Contact', ContactSchema);

// --- Initial Data Seeding ---
async function seedDatabase() {
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      { 
        title: 'Network Setup', 
        category: 'Networking', 
        imageUrl: 'https://picsum.photos/seed/net1/600/400',
        description: 'Complete enterprise network infrastructure setup ensuring high availability, security, and seamless connectivity across multiple branch offices.',
        features: ['Router & Switch Configuration', 'Firewall & VPN Setup', 'VLAN Segmentation & Traffic Routing', 'Network Performance Monitoring'],
        techPic: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      { 
        title: 'Server Migration', 
        category: 'SysAdmin', 
        imageUrl: 'https://picsum.photos/seed/sys1/600/400',
        description: 'Seamless migration of legacy physical servers to a modern, scalable cloud infrastructure with zero data loss and minimal downtime.',
        features: ['Zero Downtime Migration Planning', 'Data Integrity Verification', 'Active Directory Integration', 'Post-migration Performance Optimization'],
        techPic: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      { 
        title: 'Security Audit', 
        category: 'Security', 
        imageUrl: 'https://picsum.photos/seed/sec1/600/400',
        description: 'Comprehensive security vulnerability assessment and penetration testing to identify and patch critical system weaknesses.',
        features: ['Vulnerability Scanning', 'Penetration Testing', 'Security Policy Review & Enforcement', 'Endpoint Protection Implementation'],
        techPic: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      { 
        title: 'Cloud Deployment', 
        category: 'Cloud', 
        imageUrl: 'https://picsum.photos/seed/cloud1/600/400',
        description: 'Scalable cloud architecture deployment using AWS/Azure, optimizing costs while improving overall system reliability and uptime.',
        features: ['Auto-scaling Configuration', 'Load Balancing Setup', 'Cost Optimization & Resource Allocation', 'CI/CD Pipeline Integration'],
        techPic: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      { 
        title: 'Helpdesk System', 
        category: 'Support', 
        imageUrl: 'https://picsum.photos/seed/sup1/600/400',
        description: 'Implementation of an automated IT ticketing and helpdesk system to streamline support requests and improve resolution times.',
        features: ['Automated Ticket Routing', 'SLA Management & Tracking', 'User Self-Service Portal', 'ITIL Best Practices Integration'],
        techPic: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      { 
        title: 'Data Backup', 
        category: 'SysAdmin', 
        imageUrl: 'https://picsum.photos/seed/sys2/600/400',
        description: 'Automated enterprise data backup and disaster recovery solution ensuring business continuity in case of critical failures.',
        features: ['Automated Daily & Weekly Backups', 'Offsite Cloud Replication', 'Rapid Recovery Testing', 'Ransomware Protection'],
        techPic: 'https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
    ]);
  }

  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.insertMany([
      { name: 'SysAdmin', percentage: 95 },
      { name: 'Networking', percentage: 90 },
      { name: 'Security', percentage: 85 },
      { name: 'Hardware', percentage: 95 },
      { name: 'Support', percentage: 100 },
    ]);
  }

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany([
      { 
        title: 'Network Management', 
        description: 'Designing, implementing, and maintaining robust network infrastructures.', 
        icon: 'Monitor',
        detailedDescription: 'End-to-end network management services ensuring your business stays connected. From initial architecture design to continuous monitoring and optimization, I provide scalable networking solutions that guarantee high availability and minimal latency.',
        features: ['LAN/WAN Architecture Design', 'Network Performance Monitoring', 'Bandwidth Optimization', 'Hardware Provisioning & Setup'],
        techPic: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      { 
        title: 'System Administration', 
        description: 'Managing servers, operating systems, and enterprise software solutions.', 
        icon: 'Layout',
        detailedDescription: 'Comprehensive system administration to keep your servers and enterprise applications running smoothly. I handle OS deployments, patch management, user access controls, and system health monitoring to ensure optimal performance.',
        features: ['Linux & Windows Server Management', 'Active Directory & LDAP Setup', 'Automated Patch Management', 'System Health & Resource Monitoring'],
        techPic: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      { 
        title: 'IT Support', 
        description: 'Providing comprehensive technical support and troubleshooting for hardware and software.', 
        icon: 'Smartphone',
        detailedDescription: 'Reliable IT support services to resolve technical issues quickly and efficiently. Whether it is hardware troubleshooting, software configuration, or user assistance, I ensure your team experiences minimal downtime.',
        features: ['L1/L2/L3 Technical Support', 'Hardware Diagnostics & Repair', 'Software Installation & Configuration', 'Remote Desktop Assistance'],
        techPic: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      { 
        title: 'Cybersecurity', 
        description: 'Implementing security protocols, firewalls, and conducting system audits.', 
        icon: 'Code',
        detailedDescription: 'Proactive cybersecurity measures to protect your critical data and infrastructure from evolving threats. I specialize in vulnerability assessments, firewall configurations, and implementing robust security policies.',
        features: ['Firewall & IDS/IPS Configuration', 'Vulnerability Assessments', 'Data Encryption & Access Control', 'Security Awareness Training'],
        techPic: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
    ]);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Initialize MongoDB Memory Server
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri);
  console.log('Connected to In-Memory MongoDB');
  
  await seedDatabase();
  console.log('Database seeded');

  // --- API Routes ---
  
  app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
  });

  app.get('/api/skills', async (req, res) => {
    const skills = await Skill.find();
    res.json(skills);
  });

  app.get('/api/services', async (req, res) => {
    const services = await Service.find();
    res.json(services);
  });

  app.post('/api/contact', async (req, res) => {
    try {
      const contact = new Contact(req.body);
      await contact.save();
      res.status(201).json({ message: 'Message sent successfully!' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to send message' });
    }
  });

  // Admin route to add a project
  app.post('/api/admin/projects', async (req, res) => {
    try {
      const project = new Project(req.body);
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ error: 'Failed to add project' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
