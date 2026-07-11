import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "TailorCV - Land the Interview. Tailor Your CV in 10 Seconds.",
  description:
    "Instantly adjust your professional experience to match any company's job requirements using advanced AI. High-impact bullet points, custom cover letters, and zero hassle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-cornsilk font-sans text-slate-800 selection:bg-tea-green">
        {children}
      </body>
    </html>
  );
}
