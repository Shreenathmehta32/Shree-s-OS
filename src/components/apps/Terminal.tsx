import React, { useState, useRef, useEffect, useCallback } from 'react';
import { profile, skills, experience, education, certifications, achievements, currentWork, roles, securityConf } from '../../data/profile';
import { projects } from '../../data/projects';

// ═══════════════════════  VIRTUAL FILE SYSTEM  ═══════════════════════
interface FSNode {
    type: 'file' | 'dir';
    content?: string;
    children?: Record<string, FSNode>;
}

const buildFS = (): FSNode => ({
    type: 'dir',
    children: {
        home: {
            type: 'dir',
            children: {
                shreenath: {
                    type: 'dir',
                    children: {
                        'about.txt': {
                            type: 'file',
                            content: `╔══════════════════════════════════════════════════════════════╗
║               ABOUT — Shreenath Mehta                        ║
║     Cybersecurity • Offensive Security • AI & Automation     ║
╚══════════════════════════════════════════════════════════════╝

${profile.title}
📍 Location: ${profile.location}
🛡️ Role:     ${profile.role}
⚡ Status:   ${profile.status}
🎯 Mission:  ${profile.mission}

${profile.summary}
`,
                        },
                        'security.conf': {
                            type: 'file',
                            content: `Cybersecurity
├── Offensive Security
│   ├── Web Application Security
│   ├── API Security
│   └── Authentication & Authorization
├── Penetration Testing
├── CTF Competitions
├── Vulnerability Research
├── Cryptography
├── OSINT
└── Security Automation
`,
                        },
                        'current-work.txt': {
                            type: 'file',
                            content: `[+] Learning   →  Offensive Security / Web Application Pentesting
[+] Practicing →  CTF Challenges & Vulnerability Research
[+] Building   →  Privacy-first AI tools & Security automation
[+] Exploring  →  AI Security, API Security & Linux Internals
[+] Writing    →  Security notes, writeups & documentation
`,
                        },
                        'achievements.log': {
                            type: 'file',
                            content: `[2026] SAS CTF 2026
       ├── Global Rank : #77
       └── India Rank  : #1 🇮🇳

[2025] Nebula Nexus Hackathon
       ├── Prize  : 2nd Place 🥈
       └── Team   : ZERODAY CREW

[2025] Manipal University Jaipur — Hardware Exhibition
       └── Prize  : 2nd Place 🥈 (ESP32 Notifier)

[2025] VGU, Jaipur
       └── Prize  : Consolation Prize 🏅

[2026] BSides Jaipur 2026
       └── Event  : Conference Participation 🛡️
`,
                        },
                        'experience.log': {
                            type: 'file',
                            content: `[ROLE]  Full Stack Developer
         Org    : Todwal Infotech
         Period : Jan 2026 — Present

[ROLE]  Freelancer
         Role   : Web Pentester
         Focus  : Web & API Security Audits

[ROLE]  Udaan Aeromodelling Club
         Role   : Core Team — Webmaster

[INTERN] Research Internship
         Org    : AI Labs / Digital Hammerr®
         Topic  : AI-Powered Healthcare Chatbots with
                  Blockchain-secured Patient Data Management

[INTERN] Grras Solution
         Topic  : Linux & AWS Cloud

[INTERN] Syntecxhub
         Topic  : Cybersecurity (CVE & Port Scanners, SQLi, Chat App)

[INTERN] GirlScript Summer of Code (GSSoC)
         Topic  : Open Source Contributor
`,
                        },
                        'roles.txt': {
                            type: 'file',
                            content: `[ROLE]  Udaan Aeromodelling Club
        └── Webmaster & Core Team (Robotics & Web)

[ROLE]  Freelancer
        └── Web Pentester (Offensive Security)
`,
                        },
                        'resume.pdf': {
                            type: 'file',
                            content: `[Binary file — resume.pdf]

To view the resume, use the Resume app on the desktop
or run:  open resume`,
                        },
                        'skills.json': {
                            type: 'file',
                            content: JSON.stringify(
                                {
                                    _comment: 'Shreenath Mehta — Technical & Security Skills',
                                    security: skills.filter(s => s.category === 'security'),
                                    systems: skills.filter(s => s.category === 'systems'),
                                    ai: skills.filter(s => s.category === 'ai'),
                                    frontend: skills.filter(s => s.category === 'frontend'),
                                    backend: skills.filter(s => s.category === 'backend'),
                                    blockchain: skills.filter(s => s.category === 'blockchain'),
                                    hardware: skills.filter(s => s.category === 'hardware'),
                                    tools: skills.filter(s => s.category === 'tools'),
                                },
                                null,
                                2
                            ),
                        },
                        'contact.txt': {
                            type: 'file',
                            content: `╔══════════════════════════════════════════╗
║             CONTACT INFO                 ║
╚══════════════════════════════════════════╝

📧  Email:    ${profile.email}
🔗  LinkedIn: ${profile.linkedin}
🐙  GitHub:   ${profile.github}
𝕏   Twitter:  ${profile.x}
📍  Location: ${profile.location}
`,
                        },
                        '.bashrc': {
                            type: 'file',
                            content: `# ~/.bashrc — Shree's OS
export PS1="\\u@portfolio:\\w\\$ "
export EDITOR=nano
alias ll='ls -la'
alias cls='clear'
alias hack='echo "Access Granted. CTF Flag: FLAG{s4s_ctf_ind1a_#1}"'
alias ctf='achievements'
neofetch`,
                        },
                        '.secret': {
                            type: 'file',
                            content: `🎉 You found the secret file!

Easter egg: Run "sudo hire-me" for a surprise.
Flag: FLAG{0ffens1ve_sec_bu1ld_br3ak_und3rstand_s3cure}

"The only way to do great work is to love what you do."
— Steve Jobs`,
                        },
                        projects: {
                            type: 'dir',
                            children: Object.fromEntries(
                                projects.map((p) => [
                                    p.name,
                                    {
                                        type: 'dir' as const,
                                        children: {
                                            'README.md': {
                                                type: 'file' as const,
                                                content: `# ${p.displayName}\n\n${p.description}\n\n🔗 GitHub: ${p.githubUrl}${p.liveUrl ? `\n🌐 Live:   ${p.liveUrl}` : ''}\n📦 Language: ${p.language}\n🏷️ Category: ${p.category}\n`,
                                            },
                                        },
                                    },
                                ])
                            ),
                        },
                        documents: {
                            type: 'dir',
                            children: {
                                'certifications.txt': {
                                    type: 'file',
                                    content: `╔══════════════════════════════════════════╗
║           CERTIFICATIONS                 ║
╚══════════════════════════════════════════╝

${certifications.map((c, i) => `  ${i + 1}. 📜 ${c}`).join('\n')}
`,
                                },
                                'education.txt': {
                                    type: 'file',
                                    content: `╔══════════════════════════════════════════╗
║             EDUCATION                    ║
╚══════════════════════════════════════════╝

${education.map((e) => `  🎓 ${e.degree}\n     ${e.institution}\n     ${e.duration}\n`).join('\n')}`,
                                },
                                'experience.txt': {
                                    type: 'file',
                                    content: `╔══════════════════════════════════════════╗
║          WORK EXPERIENCE                 ║
╚══════════════════════════════════════════╝

${experience.map((e) => `  💼 ${e.role}\n     ${e.company} • ${e.location}\n     ${e.duration}\n     ${e.description}\n`).join('\n')}`,
                                },
                            },
                        },
                    },
                },
            },
        },
        etc: {
            type: 'dir',
            children: {
                hostname: { type: 'file', content: 'portfolio' },
                os_release: {
                    type: 'file',
                    content: `NAME="Shree's OS"\nVERSION="2.0.26 LTS"\nID=shreeos\nPRETTY_NAME="Shree's OS 2.0.26 LTS"`,
                },
            },
        },
        usr: {
            type: 'dir',
            children: {
                bin: {
                    type: 'dir',
                    children: {},
                },
            },
        },
    },
});

