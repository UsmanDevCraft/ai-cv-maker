import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { AlertProvider } from "@/src/context/AlertContext";
import AlertContainer from "@/src/components/shared/Alert/AlertContainer";
import QueryProvider from "@/src/provider/QueryProvider";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cvforbes.vercel.app"),

  title: {
    default: "CVForbes - Land the Interview. Tailor Your CV in Seconds.",
    template: "%s | CVForbes",
  },

  description:
    "Tailor your resume, generate ATS-friendly cover letters, and optimize your CV using AI. Upload your resume, paste a job description, and create job-specific application assets in seconds.",

  keywords: [
    "AI Resume Builder",
    "AI Resume Tailor",
    "Resume Tailoring",
    "ATS Resume",
    "ATS Resume Checker",
    "Resume Optimizer",
    "CV Builder",
    "Cover Letter Generator",
    "Resume AI",
    "Job Application",
    "Resume Writing",
    "AI Cover Letter",
    "Professional Resume",
    "CV Optimization",
  ],

  authors: [
    {
      name: "CVForbes",
    },
  ],

  creator: "CVForbes",
  publisher: "CVForbes",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cvforbes.vercel.app",
    siteName: "CVForbes",

    title: "CVForbes - Land the Interview. Tailor Your CV in Seconds.",

    description:
      "Generate ATS-friendly resumes and personalized cover letters tailored to any job description using AI.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CVForbes - AI Resume Tailoring Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "CVForbes - AI Resume Tailoring",

    description:
      "Upload your resume, paste a job description, and instantly generate ATS-optimized resumes and personalized cover letters.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "technology",

  verification: {
    google: "9PbdoRzqApvTZ5ax4Vx_RVhsUe9OWlDNIfVNPKlw1ho",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-cornsilk font-sans text-slate-800 selection:bg-tea-green">
        <ClerkProvider>
          <QueryProvider>
            <AlertProvider>
              {children}
              <AlertContainer />
            </AlertProvider>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
