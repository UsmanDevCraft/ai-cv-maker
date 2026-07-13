import { Inter } from "next/font/google";
import "./globals.css";
import { AlertProvider } from "@/src/context/AlertContext";
import AlertContainer from "@/src/components/shared/Alert/AlertContainer";
import QueryProvider from "@/src/provider/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "CVForbes - Land the Interview. Tailor Your CV in Seconds.",
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
        <QueryProvider>
          <AlertProvider>
            {children}
            <AlertContainer />
          </AlertProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
