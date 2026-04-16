import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';

interface SkillItem {
  _id: string;
  name: string;
  percentage: number;
}

function SkillCircle({ skill }: { skill: SkillItem }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, skill.percentage, { duration: 1.5, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [isInView, skill.percentage, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center gap-2" ref={ref}>
      <div className="relative w-[50px] h-[50px] flex items-center justify-center">
        <svg width="50" height="50" viewBox="0 0 50 50" className="absolute inset-0 transform -rotate-90">
          <circle cx="25" cy="25" r={radius} stroke="var(--color-border)" strokeWidth="3" fill="none" />
          <motion.circle 
            cx="25" cy="25" r={radius} 
            stroke="var(--color-accent-orange)" 
            strokeWidth="3" 
            fill="none" 
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference - (skill.percentage / 100) * circumference } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="text-[0.7rem] font-bold text-text-main relative z-10">
          {displayValue}%
        </span>
      </div>
      <span className="text-[10px] text-text-muted uppercase text-center">{skill.name}</span>
    </div>
  );
}

export default function About() {
  const [skills, setSkills] = useState<SkillItem[]>([]);

  useEffect(() => {
    axios.get('/api/skills')
      .then(res => setSkills(res.data))
      .catch(err => console.error('Error fetching skills:', err));
  }, []);

  return (
    <section id="about" className="py-20 bg-bg-dark px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-[1.8rem] font-bold text-text-main">About Me</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="flex-1 relative">
            <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[4/5]">
              <div className="absolute inset-0 bg-surface rounded-xl border border-border"></div>
              <img 
                src="/profile.jpg" 
                alt="About Me" 
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }}
                className="absolute inset-0 w-full h-full object-cover rounded-xl mix-blend-luminosity opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <p className="text-text-muted leading-[1.6] mb-8 text-base">
              An IT Officer is a technology professional responsible for managing and maintaining an organization's IT infrastructure. They ensure that networks, servers, and computer systems run smoothly, securely, and efficiently to support business operations.
              <br/><br/>
              With a strong background in system administration, network troubleshooting, and technical support, I specialize in optimizing IT operations, implementing robust security protocols, and providing efficient solutions to complex technical challenges. My goal is to ensure seamless technological workflows for teams and organizations.
            </p>
            
            <div className="skill-section">
              <h3 className="text-[0.8rem] uppercase text-text-muted mb-[15px] tracking-[2px]">Expertise</h3>
              <div className="flex flex-wrap gap-[15px]">
                {skills.map((skill) => (
                  <SkillCircle key={skill._id} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
