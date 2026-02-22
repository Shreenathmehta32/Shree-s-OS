<div align="center">

<h1>🐧 Shree's OS</h1>
<p><strong>A Linux-style interactive portfolio — built with React, TypeScript & Vite</strong></p>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Site-89b4fa?style=for-the-badge)](https://shree-s-os.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Shreenathmehta32-cba6f7?style=for-the-badge&logo=github)](https://github.com/Shreenathmehta32)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-a6e3a1?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/shreenath-mehta-b12880255)

![Shree's OS Preview](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Vite-f9e2af?style=for-the-badge)

</div>

---

## ✨ Overview

**Shree's OS** is a portfolio website that emulates a **Linux desktop environment** right in the browser. Instead of a plain webpage, visitors experience a fully interactive OS — complete with draggable windows, a real terminal, animated wallpapers, and live GitHub stats.

Built for recruiters and developers who appreciate creativity in self-presentation.

---

## 🖥️ Features

### 🗂️ Desktop Environment
- **Animated boot sequence** — realistic Linux startup logs
- **Draggable & resizable windows** — full window management (open, close, minimize, maximize)
- **6 animated wallpapers** — Aurora, Matrix, Nebula, Synthwave, Coderain, Lava
- **Wallpaper picker** — switch themes live
- **Wallpaper persistence** — remembers your choice via `localStorage`
- **Taskbar** with clock, app switcher, and live **"Available"** status badge
- **Desktop typing animation** — cycles through roles with a blinking cursor
- **Visitor counter** — tracks unique session visits

### 💻 Terminal (Fully Functional)
A real bash-like terminal with:
- **Virtual file system** — `ls`, `cd`, `pwd`, `cat`, `tree`, `mkdir`
- **Tab autocomplete** — commands, file paths, and package names
- **Command history** — navigate with ↑↓ arrow keys
- **Fake package managers** — `apt install`, `pip install`, `apt list`
- **`neofetch`** — custom ASCII art + system info
- **`sudo hire-me`** — Easter egg 🎉
- **`open github`** / **`open linkedin`** — opens links directly
- **`cowsay`**, **`fortune`**, **`man [cmd]`** — classic Unix fun
- **`Ctrl+L`** to clear

### 🪟 App Windows
| App | Description |
|-----|-------------|
| 🖥️ **Terminal** | Full interactive bash-like terminal |
| 📁 **File Manager** | Browse virtual project directories |
| 👤 **About Me** | Bio, status badge, live GitHub stats + contribution graph |
| 📊 **Skills** | Animated skill bars by category |
| 📄 **Resume** | Timeline view + one-click download |
| 📬 **Contact** | EmailJS contact form + quick links |

### 📱 Mobile & Tablet
Fully responsive — automatically switches to a **touch-native layout** on screens ≤ 1024px:
- Top header with typing animation
- **5-tab bottom navigation** (About, Projects, Skills, Resume, Terminal, Contact)
- All content as smooth scrollable panels
- iOS safe-area support

### 📊 Live GitHub Integration
- **Repository count**, followers, following, years on GitHub
- **Past-year contribution heatmap** (real data, fetched live from GitHub Contributions API)
- **Avatar** loaded directly from your GitHub profile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Vanilla CSS (Catppuccin Mocha palette) |
| Email | EmailJS (`@emailjs/browser`) |
| APIs | GitHub REST API, GitHub Contributions API |
| Fonts | Ubuntu, Fira Code (Google Fonts) |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Shreenathmehta32/Shree-s-OS.git
cd Shree-s-OS

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

---

## ⚙️ Configuration

### EmailJS (Contact Form)
To make the contact form send real emails:

1. Create a free account at [emailjs.com](https://emailjs.com)
2. Add an email service (Gmail / Outlook)
3. Create a template with variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`
4. Open `src/components/apps/ContactApp.tsx` and replace the placeholder IDs:

```ts
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
```

### Personal Data
Update your info in `src/data/profile.ts`:

```ts
export const profile = {
  name: 'Shreenath Mehta',
  title: 'Full Stack Developer ...',
  email: 'your@email.com',
  github: 'https://github.com/YourUsername',
  linkedin: 'https://linkedin.com/in/...',
  // ...
};
```

Update projects in `src/data/projects.ts`.

---

## 📁 Project Structure

```
Shree-s-OS/
├── public/
├── src/
│   ├── components/
│   │   ├── apps/
│   │   │   ├── Terminal.tsx       # Full terminal emulator
│   │   │   ├── AboutMe.tsx        # About window
│   │   │   ├── SkillsApp.tsx      # Skills with animated bars
│   │   │   ├── ResumeApp.tsx      # Resume + download
│   │   │   ├── ContactApp.tsx     # EmailJS contact form
│   │   │   └── FileManager.tsx    # Virtual file browser
│   │   ├── GitHubStats.tsx        # Live GitHub + contribution heatmap
│   │   ├── MobileLayout.tsx       # Touch-native mobile/tablet layout
│   │   ├── Window.tsx             # Draggable/resizable window frame
│   │   └── WallpaperPicker.tsx    # Wallpaper selector modal
│   ├── data/
│   │   ├── profile.ts             # Personal info & skills
│   │   ├── projects.ts            # GitHub projects
│   │   └── wallpapers.ts          # Wallpaper configs
│   ├── App.tsx                    # Main orchestrator
│   ├── index.css                  # Global styles & CSS animations
│   └── main.tsx
├── index.html
├── vite.config.ts
└── tsconfig.json
```

---

## 🎨 Terminal Commands Reference

```bash
# Navigation
ls [-a]          # List files (include hidden with -a)
cd <dir>         # Change directory
pwd              # Print working directory
tree             # Show directory tree
cat <file>       # Read file contents

# Profile
whoami           # Identity card
about            # About me
skills           # Tech skills
projects         # Project list
experience       # Work experience
contact          # Contact info

# Actions
open github      # Open GitHub profile
open linkedin    # Open LinkedIn
sudo hire-me     # 😏

# Packages (simulated)
apt install <pkg>
pip install <pkg>
apt list / pip list

# Fun
neofetch         # System info with ASCII art
cowsay <msg>     # ASCII cow
fortune          # Dev wisdom
man <cmd>        # Manual pages

# Utilities
history          # Command history
date             # Current time
clear / Ctrl+L   # Clear terminal
```

---

## 📄 License

MIT © [Shreenath Mehta](https://github.com/Shreenathmehta32)

---

<div align="center">
  <p>Made with ❤️ and way too much CSS by <strong>Shreenath Mehta</strong></p>
  <p>⭐ Star this repo if you like it!</p>
</div>
