import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react';

type RoleKey = 'software-dev' | 'fullstack' | 'cybersecurity' | 'uiux' | 'devops';

const roadmaps: Record<RoleKey, {
    title: string;
    icon: string;
    description: string;
    color: string;
    phases: { title: string; skills: { name: string; type: string; done?: boolean }[] }[];
}> = {
    'software-dev': {
        title: 'Software Developer',
        icon: '💻',
        description: 'Master core CS fundamentals, DSA, and build scalable software.',
        color: 'from-orange-500 to-red-500',
        phases: [
            {
                title: 'Phase 1: Foundations', skills: [
                    { name: 'Programming Basics (C/C++/Java)', type: 'Core', done: true },
                    { name: 'Data Structures & Algorithms', type: 'Core', done: true },
                    { name: 'OOP Concepts', type: 'Core', done: true },
                    { name: 'OS & DBMS Basics', type: 'Core' },
                ]
            },
            {
                title: 'Phase 2: Intermediate', skills: [
                    { name: 'System Design Basics', type: 'Design' },
                    { name: 'Problem Solving (LeetCode 200+)', type: 'Practice' },
                    { name: 'Git & Version Control', type: 'Tool' },
                    { name: 'REST APIs', type: 'Backend' },
                ]
            },
            {
                title: 'Phase 3: Advanced', skills: [
                    { name: 'Competitive Programming', type: 'Practice' },
                    { name: 'Design Patterns', type: 'Core' },
                    { name: 'Microservices Architecture', type: 'Design' },
                    { name: 'Cloud Basics (AWS/GCP)', type: 'Cloud' },
                ]
            },
        ],
    },
    'fullstack': {
        title: 'Full Stack Developer',
        icon: '🌐',
        description: 'Build complete web apps from frontend to backend and deployment.',
        color: 'from-blue-500 to-cyan-500',
        phases: [
            {
                title: 'Phase 1: Frontend', skills: [
                    { name: 'HTML, CSS, JavaScript', type: 'Core', done: true },
                    { name: 'React.js / Vue.js', type: 'Framework', done: true },
                    { name: 'Tailwind CSS', type: 'Styling' },
                    { name: 'TypeScript', type: 'Language' },
                ]
            },
            {
                title: 'Phase 2: Backend', skills: [
                    { name: 'Node.js + Express', type: 'Backend' },
                    { name: 'SQL & NoSQL Databases', type: 'Database' },
                    { name: 'REST API Design', type: 'API' },
                    { name: 'Authentication (JWT/OAuth)', type: 'Security' },
                ]
            },
            {
                title: 'Phase 3: DevOps & Deploy', skills: [
                    { name: 'Docker & Containers', type: 'DevOps' },
                    { name: 'CI/CD Pipelines', type: 'DevOps' },
                    { name: 'Cloud Deployment (Vercel/AWS)', type: 'Cloud' },
                    { name: 'System Design', type: 'Architecture' },
                ]
            },
        ],
    },
    'cybersecurity': {
        title: 'Cybersecurity Engineer',
        icon: '🛡️',
        description: 'Protect systems from threats with ethical hacking and security skills.',
        color: 'from-green-500 to-emerald-500',
        phases: [
            {
                title: 'Phase 1: Networking & OS', skills: [
                    { name: 'Networking Fundamentals (TCP/IP)', type: 'Core', done: true },
                    { name: 'Linux Administration', type: 'OS', done: true },
                    { name: 'Cryptography Basics', type: 'Security' },
                    { name: 'Web Technologies', type: 'Foundation' },
                ]
            },
            {
                title: 'Phase 2: Security Tools', skills: [
                    { name: 'Kali Linux & Metasploit', type: 'Tool' },
                    { name: 'Wireshark & Nmap', type: 'Tool' },
                    { name: 'OWASP Top 10', type: 'Knowledge' },
                    { name: 'Penetration Testing Basics', type: 'Practice' },
                ]
            },
            {
                title: 'Phase 3: Specialization', skills: [
                    { name: 'CEH / CompTIA Security+', type: 'Certification' },
                    { name: 'SOC & SIEM Tools', type: 'Enterprise' },
                    { name: 'Cloud Security', type: 'Cloud' },
                    { name: 'Incident Response', type: 'Practice' },
                ]
            },
        ],
    },
    'uiux': {
        title: 'UI/UX Designer',
        icon: '🎨',
        description: 'Create beautiful, user-centered designs using modern design principles.',
        color: 'from-purple-500 to-pink-500',
        phases: [
            {
                title: 'Phase 1: Design Principles', skills: [
                    { name: 'Design Theory & Color', type: 'Theory', done: true },
                    { name: 'Typography & Hierarchy', type: 'Theory', done: true },
                    { name: 'User Research Methods', type: 'UX' },
                    { name: 'Information Architecture', type: 'UX' },
                ]
            },
            {
                title: 'Phase 2: Tools & Practice', skills: [
                    { name: 'Figma (Master Level)', type: 'Tool' },
                    { name: 'Wireframing & Prototyping', type: 'Practice' },
                    { name: 'Design Systems', type: 'Advanced' },
                    { name: 'Usability Testing', type: 'Research' },
                ]
            },
            {
                title: 'Phase 3: Portfolio & Scale', skills: [
                    { name: 'Portfolio Development', type: 'Career' },
                    { name: 'Motion Design (AE/Lottie)', type: 'Advanced' },
                    { name: 'Accessibility (WCAG)', type: 'Standard' },
                    { name: 'Design to Dev Handoff', type: 'Communication' },
                ]
            },
        ],
    },
    'devops': {
        title: 'DevOps Engineer',
        icon: '⚙️',
        description: 'Bridge development and operations with automation and cloud infrastructure.',
        color: 'from-yellow-500 to-orange-500',
        phases: [
            {
                title: 'Phase 1: Foundations', skills: [
                    { name: 'Linux & Shell Scripting', type: 'Core', done: true },
                    { name: 'Git & Version Control', type: 'Tool', done: true },
                    { name: 'Python/GoLang Basics', type: 'Language' },
                    { name: 'Networking Fundamentals', type: 'Core' },
                ]
            },
            {
                title: 'Phase 2: CI/CD & Containers', skills: [
                    { name: 'Docker & Docker Compose', type: 'Container' },
                    { name: 'Kubernetes (K8s)', type: 'Orchestration' },
                    { name: 'Jenkins / GitHub Actions', type: 'CI/CD' },
                    { name: 'Terraform (IaC)', type: 'IaC' },
                ]
            },
            {
                title: 'Phase 3: Cloud & Monitoring', skills: [
                    { name: 'AWS / GCP / Azure', type: 'Cloud' },
                    { name: 'Prometheus & Grafana', type: 'Monitoring' },
                    { name: 'ELK Stack', type: 'Logging' },
                    { name: 'SRE Practices', type: 'Advanced' },
                ]
            },
        ],
    },
};

