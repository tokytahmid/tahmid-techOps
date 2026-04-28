import React, { useEffect, useState, useRef } from 'react';
import { firebaseService } from '../services/firebaseService';
import { motion, useInView, useMotionValue, useTransform, animate, useMotionValueEvent } from 'motion/react';

interface SkillItem {
  id: string;
  name: string;
  percentage: number;
}

const SkillCircle = ({ skill }: { skill: SkillItem }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, skill.percentage, { duration: 2, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [isInView, skill.percentage, count]);

  useMotionValueEvent(rounded, "change", (latest) => {
    setDisplayValue(latest);
  });

  const radius = 24;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex flex-col items-center gap-3" ref={ref}>
      <div className="relative w-[60px] h-[60px] flex items-center justify-center">
        <svg width="60" height="60" viewBox="0 0 60 60" className="absolute inset-0 transform -rotate-90">
          <circle cx="30" cy="30" r={radius} stroke="var(--color-border)" strokeWidth="4" fill="none" className="opacity-30" />
          <motion.circle 
            cx="30" cy="30" r={radius} 
            stroke="var(--color-accent-orange)" 
            strokeWidth="4" 
            fill="none" 
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: circumference - (skill.percentage / 100) * circumference } : { strokeDashoffset: circumference }}
            transition={{ duration: 2, ease: "easeOut" }}
            strokeLinecap="round"
            className="drop-shadow-[0_0_4px_rgba(200,122,85,0.4)]"
          />
        </svg>
        <span className="text-[0.75rem] font-bold text-text-main relative z-10 font-mono tracking-tighter">
          {displayValue}%
        </span>
      </div>
      <span className="text-[11px] text-text-muted font-medium uppercase tracking-wider text-center">{skill.name}</span>
    </div>
  );
}

export default function About() {
  const [skills, setSkills] = useState<SkillItem[]>([]);

  useEffect(() => {
    firebaseService.getSkills()
      .then(data => {
        if (data) setSkills(data as SkillItem[]);
      })
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
                className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <p className="text-text-muted leading-[1.6] mb-8 text-base">
              I am a versatile technology professional with a dual passion for building robust IT infrastructures and developing modern full-stack web applications. My background as an IT Officer has given me a deep understanding of network management, system administration, and cybersecurity, which I now integrate with my web development expertise.
              <br/><br/>
              I specialize in creating end-to-end digital solutions—from optimizing server architectures to crafting intuitive, data-driven web applications using React, Node.js, and modern cloud technologies. My goal is to bridge the gap between infrastructure and software, delivering seamless and secure technological workflows for modern organizations.
            </p>
            
            <div className="skill-section">
              <h3 className="text-[0.8rem] uppercase text-text-muted mb-[15px] tracking-[2px]">Expertise</h3>
              <div className="flex flex-wrap gap-[15px]">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                  >
                    <SkillCircle skill={skill} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