const resolvePath = (fs: FSNode, parts: string[]): FSNode | null => {
    let node: FSNode = fs;
    for (const p of parts) {
        if (p === '' || p === '.') continue;
        if (node.type !== 'dir' || !node.children?.[p]) return null;
        node = node.children[p];
    }
    return node;
};

const normalizePath = (cwd: string[], rel: string): string[] => {
    const segs = rel.startsWith('/') ? rel.split('/') : [...cwd, ...rel.split('/')];
    const out: string[] = [];
    for (const s of segs) {
        if (s === '' || s === '.') continue;
        if (s === '..') out.pop();
        else out.push(s);
    }
    return out;
};

// ═══════════════════════  AVAILABLE COMMANDS  ═══════════════════════
const ALL_COMMANDS = [
    'help', 'whoami', 'about', 'skills', 'projects', 'experience', 'education',
    'certs', 'achievements', 'security', 'current-work', 'roles', 'status',
    'service', 'ctf', 'contact', 'neofetch', 'clear', 'ls', 'cd', 'cat',
    'pwd', 'mkdir', 'tree', 'echo', 'date', 'uptime', 'open', 'sudo',
    'apt', 'pip', 'history', 'cowsay', 'fortune', 'man',
];

// ═══════════════════════  FAKE PACKAGE LISTS  ═══════════════════════
const APT_PACKAGES: Record<string, string> = {
    'burpsuite': 'Burp Suite Professional 2026.1',
    'nmap': 'Nmap 7.95 (Network Exploration & Security Auditing)',
    'wireshark': 'Wireshark 4.2.4 (Network Protocol Analyzer)',
    'metasploit': 'Metasploit Framework 6.4.1',
    'sqlmap': 'sqlmap 1.8.3 (Automatic SQL Injection Tool)',
    'react': 'React 19.0.0',
    'typescript': 'TypeScript 5.7.2',
    'vite': 'Vite 7.3.1',
    'nodejs': 'Node.js 22.0.0',
    'three.js': 'Three.js 0.160.0',
    'solidity': 'Solidity 0.8.24',
    'rust': 'Rust 1.77.0',
    'python3': 'Python 3.12.2',
    'neovim': 'Neovim 0.10.0',
    'docker': 'Docker 26.0.0',
    'git': 'Git 2.44.0',
    'hacking-skills': 'Ethical Hacking Toolkit 4.2.0',
};