const pathLinks = [
    { to: '/path/software-dev', label: 'Software Dev', icon: '💻' },
    { to: '/path/fullstack', label: 'Full Stack', icon: '🌐' },
    { to: '/path/cybersecurity', label: 'Cybersecurity', icon: '🛡️' },
    { to: '/path/uiux', label: 'UI / UX', icon: '🎨' },
    { to: '/path/devops', label: 'DevOps', icon: '⚙️' },
];

const typeColors: Record<string, string> = {
    Core: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Framework: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Practice: 'bg-green-500/10 text-green-400 border-green-500/20',
    Tool: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    Cloud: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    Default: 'bg-muted text-muted-foreground border-border',
};

const RolePaths = () => {
    const { role } = useParams<{ role: RoleKey }>();
    const current = role && roadmaps[role] ? roadmaps[role] : roadmaps['software-dev'];

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-xl font-bold text-foreground">Role-Based Paths 🗺️</h2>
                <p className="text-sm text-muted-foreground">Step-by-step roadmaps for placement-ready career tracks</p>
            </div>

            {/* Role selector */}
            <div className="flex gap-2 flex-wrap">
                {pathLinks.map((p) => (
                    <Link
                        key={p.to}
                        to={p.to}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${role && p.to.endsWith(role)
                                ? 'bg-orange-500/15 border-orange-500/30 text-orange-400'
                                : 'bg-card border-border text-muted-foreground hover:border-orange-500/20'
                            }`}
                    >
                        {p.icon} {p.label}
                    </Link>
                ))}
            </div>

            {/* Roadmap Hero */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${current.color} rounded-2xl p-6 text-white`}>
                <div className="text-5xl mb-3">{current.icon}</div>
                <h3 className="text-2xl font-bold">{current.title}</h3>
                <p className="text-white/80 text-sm mt-1">{current.description}</p>
                <div className="mt-4 flex gap-3 flex-wrap">
                    <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-1.5 text-xs font-semibold">
                        {current.phases.length * 4} Skills
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-1.5 text-xs font-semibold">
                        {current.phases.length} Phases
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-1.5 text-xs font-semibold">
                        3-6 Months
                    </div>
                </div>
            </div>

            {/* Roadmap Phases */}
            <div className="space-y-4">
                {current.phases.map((phase, pi) => (
                    <div key={phase.title} className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/30">
                            <div className="w-7 h-7 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                {pi + 1}
                            </div>
                            <h4 className="font-semibold text-foreground">{phase.title}</h4>
                            <span className="ml-auto text-xs text-muted-foreground">{phase.skills.filter(s => s.done).length}/{phase.skills.length} done</span>
                        </div>
                        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {phase.skills.map((skill) => (
                                <div key={skill.name} className={`flex items-center gap-3 p-3 rounded-xl border ${skill.done ? 'border-green-500/20 bg-green-500/5' : 'border-border bg-muted/20'} transition-colors`}>
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${skill.done ? 'bg-green-500 border-green-500' : 'border-border'}`}>
                                        {skill.done && <span className="text-white text-[10px]">✓</span>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-medium text-foreground truncate">{skill.name}</div>
                                    </div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${typeColors[skill.type] || typeColors.Default}`}>
                                        {skill.type}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RolePaths;
