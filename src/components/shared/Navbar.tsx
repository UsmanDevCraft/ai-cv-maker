import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu } from "lucide-react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { useIsAdmin } from "@/src/hooks/useIsAdmin";

const Navbar = () => {
  const { isAdmin } = useIsAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b border-white/30 bg-white/20 backdrop-blur-lg transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-light-bronze text-white shadow-md shadow-light-bronze/20 transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              CV<span className="text-light-bronze font-black">Forbes</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-light-bronze"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-light-bronze"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-light-bronze"
            >
              Pricing
            </a>
            <a
              href="#roadmap"
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-light-bronze"
            >
              Roadmap
            </a>
            {isAdmin && (
              <a
                href="/dashboard"
                className="text-sm font-semibold text-slate-600 transition-colors hover:text-light-bronze"
              >
                Dashboard
              </a>
            )}
          </nav>

          {/* Desktop Auth Controls */}
          <div className="hidden items-center gap-4 md:flex">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-sm font-semibold text-slate-700 hover:text-light-bronze transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="inline-flex items-center justify-center rounded-xl bg-light-bronze px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-light-bronze/25 transition-all duration-300 hover:bg-light-bronze-hover hover:shadow-light-bronze/35 hover:-translate-y-0.5 active:translate-y-0">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link
                href="/makeyourcv"
                className="inline-flex items-center justify-center rounded-xl bg-light-bronze px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-light-bronze/25 transition-all duration-300 hover:bg-light-bronze-hover hover:shadow-light-bronze/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started
              </Link>
              <UserButton showName={false} />
            </Show>
          </div>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-white/30 backdrop-blur-sm text-slate-700 md:hidden hover:bg-white/50 active:scale-95"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-white/20 bg-cornsilk/95 backdrop-blur-xl md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 px-6 py-6 border-t border-white/20">
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-light-bronze"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-light-bronze"
                >
                  How It Works
                </a>
                <a
                  href="#pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-light-bronze"
                >
                  Pricing
                </a>
                <a
                  href="#roadmap"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-slate-700 hover:text-light-bronze"
                >
                  Roadmap
                </a>
                {isAdmin && (
                  <a
                    href="/dashboard"
                    className="text-sm font-semibold text-slate-600 transition-colors hover:text-light-bronze"
                  >
                    Dashboard
                  </a>
                )}

                <Show when="signed-out">
                  <div className="flex flex-col gap-2 mt-2">
                    <SignInButton mode="modal">
                      <button className="w-full rounded-xl border border-slate-300 py-2.5 text-center text-sm font-bold text-slate-700 hover:bg-slate-50">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="w-full rounded-xl bg-light-bronze py-2.5 text-center text-sm font-bold text-white shadow-md hover:bg-light-bronze-hover">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </Show>
                <Show when="signed-in">
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/50">
                    <Link
                      href="/makeyourcv"
                      className="inline-flex items-center justify-center rounded-xl bg-light-bronze px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-light-bronze-hover"
                    >
                      Get Started
                    </Link>
                    <UserButton showName />
                  </div>
                </Show>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Navbar;