const PIP_PACKAGES: Record<string, string> = {
    'focusorm': 'FocusORM 1.0.0 (Local-First AI Productivity)',
    'onyx': 'ONYX 1.0 (Privacy-First On-Device AI Assistant)',
    'scapy': 'Scapy 2.5.0 (Packet Manipulation Tool)',
    'requests': 'Requests 2.31.0',
    'cryptography': 'Cryptography 42.0.5',
    'pwntools': 'pwntools 4.12.0 (CTF Framework & Exploit Dev)',
    'beautifulsoup4': 'BeautifulSoup4 4.12.3',
    'flask': 'Flask 3.0.2',
    'fastapi': 'FastAPI 0.110.0',
    'openai': 'OpenAI SDK 1.12.0',
};

const FORTUNES = [
    '"Build. Break. Understand. Secure." — Shreenath Mehta',
    '"If it runs, it can be broken; if it can be broken, it can be secured."',
    '"The best way to predict the future is to invent it." — Alan Kay',
    '"Talk is cheap. Show me the code." — Linus Torvalds',
    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
    '"First, solve the problem. Then, write the code." — John Johnson',
    '"The only way to learn a new programming language is by writing programs in it." — Dennis Ritchie',
    '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
    '"Simplicity is the soul of efficiency." — Austin Freeman',
];

