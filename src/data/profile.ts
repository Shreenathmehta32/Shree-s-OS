export const profile = {
    name: "Shreenath Mehta",
    title: "BTech CSE'28 | Cybersecurity & Offensive Security | AI & Automation | Full Stack",
    role: "Web Pentester & Security Researcher",
    focus: "Offensive Security (CTF · Web · API · OSINT)",
    tagline: "Build. Break. Understand. Secure.",
    mission: "Build.  Break.  Understand.  Secure.",
    status: "● Building & Learning (Active: CTF · Pentest · Build · Learn · Repeat)",
    location: "Udaipur, Rajasthan, India",
    email: "shreenath32s33@gmail.com",
    github: "https://github.com/Shreenathmehta32",
    linkedin: "https://www.linkedin.com/in/shreenath-mehta-b12880255/",
    twitter: "https://x.com/ShreeNm32",
    x: "https://x.com/ShreeNm32",
    summary: `B.Tech Computer Science Engineering student at Poornima Institute of Engineering & Technology with a deep focus on cybersecurity and offensive security. I spend my time breaking things to understand how they work — participating in CTFs, studying web application vulnerabilities, building security-oriented tools, and exploring the intersection of AI and automation. My work spans from penetration testing and vulnerability research to building privacy-first AI systems and Linux-based infrastructure tools. Concurrently a dedicated Core Team Webmaster at Udaan Aeromodelling Club applying practical robotics and web technologies. I believe in learning through doing: if it runs, it can be broken; if it can be broken, it can be secured.`,
};

export interface WorkItem {
    label: string;
    value: string;
    icon: string;
}

export const currentWork: WorkItem[] = [
    { label: "Learning", value: "Offensive Security / Web Application Pentesting", icon: "🛡️" },
    { label: "Practicing", value: "CTF Challenges & Vulnerability Research", icon: "🚩" },
    { label: "Building", value: "Privacy-first AI tools & Security automation", icon: "⚡" },
    { label: "Exploring", value: "AI Security, API Security & Linux Internals", icon: "🔍" },
    { label: "Writing", value: "Security notes, writeups & documentation", icon: "📝" },
];

export interface Achievement {
    year: string;
    title: string;
    highlight: string;
    badge: string;
    type: 'ctf' | 'hackathon' | 'hardware' | 'award' | 'conference';
    icon: string;
    description: string;
    details: string[];
}

export const achievements: Achievement[] = [
    {
        year: "2026",
        title: "SAS CTF 2026",
        highlight: "Global Rank #77 · India Rank #1 🇮🇳",
        badge: "India #1 🏆",
        type: "ctf",
        icon: "🚩",
        description: "Competed in SAS CTF 2026 against elite global teams, securing India Rank #1 and Global Rank #77 across web exploitation, cryptography, reverse engineering, and offensive security.",
        details: ["Global Rank: #77", "India Rank: #1", "Category: Offensive Security & CTF"]
    },
    {
        year: "2025",
        title: "Nebula Nexus Hackathon",
        highlight: "2nd Place 🥈 (ZERODAY CREW)",
        badge: "2nd Place",
        type: "hackathon",
        icon: "🥈",
        description: "Secured 2nd Place with team 'ZERODAY CREW' building innovative high-impact software under high-stakes competitive hackathon conditions.",
        details: ["Prize: 2nd Place", "Team: ZERODAY CREW", "Project: Space Telemetry & Dashboard"]
    },
    {
        year: "2025",
        title: "Manipal University Jaipur — Hardware Exhibition",
        highlight: "2nd Place 🥈",
        badge: "2nd Place",
        type: "hardware",
        icon: "🔧",
        description: "Awarded 2nd Place for building an ESP32-based hardware telemetry system with real-time API monitoring, buzzer triggers, and RGB status alerts.",
        details: ["Project: ESP32 Twitter Notifier", "Prize: 2nd Place", "Domain: IoT & Embedded Systems"]
    },
    {
        year: "2025",
        title: "VGU, Jaipur",
        highlight: "Consolation Prize 🏅",
        badge: "Awardee",
        type: "award",
        icon: "🎖️",
        description: "Recognized with a Consolation Prize for technical innovation, creative engineering, and project presentation excellence.",
        details: ["Prize: Consolation Prize", "Location: Jaipur, Rajasthan"]
    },
    {
        year: "2026",
        title: "BSides Jaipur 2026",
        highlight: "Security Conference Participation 🛡️",
        badge: "Conference",
        type: "conference",
        icon: "🌐",
        description: "Participated in BSides Jaipur 2026, engaging with industry cybersecurity practitioners, threat researchers, and attending offensive security briefings.",
        details: ["Event: BSides Jaipur 2026", "Focus: Cybersecurity & Threat Research"]
    },
];

