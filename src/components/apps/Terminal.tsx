import React, { useState, useRef, useEffect, useCallback } from 'react';
import { profile, skills, experience, education, certifications } from '../../data/profile';
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
                            content: `╔══════════════════════════════════════════╗
║          ABOUT — Shreenath Mehta         ║
╚══════════════════════════════════════════╝

${profile.title}
📍 ${profile.location}

${profile.summary}
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
                                    _comment: 'Shreenath Mehta — Technical Skills',
                                    skills: skills.map((s) => ({
                                        name: s.name,
                                        proficiency: `${s.level}%`,
                                        category: s.category,
                                    })),
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
alias hack='echo "Access Denied 😈"'
neofetch`,
                        },
                        '.secret': {
                            type: 'file',
                            content: `🎉 You found the secret file!

Easter egg: Run "sudo hire-me" for a surprise.

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
                                                content: `# ${p.displayName}\n\n${p.description}\n\n🔗 GitHub: ${p.githubUrl}${p.liveUrl ? `\n🌐 Live:   ${p.liveUrl}` : ''}\n📦 Language: ${p.language}\n`,
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
    'certs', 'contact', 'neofetch', 'clear', 'ls', 'cd', 'cat', 'pwd', 'mkdir',
    'tree', 'echo', 'date', 'uptime', 'open', 'sudo', 'apt', 'pip', 'history',
    'cowsay', 'fortune', 'man',
];

// ═══════════════════════  FAKE PACKAGE LISTS  ═══════════════════════
const APT_PACKAGES: Record<string, string> = {
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
    'nginx': 'Nginx 1.25.4',
    'creativity': 'Creativity 999.99',
    'hacking-skills': 'Ethical Hacking Toolkit 4.2.0',
};

const PIP_PACKAGES: Record<string, string> = {
    'tensorflow': 'TensorFlow 2.16',
    'pytorch': 'PyTorch 2.2',
    'numpy': 'NumPy 1.26',
    'flask': 'Flask 3.0',
    'django': 'Django 5.0',
    'openai': 'OpenAI SDK 1.12',
};

const FORTUNES = [
    '"The best way to predict the future is to invent it." — Alan Kay',
    '"Talk is cheap. Show me the code." — Linus Torvalds',
    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
    '"First, solve the problem. Then, write the code." — John Johnson',
    '"The only way to learn a new programming language is by writing programs in it." — Dennis Ritchie',
    '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
    '"Simplicity is the soul of efficiency." — Austin Freeman',
    '"Make it work, make it right, make it fast." — Kent Beck',
];