// ═══════════════════════  COMPONENT  ═══════════════════════
export interface TerminalProps {
    shortcutCommand?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ shortcutCommand }) => {
    const [lines, setLines] = useState<{ type: 'input' | 'output'; content: string }[]>([
        {
            type: 'output',
            content: `Welcome to <span class="highlight">Shree's OS v2.0.26 LTS</span> (GNU/Linux 6.8.0-generic x86_64)\n\nType <span class="highlight">help</span> to see available commands.\nType <span class="highlight">achievements</span> or <span class="highlight">security</span> to explore offensive security records.\nType <span class="highlight">ls</span> to explore the file system.\n`,
        },
    ]);
    const [currentInput, setCurrentInput] = useState('');
    const [cmdHistory, setCmdHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [cwd, setCwd] = useState<string[]>(['home', 'shreenath']);
    const [fs] = useState<FSNode>(buildFS);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [lines, scrollToBottom]);

    const cwdStr = () => '/' + cwd.join('/');
    const shortCwd = () => {
        const full = cwdStr();
        return full.replace('/home/shreenath', '~');
    };

    const prompt = () =>
        `<span class="terminal-prompt">shreenath</span><span class="terminal-at">@</span><span class="terminal-path">portfolio</span><span class="terminal-symbol">:${shortCwd()}$ </span>`;

    // ────── COMMAND PROCESSOR ──────
    const processCommand = (raw: string) => {
        const trimmed = raw.trim();
        if (!trimmed) {
            setLines((p) => [...p, { type: 'input', content: '' }]);
            return;
        }

        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        let output = '';

        switch (cmd) {
            // ──── help ────
            case 'help':
                output = `
<span class="highlight">┌─────────────────────────────────────────────────────────┐</span>
<span class="highlight">│             Shree's OS — Command Reference              │</span>
<span class="highlight">└─────────────────────────────────────────────────────────┘</span>

  <span class="success">Navigation</span>
    ls [path]         List directory contents
    cd [path]         Change directory
    pwd               Print working directory
    cat [file]        Display file contents
    tree [path]       Show directory tree
    mkdir [name]      Create directory

  <span class="success">Cybersecurity & Profile</span>
    whoami            Show user identity & offensive security focus
    security          Display cybersecurity hierarchy & domains
    achievements      Show CTFs, hackathons & competition awards
    ctf               SAS CTF 2026 rankings & highlights
    current-work      Active focus (learning, building, exploring)
    roles             Current leadership & pentesting roles
    status / service  systemctl status of shreenath.service
    about             Bio, manifesto, and summary
    skills            Technical & offensive security skills
    projects          Showcase of projects & repos (${projects.length} repos)
    experience        Work & internship experience
    education         Education history
    certs             Certifications list
    contact           Contact info & social links
    neofetch          System info with fetch ASCII art

  <span class="success">Actions</span>
    open github       Open GitHub profile
    open linkedin     Open LinkedIn profile
    open x / twitter  Open X / Twitter profile
    open [project]    Open project live link or repo
    sudo hire-me      😏 Try it…

  <span class="success">Package Managers</span>
    apt install [pkg] Install a tool (burpsuite, nmap, wireshark...)
    pip install [pkg] Install a Python package (focusorm, onyx...)

  <span class="success">Fun & Tools</span>
    cowsay [text]     ASCII cow speaks
    fortune           Random dev quote / hacker motto
    history           Command history
    echo [text]       Print text
    date              Current date/time
    uptime            System uptime

  <span class="success">System</span>
    clear             Clear terminal
    help              This help message
    man [command]     Manual for a command
`;
                break;

            // ──── whoami ────
            case 'whoami':
                output = `
<span class="highlight">${profile.name}</span>
<span class="success">Role:   ${profile.role}</span>
<span class="highlight">Focus:  ${profile.focus}</span>
<span class="warning">Mission: "${profile.mission}"</span>
<span class="muted">📍 Location: ${profile.location}</span>
<span class="muted">📧 Email:    ${profile.email}</span>
<span class="muted">🐙 GitHub:   ${profile.github}</span>
<span class="muted">𝕏  Twitter:  ${profile.x}</span>
`;
                break;

            // ──── security ────
            case 'security':
                output = `\n<span class="highlight">Security Architecture & Configuration:</span>\n\n` +
                    `<pre class="terminal-tree" style="color:var(--accent-secondary);font-family:inherit;">${securityConf.tree}</pre>\n` +
                    `<span class="highlight">Active Focus Domains:</span>\n` +
                    securityConf.domains.map(d => `  <span class="success">⚡ ${d.name}</span>: <span class="muted">${d.desc}</span>`).join('\n') +
                    `\n`;
                break;

            // ──── achievements / awards / ctf ────
            case 'achievements':
            case 'awards':
            case 'ctf':
                output = `\n<span class="highlight">Achievements & Competitions Log:</span>\n\n`;
                achievements.forEach((a) => {
                    output += `  <span class="warning">[${a.year}] ${a.title}</span>\n`;
                    output += `         ├── <span class="success">${a.highlight}</span>\n`;
                    output += `         └── <span class="muted">${a.description}</span>\n\n`;
                });
                break;

            // ──── current-work / work ────
            case 'current-work':
            case 'work':
            case 'focus':
                output = `\n<span class="highlight">Current Focus & Activities ($ ./current-work):</span>\n\n`;
                currentWork.forEach((w) => {
                    output += `  <span class="success">[+] ${w.label.padEnd(12)}</span> →  <span class="highlight">${w.value}</span>\n`;
                });
                output += '\n';
                break;

            // ──── roles ────
            case 'roles':
                output = `\n<span class="highlight">Active Roles & Leadership:</span>\n\n`;
                roles.forEach((r) => {
                    output += `  <span class="success">[ROLE]</span>  <span class="highlight">${r.role}</span> (${r.organization})\n`;
                    output += `          └── <span class="muted">${r.description}</span>\n\n`;
                });
                break;

            // ──── status / service ────
            case 'status':
            case 'service':
                output = `
<span class="success">● shreenath.service</span> — Cybersecurity Student, Pentester & Builder
   <span class="muted">Loaded:</span> loaded (/etc/shreenath/profile; enabled)
   <span class="success">Active: ● active (running)</span> since BTech CSE 2024
   <span class="highlight">Tasks:</span>  CTF · Pentest · Build · Learn · Repeat
   <span class="warning">Mission:</span> Build. Break. Understand. Secure.
   <span class="muted">Memory:</span> 100% Passion & Curiosity
`;
                break;

            // ──── about ────
            case 'about':
                output = `
<span class="highlight">${profile.name}</span>
<span class="success">${profile.title}</span>
<span class="warning">Mission: "${profile.mission}"</span>
<span class="muted">📍 ${profile.location}</span>

${profile.summary}
`;
                break;

            // ──── skills ────
            case 'skills':
                output = `\n<span class="highlight">Technical & Security Skills:</span>\n\n`;
                skills.forEach((s) => {
                    const filled = Math.round(s.level / 5);
                    const empty = 20 - filled;
                    output += `  <span class="success">${s.name.padEnd(30)}</span> [${'█'.repeat(filled)}${'░'.repeat(empty)}] ${s.level}%\n`;
                });
                break;

            // ──── projects ────
            case 'projects':
                output = `\n<span class="highlight">Projects & Repositories (${projects.length} repos):</span>\n\n`;
                projects.forEach((p) => {
                    const live = p.liveUrl ? ` <span class="success">[LIVE]</span>` : '';
                    const feat = p.featured ? ` <span class="warning">[FEATURED]</span>` : '';
                    output += `  📁 <span class="highlight">${p.displayName}</span>${live}${feat}\n`;
                    output += `     <span class="muted">${p.language} • [${p.category}] • ${p.description.substring(0, 85)}...</span>\n\n`;
                });
                break;

            // ──── experience ────
            case 'experience':
                output = `\n<span class="highlight">Work Experience & Internships:</span>\n\n`;
                experience.forEach((e) => {
                    output += `  <span class="success">${e.role}</span>\n`;
                    output += `  <span class="highlight">${e.company}</span> • <span class="muted">${e.location}</span>\n`;
                    output += `  <span class="warning">${e.duration}</span>\n`;
                    output += `  <span class="muted">${e.description}</span>\n\n`;
                });
                break;

            // ──── education ────
            case 'education':
                output = `\n<span class="highlight">Education:</span>\n\n`;
                education.forEach((e) => {
                    output += `  🎓 <span class="success">${e.degree}</span>\n`;
                    output += `     <span class="highlight">${e.institution}</span>\n`;
                    output += `     <span class="muted">${e.duration}</span>\n\n`;
                });
                break;

            // ──── certs ────
            case 'certs':
            case 'certifications':
                output = `\n<span class="highlight">Certifications:</span>\n\n`;
                certifications.forEach((c) => {
                    output += `  📜 <span class="success">${c}</span>\n`;
                });
                output += '\n';
                break;

            // ──── contact ────
            case 'contact':
                output = `
<span class="highlight">Contact & Connect Information:</span>

  📧 Email:    <span class="success">${profile.email}</span>
  🔗 LinkedIn: <span class="highlight">${profile.linkedin}</span>
  🐙 GitHub:   <span class="highlight">${profile.github}</span>
  𝕏  X/Twitter:<span class="highlight">${profile.x}</span>
  📍 Location: <span class="muted">${profile.location}</span>
`;
                break;

            // ──── neofetch ────
            case 'neofetch':
                output = 'NEOFETCH';
                break;

            // ──── pwd ────
            case 'pwd':
                output = cwdStr();
                break;

            // ──── ls ────
            case 'ls': {
                const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
                const pathArg = args.find((a) => !a.startsWith('-'));
                const targetParts = pathArg ? normalizePath(cwd, pathArg) : cwd;
                const node = resolvePath(fs, targetParts);
                if (!node || node.type !== 'dir') {
                    output = `<span class="error">ls: cannot access '${pathArg || '.'}': No such file or directory</span>`;
                    break;
                }
                const entries = Object.entries(node.children || {});
                const filtered = showHidden ? entries : entries.filter(([n]) => !n.startsWith('.'));
                if (filtered.length === 0) {
                    output = '<span class="muted">(empty directory)</span>';
                    break;
                }
                output = '\n';
                filtered.sort(([, a], [, b]) => (a.type === b.type ? 0 : a.type === 'dir' ? -1 : 1));
                filtered.forEach(([name, n]) => {
                    if (n.type === 'dir') {
                        output += `  <span class="highlight">📁 ${name}/</span>\n`;
                    } else {
                        const ext = name.split('.').pop();
                        const icon = ext === 'txt' ? '📄' : ext === 'json' ? '📋' : ext === 'md' ? '📝' : ext === 'pdf' ? '📕' : ext === 'conf' || ext === 'log' ? '⚙️' : '📄';
                        output += `  <span class="muted">${icon} ${name}</span>\n`;
                    }
                });
                break;
            }

            // ──── cd ────
            case 'cd': {
                if (args.length === 0 || args[0] === '~') {
                    setCwd(['home', 'shreenath']);
                    break;
                }
                const target = args[0] === '-' ? ['home', 'shreenath'] : normalizePath(cwd, args[0]);
                const node = resolvePath(fs, target);
                if (!node || node.type !== 'dir') {
                    output = `<span class="error">cd: no such file or directory: ${args[0]}</span>`;
                    break;
                }
                setCwd(target);
                break;
            }

            // ──── cat ────
            case 'cat': {
                if (args.length === 0) {
                    output = '<span class="error">cat: missing file operand</span>';
                    break;
                }
                const fileParts = normalizePath(cwd, args[0]);
                const fileNode = resolvePath(fs, fileParts);
                if (!fileNode) {
                    output = `<span class="error">cat: ${args[0]}: No such file or directory</span>`;
                } else if (fileNode.type === 'dir') {
                    output = `<span class="error">cat: ${args[0]}: Is a directory</span>`;
                } else {
                    output = '\n' + (fileNode.content || '');
                }
                break;
            }

            // ──── tree ────
            case 'tree': {
                const pathArg = args[0];
                const targetParts = pathArg ? normalizePath(cwd, pathArg) : cwd;
                const node = resolvePath(fs, targetParts);
                if (!node || node.type !== 'dir') {
                    output = `<span class="error">tree: '${pathArg || '.'}': No such directory</span>`;
                    break;
                }
                let dirCount = 0;
                let fileCount = 0;
                const buildTree = (n: FSNode, prefix: string, maxDepth: number): string => {
                    if (maxDepth <= 0 || n.type !== 'dir' || !n.children) return '';
                    const entries = Object.entries(n.children).filter(([name]) => !name.startsWith('.'));
                    let result = '';
                    entries.forEach(([name, child], i) => {
                        const isLast = i === entries.length - 1;
                        const connector = isLast ? '└── ' : '├── ';
                        const childPrefix = isLast ? '    ' : '│   ';
                        if (child.type === 'dir') {
                            dirCount++;
                            result += `${prefix}${connector}<span class="highlight">${name}/</span>\n`;
                            result += buildTree(child, prefix + childPrefix, maxDepth - 1);
                        } else {
                            fileCount++;
                            result += `${prefix}${connector}<span class="muted">${name}</span>\n`;
                        }
                    });
                    return result;
                };
                const pathName = pathArg || '.';
                output = `\n<span class="highlight">${pathName}</span>\n`;
                output += buildTree(node, '', 3);
                output += `\n<span class="muted">${dirCount} directories, ${fileCount} files</span>`;
                break;
            }

            // ──── mkdir ────
            case 'mkdir': {
                if (!args[0]) {
                    output = '<span class="error">mkdir: missing operand</span>';
                    break;
                }
                output = `<span class="success">mkdir: created directory '${args[0]}'</span>`;
                break;
            }

            // ──── echo ────
            case 'echo':
                output = args.join(' ');
                break;

            // ──── date ────
            case 'date':
                output = new Date().toString();
                break;

            // ──── uptime ────
            case 'uptime':
                output = `<span class="muted"> ${new Date().toLocaleTimeString()}  up since 2024,  1 user,  load average: 0.12, 0.28, 0.35</span>`;
                break;

            // ──── open ────
            case 'open': {
                const target = args.join(' ').toLowerCase();
                if (target === 'github') {
                    window.open(profile.github, '_blank');
                    output = `<span class="success">Opening GitHub profile...</span>`;
                } else if (target === 'linkedin') {
                    window.open(profile.linkedin, '_blank');
                    output = `<span class="success">Opening LinkedIn profile...</span>`;
                } else if (target === 'x' || target === 'twitter') {
                    window.open(profile.x, '_blank');
                    output = `<span class="success">Opening X / Twitter profile...</span>`;
                } else if (target === 'resume') {
                    output = `<span class="success">Opening Resume app on desktop...</span>`;
                } else {
                    const proj = projects.find(
                        (p) => p.name.toLowerCase() === target || p.displayName.toLowerCase().includes(target)
                    );
                    if (proj?.liveUrl) {
                        window.open(proj.liveUrl, '_blank');
                        output = `<span class="success">Opening ${proj.displayName}...</span>`;
                    } else if (proj) {
                        window.open(proj.githubUrl, '_blank');
                        output = `<span class="success">Opening ${proj.displayName} on GitHub...</span>`;
                    } else {
                        output = `<span class="error">open: '${target}' not found. Try: github, linkedin, x, or a project name</span>`;
                    }
                }
                break;
            }

            // ──── sudo ────
            case 'sudo': {
                const sudoCmd = args.join(' ').toLowerCase();
                if (sudoCmd === 'hire-me' || sudoCmd === 'hire me') {
                    output = `
<span class="success">
██╗  ██╗██╗██████╗ ███████╗    ███╗   ███╗███████╗██╗
██║  ██║██║██╔══██╗██╔════╝    ████╗ ████║██╔════╝██║
███████║██║██████╔╝█████╗      ██╔████╔██║█████╗  ██║
██╔══██║██║██╔══██╗██╔══╝      ██║╚██╔╝██║██╔══╝  ╚═╝
██║  ██║██║██║  ██║███████╗    ██║ ╚═╝ ██║███████╗██╗
╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝╚═╝
</span>

<span class="highlight">📧 ${profile.email}</span>
<span class="highlight">🔗 ${profile.linkedin}</span>
<span class="highlight">🐙 ${profile.github}</span>
<span class="highlight">𝕏  ${profile.x}</span>

<span class="muted">Actively open to Cybersecurity, Pentesting & AI Internships/Opportunities!</span>
<span class="muted">"Build. Break. Understand. Secure." 🛡️</span>
`;
                } else if (sudoCmd === 'rm -rf /') {
                    output = `<span class="error">Nice try 😏 Permission denied. Root filesystem is protected by hardened SELinux policies.</span>`;
                } else if (sudoCmd === 'su' || sudoCmd === 'su root') {
                    output = `<span class="error">root access granted to shreenath (uid=0). Welcome, commander.</span>`;
                } else {
                    output = `<span class="muted">[sudo] password for shreenath: ********\nExecuted: ${sudoCmd}</span>`;
                }
                break;
            }

            // ──── apt ────
            case 'apt': {
                if (args[0] === 'install') {
                    const pkg = args[1]?.toLowerCase();
                    if (!pkg) {
                        output = `<span class="error">apt: missing package name</span>\n<span class="muted">Try: apt install burpsuite | nmap | wireshark | react</span>`;
                    } else if (APT_PACKAGES[pkg]) {
                        output = `<span class="muted">Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  ${pkg}
Setting up ${APT_PACKAGES[pkg]}...</span>
<span class="success">Done! ${APT_PACKAGES[pkg]} installed successfully. ✓</span>`;
                    } else {
                        output = `<span class="error">E: Unable to locate package ${pkg}</span>
<span class="muted">Available: ${Object.keys(APT_PACKAGES).join(', ')}</span>`;
                    }
                } else if (args[0] === 'list') {
                    output = `<span class="highlight">Available packages:</span>\n\n`;
                    Object.entries(APT_PACKAGES).forEach(([k, v]) => {
                        output += `  <span class="success">${k.padEnd(16)}</span> <span class="muted">${v}</span>\n`;
                    });
                } else {
                    output = `<span class="muted">Usage: apt install [package] | apt list</span>`;
                }
                break;
            }

            // ──── pip ────
            case 'pip': {
                if (args[0] === 'install') {
                    const pkg = args[1]?.toLowerCase();
                    if (!pkg) {
                        output = `<span class="error">pip: missing package name</span>\n<span class="muted">Try: pip install focusorm | onyx | scapy</span>`;
                    } else if (PIP_PACKAGES[pkg]) {
                        output = `<span class="muted">Collecting ${pkg}...
  Downloading ${pkg}... (100%)
  Installing collected packages: ${pkg}</span>
<span class="success">Successfully installed ${PIP_PACKAGES[pkg]} ✓</span>`;
                    } else {
                        output = `<span class="error">ERROR: No matching distribution found for ${pkg}</span>
<span class="muted">Try: pip install ${Object.keys(PIP_PACKAGES).join(', ')}</span>`;
                    }
                } else if (args[0] === 'list') {
                    output = `<span class="highlight">Installed Python packages:</span>\n\n`;
                    Object.entries(PIP_PACKAGES).forEach(([k, v]) => {
                        output += `  <span class="success">${k.padEnd(16)}</span> <span class="muted">${v}</span>\n`;
                    });
                } else {
                    output = `<span class="muted">Usage: pip install [package] | pip list</span>`;
                }
                break;
            }

            // ──── history ────
            case 'history':
                output = '\n';
                cmdHistory.forEach((h, i) => {
                    output += `  <span class="muted">${String(i + 1).padStart(4)}</span>  ${h}\n`;
                });
                output += `  <span class="muted">${String(cmdHistory.length + 1).padStart(4)}</span>  history\n`;
                break;

            // ──── cowsay ────
            case 'cowsay': {
                const text = args.length > 0 ? args.join(' ') : 'Build. Break. Understand. Secure.';
                const line = '_'.repeat(text.length + 2);
                output = `
 ${line}
< ${text} >
 ${'-'.repeat(text.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
                break;
            }

            // ──── fortune ────
            case 'fortune':
                output = `\n<span class="success">${FORTUNES[Math.floor(Math.random() * FORTUNES.length)]}</span>\n`;
                break;

            // ──── man ────
            case 'man': {
                const manCmd = args[0]?.toLowerCase();
                const manPages: Record<string, string> = {
                    ls: 'ls - list directory contents\n\n  Usage: ls [-a] [path]\n\n  -a    Show hidden files (dotfiles)',
                    cd: 'cd - change directory\n\n  Usage: cd [path]',
                    cat: 'cat - print file contents\n\n  Usage: cat [file]',
                    security: 'security - display security configuration and domains tree',
                    achievements: 'achievements - list CTF and competition accomplishments',
                    tree: 'tree - display directory tree hierarchy',
                    open: 'open - open URLs, profiles, and projects',
                    sudo: 'sudo - execute with elevated permissions',
                };
                if (manCmd && manPages[manCmd]) {
                    output = `\n<span class="highlight">MANUAL: ${manCmd}</span>\n\n<span class="muted">${manPages[manCmd]}</span>\n`;
                } else {
                    output = `<span class="muted">Usage: man [command]</span>`;
                }
                break;
            }

            // ──── clear ────
            case 'clear':
                setLines([]);
                return;

            // ──── unknown ────
            default:
                output = `<span class="error">bash: ${cmd}: command not found</span>\n<span class="muted">Type <span class="highlight">help</span> for available commands, or explore with <span class="highlight">ls</span></span>`;
        }

        setLines((prev) => [
            ...prev,
            { type: 'input', content: raw },
            ...(output ? [{ type: 'output' as const, content: output }] : []),
        ]);
    };

    useEffect(() => {
        if (shortcutCommand) {
            processCommand(shortcutCommand);
            inputRef.current?.focus();
        }
    }, [shortcutCommand]);

    // ────── TAB AUTOCOMPLETE ──────
    const handleTab = () => {
        const parts = currentInput.trimEnd().split(/\s+/);

        if (['cd', 'cat', 'ls', 'tree', 'open'].includes(parts[0]?.toLowerCase()) && parts.length >= 2) {
            const partial = parts[parts.length - 1];
            const dirParts = partial.includes('/') ? normalizePath(cwd, partial.substring(0, partial.lastIndexOf('/'))) : cwd;
            const prefix = partial.includes('/') ? partial.substring(partial.lastIndexOf('/') + 1) : partial;
            const node = resolvePath(fs, dirParts);
            if (node?.type === 'dir' && node.children) {
                const matches = Object.keys(node.children).filter((k) => k.toLowerCase().startsWith(prefix.toLowerCase()));
                if (matches.length === 1) {
                    parts[parts.length - 1] = (partial.includes('/') ? partial.substring(0, partial.lastIndexOf('/') + 1) : '') + matches[0];
                    const matchNode = node.children[matches[0]];
                    if (matchNode.type === 'dir') parts[parts.length - 1] += '/';
                    setCurrentInput(parts.join(' '));
                } else if (matches.length > 1) {
                    setLines((prev) => [
                        ...prev,
                        { type: 'input', content: currentInput },
                        { type: 'output', content: matches.map((m) => `  <span class="highlight">${m}</span>`).join('\n') },
                    ]);
                }
            }
            return;
        }

        if (parts.length <= 1) {
            const partial = (parts[0] || '').toLowerCase();
            const matches = ALL_COMMANDS.filter((c) => c.startsWith(partial));
            if (matches.length === 1) {
                setCurrentInput(matches[0] + ' ');
            } else if (matches.length > 1) {
                setLines((prev) => [
                    ...prev,
                    { type: 'input', content: currentInput },
                    { type: 'output', content: matches.map((m) => `  <span class="success">${m}</span>`).join('  ') },
                ]);
            }
        }
    };

    // ────── KEY HANDLER ──────
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            processCommand(currentInput);
            setCmdHistory((prev) => [currentInput, ...prev]);
            setHistoryIndex(-1);
            setCurrentInput('');
        } else if (e.key === 'Tab') {
            e.preventDefault();
            handleTab();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < cmdHistory.length - 1) {
                const ni = historyIndex + 1;
                setHistoryIndex(ni);
                setCurrentInput(cmdHistory[ni]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const ni = historyIndex - 1;
                setHistoryIndex(ni);
                setCurrentInput(cmdHistory[ni]);
            } else {
                setHistoryIndex(-1);
                setCurrentInput('');
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setLines([]);
        }
    };

    // ────── NEOFETCH RENDERER ──────
    const renderNeofetch = () => {
        const ascii = `  ┌─────────────────────────────────────────┐
  │  shreenath@github ~ $                   │
  ├─────────────────────────────────────────┤
  │                                         │
  │  shreenath@github                       │
  │  ──────────────────────────             │
  │  OS:       Windows 11 / Linux / Android │
  │  Host:     SELF                         │
  │  Shell:    Bash / PowerShell / Zsh      │
  │  Role:     Web Pentester                │
  │  Focus:    Offensive Security           │
  │  Security: CTF · Web · API · OSINT      │
  │  CTF Rank: India #1 / Global #77 (SAS)  │
  │  AI:       Privacy-first · Automation   │
  │  Status:   ● Building & Learning        │
  │                                         │
  │  Languages:                             │
  │  Python · JavaScript · HTML · CSS       │
  │                                         │
  │  Tools:                                 │
  │  Burp Suite · Nmap · Wireshark          │
  │                                         │
  └─────────────────────────────────────────┘`;

        return (
            <div className="neofetch" style={{ flexDirection: 'column' }}>
                <pre className="neofetch-ascii" style={{ fontSize: '11.5px', color: 'var(--accent-primary)' }}>{ascii}</pre>
                <div className="neofetch-colors" style={{ marginTop: 10 }}>
                    {['#f38ba8', '#fab387', '#f9e2af', '#a6e3a1', '#89b4fa', '#cba6f7', '#f5c2e7', '#94e2d5'].map((c) => (
                        <div key={c} className="neofetch-color" style={{ background: c }} />
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div
            className="terminal"
            ref={terminalRef}
            onClick={() => inputRef.current?.focus()}
        >
            {lines.map((line, i) => (
                <div key={i} className="terminal-line">
                    {line.type === 'input' ? (
                        <div dangerouslySetInnerHTML={{ __html: `${prompt()}${line.content}` }} />
                    ) : line.content === 'NEOFETCH' ? (
                        renderNeofetch()
                    ) : (
                        <div className="terminal-output" dangerouslySetInnerHTML={{ __html: line.content }} />
                    )}
                </div>
            ))}
            <div className="terminal-line terminal-input-line">
                <span dangerouslySetInnerHTML={{ __html: prompt() }} />
                <input
                    ref={inputRef}
                    className="terminal-input"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    spellCheck={false}
                />
            </div>
        </div>
    );
};
