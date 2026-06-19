# Midhah Monorepo

Welcome to the **Midhah Frontend Monorepo** . This repository utilizes a modern, enterprise-grade architecture powered by **Turborepo** and **pnpm Workspaces** .

It contains two separate Next.js applications (**Web** and **Admin** ) that safely share utilities, global types, and API logic while maintaining strict dependency boundaries.

---

## 🏗️ Architecture & Tech Stack

| Technology       | Description                        |
| ---------------- | ---------------------------------- |
| Framework        | Next.js 16 (App Router, Turbopack) |
| Package Manager  | pnpm v11+                          |
| Monorepo Tool    | Turborepo                          |
| Language         | TypeScript 6.0.3 (Strict Mode)     |
| Styling          | Tailwind CSS v4                    |
| Linting          | ESLint 9 (Flat Config) & Prettier  |
| State Management | Zustand                            |
| Backend/Auth     | Firebase                           |
| Data Fetching    | Axios & React Query                |

---

## 📂 Project Structure

```text
midhah/
├── apps/
│   ├── admin/               # Next.js Admin Dashboard (Port 3000)
│   └── web/                 # Next.js Public App (Port 3001)
│
├── packages/
│   └── utils/               # Shared logic (Zustand, Firebase, Axios, Fonts, global.d.ts)
│
├── pnpm-workspace.yaml      # Workspace boundaries & package catalog
├── eslint.config.mjs        # Global ESLint Flat Config
├── tsconfig.base.json       # Shared TypeScript configuration
└── turbo.json               # Turborepo pipeline configuration
```

---

# 🚀 Quick Start

## 1. Prerequisites

Ensure the following are installed:

- Node.js v20+
- pnpm v11+

Install pnpm globally if needed:

```bash
npm install -g pnpm
```

---

## 2. Install Dependencies

Install all workspace dependencies from the repository root:

```bash
pnpm install
```

> **Note:** Do not use `npm install` in this monorepo.

---

## 3. Environment Variables

Create a `.env.local` file inside both applications:

```text
apps/web/.env.local
apps/admin/.env.local
```

Add your:

- Firebase configuration
- API URLs
- Next.js environment variables
- Any application-specific secrets

---

## 4. Start Development Servers

Run both applications simultaneously:

```bash
pnpm dev
```

### Available Applications

| App             | URL                                             |
| --------------- | ----------------------------------------------- |
| Admin Dashboard | [http://localhost:3000](http://localhost:3000/) |
| Web Application | [http://localhost:3001](http://localhost:3001/) |

---

# 🛠️ Command Cheat Sheet

Run all commands from the root directory.

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `pnpm dev`        | Start development servers    |
| `pnpm build`      | Build all applications       |
| `pnpm lint`       | Run ESLint across workspace  |
| `pnpm type-check` | Run strict TypeScript checks |

---

## 🎯 Running Targeted Commands

Use `--filter` to run commands for a specific workspace.

### Web App

```bash
pnpm --filter @midhah/web dev
pnpm --filter @midhah/web build
pnpm --filter @midhah/web lint
```

### Admin App

```bash
pnpm --filter @midhah/admin dev
pnpm --filter @midhah/admin build
pnpm --filter @midhah/admin lint
```

### Shared Utils Package

```bash
pnpm --filter @midhah/utils type-check
```

---

# 📦 Dependency Management

This monorepo follows strict dependency ownership rules.

Applications **cannot rely on dependencies installed elsewhere** in the workspace.

---

## Updating Shared Versions

Core package versions are maintained in the `catalog` section of:

```yaml
pnpm-workspace.yaml
```

Examples:

- React
- Next.js
- TypeScript
- Tailwind CSS

After updating versions:

```bash
pnpm install
```

---

## Installing Packages for a Specific App

Always install packages directly into the workspace that uses them.

### Example: Install UI Components in Web App

```bash
pnpm --filter @midhah/web add lucide-react @radix-ui/react-dialog
```

### Example: Install Form Library in Admin App

```bash
pnpm --filter @midhah/admin add react-hook-form
```

---

# 🧠 TypeScript & Shared Utilities

All shared TypeScript logic lives inside:

```text
packages/utils
```

---

## Global Type Definitions

Global browser types are declared in:

```text
packages/utils/src/global.d.ts
```

Examples:

```ts
window.gtag;
window.adsbygoogle;
```

To make Next.js aware of these types, include the file in each application's `tsconfig.json`.

### Example

```json
{
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "../../packages/utils/src/global.d.ts"
  ]
}
```

---

# 🚨 Common Troubleshooting

## Module Not Found

### Error

```text
Module not found: Can't resolve 'package-name'
```

### Cause

Phantom dependency.

The package is imported but not declared in the application's `package.json`.

### Fix

```bash
pnpm --filter @midhah/<app-name> add <package-name>
```

---

# 🚀 Deployment (Vercel)

This repository is optimized for deployment on Vercel.

## 1. Import Repository

- Open Vercel Dashboard
- Click **Add New → Project**
- Import this repository

## 2. Configure Root Directory

### Web Deployment

```text
apps/web
```

### Admin Deployment

```text
apps/admin
```

## 3. Add Environment Variables

Configure all required variables inside the Vercel project settings.

## 4. Deploy

Click **Deploy** .

Vercel will automatically:

- Detect `pnpm-lock.yaml`
- Install workspace dependencies
- Execute Turborepo builds
- Cache build artifacts efficiently

---

# ✅ Best Practices

- Always run commands from the repository root.
- Never use `npm install`.
- Keep shared logic inside `packages/utils`.
- Install dependencies only in the workspace that uses them.
- Update shared framework versions through the pnpm catalog.
- Run `pnpm type-check` before creating pull requests.
- Run `pnpm lint` before committing code.