export interface RoleItem {
    role: string;
    organization: string;
    type: string;
    description: string;
}

export const roles: RoleItem[] = [
    {
        role: "Freelance Web Pentester",
        organization: "Self-Employed",
        type: "Offensive Security",
        description: "Performing web application vulnerability assessments, identification of OWASP Top 10 security flaws, network auditing, and security automation.",
    },
    {
        role: "Core Team — Webmaster",
        organization: "Udaan Aeromodelling Club",
        type: "Robotics & Web Infrastructure",
        description: "Leading web presence, club portal, digital infrastructure, and robotics initiatives at Poornima Institute of Engineering & Technology.",
    },
];

export const skills = [
    // Offensive Security & Pentesting
    { name: "Web App Pentesting", level: 92, category: "security" },
    { name: "Burp Suite / Nmap / Wireshark", level: 90, category: "security" },
    { name: "CTF & Vulnerability Research", level: 88, category: "security" },
    { name: "API & Auth Security", level: 85, category: "security" },
    { name: "Security Automation (Python)", level: 88, category: "security" },
    { name: "OSINT & Cryptography", level: 80, category: "security" },

    // Systems & Cloud
    { name: "Linux (Ubuntu/Kali/Arch)", level: 92, category: "systems" },
    { name: "Bash / PowerShell / Zsh", level: 88, category: "systems" },
    { name: "AWS Cloud & Cron Pipelines", level: 80, category: "systems" },
    { name: "Git / GitHub", level: 92, category: "systems" },

    // AI & Automation
    { name: "Privacy-First Local AI", level: 88, category: "ai" },
    { name: "AI Automation Pipelines", level: 85, category: "ai" },
    { name: "Generative AI & LLMs", level: 90, category: "ai" },

    // Frontend
    { name: "React / Next.js", level: 90, category: "frontend" },
    { name: "TypeScript", level: 85, category: "frontend" },
    { name: "HTML / CSS", level: 95, category: "frontend" },
    { name: "Three.js / WebGL", level: 70, category: "frontend" },

    // Backend
    { name: "Python", level: 88, category: "backend" },
    { name: "Node.js", level: 75, category: "backend" },

    // Blockchain
    { name: "Solidity / Web3", level: 80, category: "blockchain" },
    { name: "Rust (Stellar)", level: 60, category: "blockchain" },

    // Hardware
    { name: "C++ / Arduino", level: 75, category: "hardware" },
    { name: "Robotics / IoT (ESP32)", level: 80, category: "hardware" },

    // Tools & Frameworks
    { name: "Vite / Webpack", level: 85, category: "tools" },
    { name: "Firebase / Supabase", level: 80, category: "tools" },
];

