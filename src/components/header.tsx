'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { Bell, LogOut, Menu, Search, UserRound, X } from 'lucide-react'

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
            className="p-2 hover:bg-accent/10 rounded-sm transition"
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
          className="hidden md:block px-6 py-2 bg-accent text-accent-foreground font-medium rounded-sm hover:bg-accent/90 transition transform hover:scale-105"
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
              className="px-6 py-2 bg-accent text-accent-foreground font-medium rounded-sm hover:bg-accent/90 transition text-center"
            >
              Get equity →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

type DashboardHeaderProps = {
  title: string
  subtitle: string
  userName: string
  userInitials: string
}

export function DashboardHeader({
  title,
  subtitle,
  userName,
  userInitials,
}: DashboardHeaderProps) {
  const router = useRouter()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (!profileMenuRef.current?.contains(target)) {
        setIsProfileMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleLogout = () => {
    setIsProfileMenuOpen(false)
    void router.push('/')
  }

  return (
    <header className="sticky top-0 z-30 mb-5">
      <div className="rounded-sm border border-border/45 bg-[#0b0a12]/82 px-4 py-3 backdrop-blur-xl shadow-[0_6px_34px_-16px_rgba(0,180,196,0.35)] sm:px-5">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
              EQ Dashboard
            </div>
            <h1 className="mt-1 truncate text-xl font-semibold text-foreground">
              {title}
            </h1>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2.5">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/70" />
              <input
                type="text"
                aria-label="Buscar"
                placeholder="Buscar modulo o activo..."
                className="eq-input h-9 w-56 rounded-full pl-9 pr-3 text-xs"
              />
            </label>
          </div>

          <button
            type="button"
            aria-label="Notificaciones"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/55 bg-black/20 text-muted-foreground transition-colors hover:text-foreground hover:bg-white/6"
          >
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,180,196,0.9)]" />
          </button>

          <div className="relative" ref={profileMenuRef}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
              aria-label="Abrir menu de perfil"
              onClick={() => setIsProfileMenuOpen((value) => !value)}
              className="inline-flex items-center gap-2.5 rounded-full border border-border/55 bg-black/20 px-2.5 py-1.5 text-left transition-colors hover:bg-white/6"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-xs font-semibold text-primary shadow-[0_0_12px_rgba(0,180,196,0.22)]">
                {userInitials}
              </span>
              <span className="hidden sm:block">
                <span className="block text-xs font-medium leading-tight text-foreground">
                  {userName}
                </span>
                <span className="block text-[10px] leading-tight text-muted-foreground">
                  Cuenta verificada
                </span>
              </span>
            </button>

            {isProfileMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-40 rounded-sm border border-border/60 bg-[#0b0a12]/95 p-1.5 shadow-[0_20px_40px_-22px_rgba(0,180,196,0.45)] backdrop-blur-xl"
              >
                <Link
                  href="/profile"
                  role="menuitem"
                  onClick={() => setIsProfileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-sm px-2.5 py-2 text-sm text-foreground/90 transition-colors hover:bg-white/8 hover:text-foreground"
                >
                  <UserRound className="size-4" />
                  Profile
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-sm text-red-300 transition-colors hover:bg-red-500/10 hover:text-red-200"
                >
                  <LogOut className="size-4" />
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

