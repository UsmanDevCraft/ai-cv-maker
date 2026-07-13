# CVForbes - AI CV Maker

> **Transform generic resumes into ATS-optimized, job-tailored applications in seconds.**

CVForbes is a modern AI-powered web application that helps job seekers generate tailored resumes and personalized cover letters for specific job opportunities. Simply upload your existing resume, paste the target job description, and let AI optimize your application while preserving factual accuracy.

<img width="1658" height="802" alt="Screenshot 2026-07-13 at 12 39 33 PM" src="https://github.com/user-attachments/assets/58dcfca3-ed1c-49cf-9f1a-8a4e0ead3376" />

This repository contains the **frontend** of CVForbes, built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**, delivering a fast, responsive, and engaging user experience.

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

### 🤖 AI Resume Tailoring

Transforms existing resume content into an ATS-friendly version while maintaining factual accuracy.

---

### 📝 AI Cover Letter Generation

Creates personalized cover letters aligned with the target role and company requirements.

---

### 📊 ATS Optimization

Improves keyword matching, bullet point structure, and overall readability for Applicant Tracking Systems.

---

### 📄 PDF Resume Upload

Simple drag-and-drop uploader supporting secure PDF processing.

---

### ⚡ Real-Time Generation

Uses asynchronous API communication for fast AI generation with loading states and smooth transitions.

---

### 🎨 Modern User Experience

* Responsive layout
* Framer Motion animations
* Interactive landing page
* Smooth transitions
* Professional UI components
* Mobile-friendly design

---

# 🛠 Tech Stack

### Framework

* Next.js 16
* React 19
* TypeScript

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
Frontend Validation
        │
        ▼
Secure API Request
        │
        ▼
FastAPI AI Backend
        │
        ▼
Gemini AI Processing
        │
        ▼
Structured JSON Response
        │
        ▼
Render Tailored Resume
        │
        ▼
Display Cover Letter
        │
        ▼
Export Assets
```

---

# 🧠 Frontend Architecture

The application follows modern React best practices.

## State Management

* React Hooks
* TanStack Query
* Formik

## API Layer

Dedicated service layer keeps networking separate from UI components.

## Validation

All user input is validated using **Zod** before submission.

## Component Design

Reusable components are designed to be composable and maintainable.

---

# 🔒 Security Considerations

Although the primary security layer lives in the backend, the frontend also contributes by:

* Validating form inputs before submission
* Restricting unsupported file formats
* Enforcing upload size limits
* Preventing invalid requests
* Handling API failures gracefully
* Displaying user-friendly error messages

The backend performs the authoritative validation and security checks.

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

This frontend communicates with the **CVForbes Backend**, which provides:

* Secure PDF processing
* Resume parsing
* AI-powered resume tailoring
* Cover letter generation
* Structured JSON validation
* Rate limiting
* Prompt injection protection
* File validation
* Secure AI processing

Ensure the backend server is running before using the application.

---

# 🌟 Current Capabilities

✔ Upload PDF resumes

✔ ATS resume rewriting

✔ AI-generated cover letters

✔ Responsive interface

✔ Animated landing page

✔ Form validation

✔ API integration

✔ Loading states

✔ Error handling

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