export const experience = [
    {
        role: "Full Stack Developer",
        company: "Todwal Infotech",
        location: "Jaipur, Rajasthan, India",
        duration: "January 2026 — Present",
        description: "Full stack engineering, building performant web applications, and implementing modern user interfaces and backend integrations.",
    },
    {
        role: "Freelance Web Pentester",
        company: "Self-Employed",
        location: "Remote",
        duration: "2025 — Present",
        description: "Assessing web application security postures, conducting OWASP Top 10 vulnerability checks, performing API penetration tests, and writing remediation reports.",
    },
    {
        role: "Core Team — Webmaster",
        company: "Udaan Aeromodelling Club",
        location: "PIET, Jaipur",
        duration: "August 2025 — Present",
        description: "Managing club website and digital platforms. Integrating aeromodelling projects with interactive web dashboards and managing telemetry platforms. Member since Dec 2024.",
    },
    {
        role: "Cybersecurity Intern",
        company: "Syntecxhub",
        location: "Remote",
        duration: "May 2025 — June 2025",
        description: "Developed cybersecurity utilities including multi-threaded port scanners, SQL injection assessment tools, CVE scanners, and encrypted TCP chat communications.",
    },
    {
        role: "Linux & AWS Cloud Intern",
        company: "Grras Solution",
        location: "Jaipur, Rajasthan, India",
        duration: "July 2025 — August 2025",
        description: "Administering Linux server environments, automating system backups via Cron scripts, deploying cloud infrastructure on AWS, and configuring monitoring dashboards.",
    },
    {
        role: "Research Intern — AI & Blockchain",
        company: "AI Labs / Digital Hammerr®",
        location: "Remote",
        duration: "June 2025 — July 2025",
        description: "Research on AI-Powered Healthcare Chatbots with Blockchain-secured Patient Data Management (MediChain), analyzing privacy-preserving data access and smart contracts.",
    },
    {
        role: "Open Source Contributor",
        company: "GirlScript Summer of Code",
        location: "Open Source",
        duration: "July 2025 — December 2025",
        description: "Contributing to open source repositories during GSSoC program, collaborating on bug fixes, feature enhancements, and documentation.",
    },
    {
        role: "Student Partner",
        company: "Internshala",
        location: "Jaipur, Rajasthan, India",
        duration: "January 2025 — March 2025",
        description: "Campus ambassador driving student engagement, organizing technical awareness sessions, and promoting skill development opportunities.",
    },
];

export const education = [
    {
        degree: "Bachelor of Technology — BTech (CSE)",
        institution: "Poornima Institute of Engineering & Technology",
        duration: "September 2024 — May 2028",
    },
    {
        degree: "Senior Secondary (Mathematics & Science)",
        institution: "MDS Senior Secondary School",
        duration: "May 2023 — May 2024",
    },
    {
        degree: "IIT-JEE Preparation",
        institution: "The Radiant Academy",
        duration: "2022 — 2023",
    },
];

export const certifications = [
    "What Is Generative AI?",
    "Generative AI: The Evolution of Thoughtful Online Search",
    "Streamlining Your Work with Microsoft Copilot",
    "Learning Microsoft 365 Copilot",
    "Introduction to Artificial Intelligence",
    "Cybersecurity & Penetration Testing — Syntecxhub",
    "Linux System Administration & AWS Cloud — Grras Solution",
];

export const securityConf = {
    tree: `Cybersecurity
├── Offensive Security
│   ├── Web Application Security
│   ├── API Security
│   └── Authentication & Authorization
├── Penetration Testing
├── CTF Competitions
├── Vulnerability Research
├── Cryptography
├── OSINT
└── Security Automation`,
    domains: [
        { name: "Web Application Security", desc: "OWASP Top 10, XSS, SQLi, CSRF, SSRF, Auth Bypasses" },
        { name: "API Security", desc: "REST & GraphQL testing, Broken Object Level Auth (BOLA)" },
        { name: "CTF & Exploit Labs", desc: "SAS CTF (India #1), Hack The Box, TryHackMe, PortSwigger" },
        { name: "Vulnerability Research", desc: "CVE tracking, patch analysis, proof-of-concept exploit scripting" },
        { name: "Network & Recon", desc: "Port scanning, service fingerprinting, Wireshark packet analysis, Nmap" },
        { name: "Security Automation", desc: "Python automated scanners, custom fuzzers, monitoring bots" },
    ],
};
