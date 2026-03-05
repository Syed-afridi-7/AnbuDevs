# LeetCode Clone

A full-featured LeetCode clone built with React, TypeScript, Vite, and Tailwind CSS. Practice coding problems, explore algorithms, and improve your problem-solving skills.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Code Editor**: Monaco Editor
- **Routing**: React Router DOM
- **State Management**: TanStack Query

## Getting Started

### Prerequisites

- Node.js 18+
- npm or bun

### Installation

```sh
# Clone the repository
git clone <your-repo-url>

# Navigate to the project directory
cd Developer-Skills

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## Features

- Browse and filter coding problems by difficulty (Easy / Medium / Hard)
- Monaco-based code editor with syntax highlighting
- Dark / Light mode toggle
- Problem detail view with description, examples, and constraints
- Responsive layout with collapsible sidebar

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   └── ProblemList.tsx
├── pages/            # Page-level components
├── data/             # Static problem data
├── hooks/            # Custom React hooks
└── lib/              # Utility functions
```
# Spirit-Of-Flame