// ═══════════════════════  COMPONENT  ═══════════════════════
export const Terminal: React.FC = () => {
    const [lines, setLines] = useState<{ type: 'input' | 'output'; content: string }[]>([
        {
            type: 'output',
            content: `Welcome to <span class="highlight">Shree's OS v2.0.26 LTS</span> (GNU/Linux 6.8.0-generic x86_64)\n\nType <span class="highlight">help</span> to see available commands.\nType <span class="highlight">ls</span> to explore the file system.\n`,
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
<span class="highlight">┌─────────────────────────────────────────────┐</span>
<span class="highlight">│         Shree's OS — Command Reference      │</span>
<span class="highlight">└─────────────────────────────────────────────┘</span>

  <span class="success">Navigation</span>
    ls [path]        List directory contents
    cd [path]        Change directory
    pwd              Print working directory
    cat [file]       Display file contents
    tree [path]      Show directory tree
    mkdir [name]     Create directory

  <span class="success">Profile</span>
    whoami           Show user info
    about            Bio and summary
    skills           Technical skills
    projects         GitHub projects
    experience       Work experience
    education        Education history
    certs            Certifications
    contact          Contact info
    neofetch         System info with ASCII art

  <span class="success">Actions</span>
    open github      Open GitHub profile
    open linkedin    Open LinkedIn profile
    open [project]   Open project live link
    sudo hire-me     😏 Try it…

  <span class="success">Package Managers</span>
    apt install [pkg]   Install a package
    pip install [pkg]   Install a Python package

  <span class="success">Fun</span>
    cowsay [text]    ASCII cow says something
    fortune          Random dev quote
    history          Command history
    echo [text]      Print text
    date             Current date/time
    uptime           System uptime

  <span class="success">System</span>
    clear            Clear terminal
    help             This help message
    man [command]    Manual for a command
`;
                break;

            // ──── whoami ────
            case 'whoami':
                output = `
<span class="highlight">${profile.name}</span>
<span class="muted">${profile.title}</span>
<span class="muted">📍 ${profile.location}</span>
<span class="muted">📧 ${profile.email}</span>
<span class="muted">🐙 github.com/Shreenathmehta32</span>
`;
                break;

            // ──── about ────
            case 'about':
                output = `
<span class="highlight">${profile.name}</span>
<span class="muted">${profile.title}</span>
<span class="muted">📍 ${profile.location}</span>

${profile.summary}
`;
                break;

            // ──── skills ────
            case 'skills':
                output = `\n<span class="highlight">Technical Skills:</span>\n\n`;
                skills.forEach((s) => {
                    const filled = Math.round(s.level / 5);
                    const empty = 20 - filled;
                    output += `  <span class="success">${s.name.padEnd(20)}</span> [${'█'.repeat(filled)}${'░'.repeat(empty)}] ${s.level}%\n`;
                });
                break;

            // ──── projects ────
            case 'projects':
                output = `\n<span class="highlight">GitHub Projects (${projects.length} repos):</span>\n\n`;
                projects.forEach((p) => {
                    const live = p.liveUrl ? ` <span class="success">[LIVE]</span>` : '';
                    output += `  📁 <span class="highlight">${p.displayName}</span>${live}\n`;
                    output += `     <span class="muted">${p.language} • ${p.description.substring(0, 80)}...</span>\n\n`;
                });
                break;

            // ──── experience ────
            case 'experience':
                output = `\n<span class="highlight">Work Experience:</span>\n\n`;
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
<span class="highlight">Contact Information:</span>

  📧 Email:    <span class="success">${profile.email}</span>
  🔗 LinkedIn: <span class="highlight">${profile.linkedin}</span>
  🐙 GitHub:   <span class="highlight">${profile.github}</span>
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
                        const icon = ext === 'txt' ? '📄' : ext === 'json' ? '📋' : ext === 'md' ? '📝' : ext === 'pdf' ? '📕' : '📄';
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
                output = `<span class="muted"> ${new Date().toLocaleTimeString()}  up since 2024,  1 user,  load average: 0.42, 0.38, 0.35</span>`;
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
                } else if (target === 'resume') {
                    output = `<span class="success">Opening Resume app on desktop...</span>`;
                } else {
                    // Check if it's a project name
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
                        output = `<span class="error">open: '${target}' not found. Try: github, linkedin, or a project name</span>`;
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

<span class="muted">I'm actively looking for internships & collaborations!</span>
<span class="muted">Let's build something amazing together. 🚀</span>
`;
                } else if (sudoCmd === 'rm -rf /') {
                    output = `<span class="error">Nice try 😏 Permission denied. This OS is indestructible.</span>`;
                } else if (sudoCmd === 'su' || sudoCmd === 'su root') {
                    output = `<span class="error">root access denied — you're already the boss here 😎</span>`;
                } else {
                    output = `<span class="warning">[sudo] password for shreenath: ******\n</span><span class="error">shreenath is not in the sudoers file. This incident will be reported 🚨</span>`;
                }
                break;
            }

            // ──── apt ────
            case 'apt': {
                if (args[0] === 'install' && args[1]) {
                    const pkg = args[1].toLowerCase();
                    if (APT_PACKAGES[pkg]) {
                        output = `<span class="muted">Reading package lists... Done
Building dependency tree... Done
Reading state information... Done</span>
<span class="success">The following NEW packages will be installed:</span>
  ${APT_PACKAGES[pkg]}
<span class="muted">0 upgraded, 1 newly installed, 0 to remove.
Need to get 42.0 MB of archives.
After this operation, 128 MB of additional disk space will be used.</span>
<span class="success">Setting up ${pkg} (${APT_PACKAGES[pkg]}) ...
✓ ${APT_PACKAGES[pkg]} installed successfully!</span>`;
                    } else {
                        output = `<span class="error">E: Unable to locate package ${pkg}</span>
<span class="muted">Try: apt install ${Object.keys(APT_PACKAGES).slice(0, 5).join(', ')}</span>`;
                    }
                } else if (args[0] === 'list') {
                    output = `<span class="highlight">Available packages:</span>\n\n`;
                    Object.entries(APT_PACKAGES).forEach(([k, v]) => {
                        output += `  <span class="success">${k.padEnd(20)}</span> <span class="muted">${v}</span>\n`;
                    });
                } else if (args[0] === 'update') {
                    output = `<span class="muted">Hit:1 https://packages.shreeos.dev stable InRelease
Get:2 https://security.shreeos.dev stable-security InRelease
Get:3 https://packages.shreeos.dev stable/main amd64 Packages [12.4 MB]</span>
<span class="success">All packages are up to date.</span>`;
                } else {
                    output = `<span class="muted">Usage: apt [install|update|list] [package]</span>`;
                }
                break;
            }

            // ──── pip ────
            case 'pip':
            case 'pip3': {
                if (args[0] === 'install' && args[1]) {
                    const pkg = args[1].toLowerCase();
                    if (PIP_PACKAGES[pkg]) {
                        output = `<span class="muted">Collecting ${pkg}
  Downloading ${pkg}-latest.tar.gz (4.2 MB)
  Installing build dependencies... done
  Building wheel... done</span>
<span class="success">Successfully installed ${PIP_PACKAGES[pkg]} ✓</span>`;
                    } else {
                        output = `<span class="error">ERROR: No matching distribution found for ${pkg}</span>
<span class="muted">Try: pip install ${Object.keys(PIP_PACKAGES).slice(0, 4).join(', ')}</span>`;
                    }
                } else if (args[0] === 'list') {
                    output = `<span class="highlight">Installed packages:</span>\n\n`;
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
                const text = args.length > 0 ? args.join(' ') : 'Moo! Hire Shreenath!';
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
                    ls: 'ls - list directory contents\n\n  Usage: ls [-a] [path]\n\n  -a    Show hidden files (dotfiles)\n\n  Lists files and directories in the current or specified path.',
                    cd: 'cd - change directory\n\n  Usage: cd [path]\n\n  cd          Go to home (~)\n  cd ..       Go up one level\n  cd path     Go to path\n  cd /        Go to root',
                    cat: 'cat - concatenate and print files\n\n  Usage: cat [file]\n\n  Displays the contents of a file.',
                    tree: 'tree - display directory tree\n\n  Usage: tree [path]\n\n  Shows a tree view of the directory structure (max depth 3).',
                    open: 'open - open URLs and projects\n\n  Usage: open [target]\n\n  open github      Open GitHub profile\n  open linkedin    Open LinkedIn\n  open [project]   Open project live demo',
                    sudo: 'sudo - execute with superpowers\n\n  Usage: sudo [command]\n\n  sudo hire-me     The most important command 😏',
                    apt: 'apt - package manager\n\n  Usage: apt [install|update|list] [package]\n\n  Simulated package manager for Shree\'s OS.',
                };
                if (manCmd && manPages[manCmd]) {
                    output = `\n<span class="highlight">MANUAL: ${manCmd}</span>\n\n<span class="muted">${manPages[manCmd]}</span>\n`;
                } else if (manCmd) {
                    output = `<span class="error">No manual entry for '${manCmd}'</span>`;
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
                output = `<span class="error">bash: ${cmd}: command not found</span>\n<span class="muted">Type <span class="highlight">help</span> for available commands, or try <span class="highlight">apt install ${cmd}</span></span>`;
        }

        setLines((prev) => [
            ...prev,
            { type: 'input', content: raw },
            ...(output ? [{ type: 'output' as const, content: output }] : []),
        ]);
    };

    // ────── TAB AUTOCOMPLETE ──────
    const handleTab = () => {
        const parts = currentInput.trimEnd().split(/\s+/);

        // Autocomplete file/dir names if cd, cat, ls, tree
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
                    // Show all matches
                    setLines((prev) => [
                        ...prev,
                        { type: 'input', content: currentInput },
                        { type: 'output', content: matches.map((m) => `  <span class="highlight">${m}</span>`).join('\n') },
                    ]);
                }
            }
            return;
        }

        // Autocomplete commands
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

        // Autocomplete apt/pip packages
        if ((parts[0] === 'apt' || parts[0] === 'pip') && parts[1] === 'install' && parts.length === 3) {
            const partial = parts[2].toLowerCase();
            const pkgs = parts[0] === 'apt' ? APT_PACKAGES : PIP_PACKAGES;
            const matches = Object.keys(pkgs).filter((k) => k.startsWith(partial));
            if (matches.length === 1) {
                parts[2] = matches[0];
                setCurrentInput(parts.join(' '));
            } else if (matches.length > 1) {
                setLines((prev) => [
                    ...prev,
                    { type: 'input', content: currentInput },
                    { type: 'output', content: matches.map((m) => `  <span class="highlight">${m}</span>`).join('  ') },
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
        const ascii = `         /\\
        /  \\
       /\\   \\
      /      \\
     /   ,,   \\
    /   |  |  -\\
   /_-''    ''-_\\`;

        return (
            <div className="neofetch">
                <pre className="neofetch-ascii">{ascii}</pre>
                <div className="neofetch-info">
                    <div>
                        <span className="label">shreenath</span>
                        <span className="separator">@</span>
                        <span className="label">portfolio</span>
                    </div>
                    <div style={{ borderBottom: '1px solid var(--border-color)', margin: '4px 0 6px', width: '200px' }} />
                    <div><span className="label">OS</span>: Shree's OS v2.0.26 LTS</div>
                    <div><span className="label">Host</span>: Portfolio v2.0</div>
                    <div><span className="label">Kernel</span>: React 19.0 / TypeScript</div>
                    <div><span className="label">Uptime</span>: BTech CSE 2024-2028</div>
                    <div><span className="label">Packages</span>: {projects.length} (github)</div>
                    <div><span className="label">Shell</span>: bash 5.2.26</div>
                    <div><span className="label">DE</span>: Vite Desktop Environment</div>
                    <div><span className="label">WM</span>: React Window Manager</div>
                    <div><span className="label">Theme</span>: Catppuccin Mocha [Dark]</div>
                    <div><span className="label">Terminal</span>: shree-terminal</div>
                    <div><span className="label">CPU</span>: Full Stack Developer @ Todwal</div>
                    <div><span className="label">GPU</span>: Web3 / Blockchain / Three.js</div>
                    <div><span className="label">Memory</span>: Robotics + IoT + AI</div>
                    <div className="neofetch-colors">
                        {['#f38ba8', '#fab387', '#f9e2af', '#a6e3a1', '#89b4fa', '#cba6f7', '#f5c2e7', '#94e2d5'].map((c) => (
                            <div key={c} className="neofetch-color" style={{ background: c }} />
                        ))}
                    </div>
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
