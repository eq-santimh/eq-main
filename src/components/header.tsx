'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-linear-to-b from-background/95 to-background/80 backdrop-blur-md border-b border-border/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-white">
            EQUITTY
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition"
          >
            Home
          </a>
          <a
            href="#"
            className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition"
          >
            Marketplace
          </a>
          <a
            href="#"
            className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition"
          >
            Analytics
          </a>
          <a
            href="#"
            className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition"
          >
            Portfolios
          </a>
          <a
            href="#"
            className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition"
          >
            FAQ
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-accent/10 rounded-lg transition"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-foreground dark:text-white" />
            ) : (
              <Menu className="w-5 h-5 text-foreground dark:text-white" />
            )}
          </button>
        </div>

        {/* CTA Button - Desktop */}
        <a
          href="#waitlist"
          className="hidden md:block px-6 py-2 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition transform hover:scale-105"
        >
          Get equity →
        </a>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background dark:bg-background border-b border-border/10 px-4 py-4">
          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
            >
              Marketplace
            </a>
            <a
              href="#"
              className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
            >
              Analytics
            </a>
            <a
              href="#"
              className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
            >
              Portfolios
            </a>
            <a
              href="#"
              className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
            >
              FAQ
            </a>
            <a
              href="#waitlist"
              className="px-6 py-2 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition text-center"
            >
              Get equity →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

