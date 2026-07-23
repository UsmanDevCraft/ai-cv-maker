# CVForbes - AI CV Maker

> **Transform generic resumes into ATS-optimized, job-tailored applications in seconds.**

CVForbes is a modern AI-powered web application that helps job seekers generate tailored resumes and personalized cover letters for specific job opportunities. Simply upload your existing resume, paste the target job description, and let AI optimize your application while preserving factual accuracy.

<img width="1658" height="802" alt="Screenshot 2026-07-13 at 12 39 33 PM" src="https://github.com/user-attachments/assets/58dcfca3-ed1c-49cf-9f1a-8a4e0ead3376" />

Built using Next.js, FastAPI, MongoDB, Clerk Authentication, and modern AI tooling, CVForbes demonstrates how production-grade AI applications can combine intelligent document generation with robust [Backend](https://github.com/UsmanDevCraft/cvforbes-backend) architecture, security, and operational visibility.

---

# ✨ Product Vision

Most job seekers send the same resume to hundreds of companies.

Modern Applicant Tracking Systems (ATS) don't simply look for experience—they look for relevance.

CVForbes bridges that gap by intelligently rewriting existing resumes to emphasize the skills, technologies, and achievements most relevant to each specific job description without fabricating information.

Our goal is simple:

> **One Resume. Unlimited Opportunities.**

---

# 🚀 What CVForbes Does

CVForbes allows users to:

* Upload an existing resume (PDF)
* Paste a target job description
* Generate an ATS-optimized resume
* Generate a personalized cover letter
* Preserve factual integrity
* Highlight measurable achievements
* Improve keyword alignment
* Export professional application assets

The entire workflow is designed to reduce the time spent tailoring applications from **30–60 minutes to under seconds**.

---

# 🎯 Key Features

- 🤖 AI-powered resume tailoring for specific job descriptions
- 📝 Personalized cover letter generation
- 📈 ATS optimization and resume analytics
- 🔀 Provider-agnostic LLM router (Groq, OpenRouter, Gemini, Ollama)
- 🛡️ Anonymous usage tracking with daily generation limits
- 🚦 Rate limiting and abuse protection
- 🔐 Clerk authentication with role-based admin access
- 📊 Admin dashboard with user, generation, and analytics endpoints
- 📚 API versioning and standardized response models
- 🗄️ MongoDB + Beanie with optimized indexing
- 🧩 Clean Architecture (Middleware → Services → Repositories → Models)
- 🚀 Production-ready FastAPI + Next.js application

---

# 🏗 Architecture Highlights

* Provider-agnostic LLM router with automatic failover
* Clean Architecture (Middleware → Services → Repositories → Models)
* FastAPI + MongoDB + Beanie backend
* Next.js + React + TypeScript frontend
* Clerk authentication with role-based authorization
* Anonymous usage tracking and daily generation limits
* Admin dashboard with analytics APIs
* Structured AI output validation
* Production-oriented security and scalability

---

# 🛠 Tech Stack

### Framework

* Next.js 16
* React 19
* TypeScript

### Auth

* Clerk

### Styling

* Tailwind CSS 4

### Animations

* Framer Motion

### Forms & Validation

* Formik
* Zod
* zod-formik-adapter

### Data Fetching

* TanStack Query

### PDF

* React PDF Renderer

### Icons

* Lucide React

---

# 📂 Project Structure

```text
src/
│
├── app/
├── components/
├── hooks/
├── services/
├── schema/
├── types/
├── utils/
├── view/
└── assets/
```

The application follows a modular architecture where each directory has a single responsibility, making the codebase easy to scale and maintain.

---

# 🎨 User Experience Highlights

The frontend was designed with a premium SaaS experience in mind.

Highlights include:

* Responsive layouts
* Animated landing page
* Drag-and-drop resume uploader
* Loading states
* Skeleton placeholders
* Smooth transitions
* Interactive cards
* Feature showcases
* Pricing section
* Product roadmap
* Testimonials
* Modern typography
* Accessible color contrast
* Mobile-first responsiveness

---

# 🔄 Application Workflow

```text
User Uploads Resume
        │
        ▼
Paste Job Description
        │
        ▼
Frontend Validation (Zod)
        │
        ▼
Authenticated Request (Clerk)
        │
        ▼
FastAPI Backend
        │
        ▼
Anonymous Usage & Rate Limit Checks
        │
        ▼
Secure PDF Processing
        │
        ▼
Provider-Agnostic LLM Router
        │
        ▼
Groq / OpenRouter / Ollama / Gemini
        │
        ▼
Structured AI Validation
        │
        ▼
Resume & Cover Letter Generation
        │
        ▼
Generation Analytics Saved
        │
        ▼
Structured JSON Response
        │
        ▼
Render Tailored Resume
        │
        ▼
Display Cover Letter & Analytics
```

---

# 🧠 Frontend Architecture

The application follows modern React and Next.js best practices with a scalable, production-oriented architecture.

## State Management

* React Hooks
* TanStack Query
* Formik

## API Layer

A dedicated service layer abstracts backend communication, request handling, error management, and API versioning from UI components.

## Validation

Client-side validation is handled using **Zod** before requests are submitted. Final validation is always enforced by the backend.

## Authentication

Authentication is powered by **Clerk**, with role-based route protection for administrative functionality.

## Component Design

Reusable, composable, and responsive components are organized for long-term maintainability and scalability.

---

# 🔒 Security Considerations

Although the primary security layer resides in the backend, the frontend contributes by:

* Validating user input before submission
* Restricting unsupported file formats
* Enforcing upload size limits
* Preventing invalid requests
* Managing authenticated user sessions with Clerk
* Restricting admin-only routes
* Handling API failures gracefully
* Displaying user-friendly validation and error messages

The [Backend](https://github.com/UsmanDevCraft/cvforbes-backend) performs the authoritative security checks, including usage tracking, rate limiting, abuse protection, PDF validation, AI response validation, and access control.

---

# ⚡ Performance Optimizations

The frontend includes several optimizations:

* Dynamic imports
* Code splitting
* Lazy loading
* Optimized rendering
* React Query request caching
* Lightweight component architecture
* Efficient state updates
* Responsive image handling
* Suspense boundaries
* Modern Next.js App Router

---

# 📦 Installation

Clone the repository.

```bash
git clone https://github.com/UsmanDevCraft/cvforbes.git
```

Navigate to the project.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

or

```bash
yarn
```

or

```bash
pnpm install
```

---

# 🚀 Running Locally

Start the development server.

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

# 🖥 Backend Dependency

This frontend communicates with the [**CVForbes Backend**](https://github.com/UsmanDevCraft/cvforbes-backend), which provides:

* Provider-agnostic LLM routing with automatic failover
* Secure PDF processing and structured resume parsing
* AI-powered resume tailoring
* Personalized cover letter generation
* ATS optimization and resume analytics
* Structured JSON validation
* Anonymous usage tracking and daily generation limits
* Rate limiting and abuse protection
* Clerk authentication and role-based authorization
* Admin dashboard APIs (users, generations, bans, analytics)
* File validation and secure AI processing

Ensure the backend server is running before using the application.

---

# 🌟 Current Capabilities

✔ AI-powered resume tailoring
✔ Personalized cover letter generation
✔ ATS optimization with resume analytics
✔ Provider-agnostic LLM router with automatic failover
✔ Secure PDF upload and text extraction
✔ Structured AI output validation
✔ Anonymous usage tracking (5 successful CVs/day)
✔ Rate limiting and abuse protection
✔ Clerk authentication with role-based admin access
✔ Admin dashboard (users, generations, bans, analytics)
✔ Responsive interface
✔ Form validation
✔ Loading & error states
✔ Professional UI/UX

---

# 🗺 Product Roadmap

The long-term vision for CVForbes extends beyond resume rewriting.

Planned features include:

* Automated Job URL Parsing (LinkedIn, Greenhouse, Indeed, Lever)
* Chrome Extension
* Multiple Resume Templates
* AI Resume Scoring
* Resume Difference Comparison
* Resume Version History
* Authentication
* User Dashboard
* Saved Projects
* Multi-language Resume Support
* AI Interview Preparation
* Portfolio Generator
* LinkedIn Profile Optimizer
* Team & Recruiter Dashboard

---

# 💡 Why CVForbes?

Most AI resume builders simply rewrite text.

CVForbes was designed around a different philosophy:

* Preserve factual integrity.
* Optimize for ATS compatibility.
* Produce professional, structured outputs.
* Deliver a premium user experience.
* Make resume tailoring accessible to everyone.

The result is a platform that helps candidates submit higher-quality applications with significantly less effort.

---

# 📜 License

This project is intended for educational and commercial use. Feel free to modify and extend it according to your needs.

---

# ❤️ Acknowledgements

CVForbes was built as a full-stack AI application to explore modern software engineering practices, combining:

* Next.js
* FastAPI
* LangChain
* Google Gemini
* TypeScript
* Tailwind CSS
* Modern UI/UX Design
* Secure Backend Engineering

The project focuses on delivering a production-oriented developer experience while solving a real-world problem faced by millions of job seekers worldwide.
