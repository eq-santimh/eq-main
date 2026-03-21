'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { Bell, LogOut, Menu, Search, UserRound, X } from 'lucide-react'

type HeaderLink = {
  label: string
  href: string
}

type HeaderProps = {
  title?: string
  subtitle?: string
  userName?: string
  userInitials?: string
  desktopLeftOffset?: number
  links?: HeaderLink[]
}

const defaultLinks: HeaderLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Portfolios', href: '/wallet-hub' },
  { label: 'FAQ', href: '#' },
]

export function Header({
  title = 'Dashboard',
  subtitle = 'Resumen de portafolio y actividad reciente.',
  userName = 'Jose Santiago',
  userInitials,
  desktopLeftOffset = 0,
  links = defaultLinks,
}: HeaderProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const profileMenuRef = useRef<HTMLDivElement | null>(null)

  const resolvedInitials =
    userInitials ||
    userName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY <= 0) {
        setIsVisible(true)
        lastScrollY.current = currentScrollY
        return
      }

      const delta = currentScrollY - lastScrollY.current
      if (delta > 8) {
        setIsVisible(false)
      } else if (delta < -8) {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
    <header
      className={`fixed right-0 top-0 z-40 left-0 lg:left-(--header-left) transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={
        {
          '--header-left': `${desktopLeftOffset}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-20"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0, 180, 196, 0.2) 0%, rgba(0, 180, 196, 0.08) 40%, transparent 72%)',
        }}
        aria-hidden
      />

      <nav className="relative mx-auto w-full max-w-[1680px] px-4 py-4 sm:px-6 lg:px-8 2xl:px-10">
        <div className="rounded-sm border border-border/20 bg-background/80 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(0,180,196,0.45)]">
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <Link href="/" className="shrink-0">
                <Image
                  src="/logo-accent.png"
                  alt="EQUITY"
                  width={160}
                  height={48}
                  className="h-auto w-24 object-contain drop-shadow-[0_0_20px_rgba(0,180,196,0.28)] sm:w-32"
                  priority
                />
              </Link>
              <div className="min-w-0 hidden sm:block">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                  EQ Dashboard
                </div>
                <h1 className="mt-0.5 truncate text-sm font-semibold text-foreground lg:text-base">
                  {title}
                </h1>
                <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            {/* <div className="hidden xl:flex items-center gap-6">
              {links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white transition"
                >
                  {item.label}
                </Link>
              ))}
            </div> */}

            <div className="flex items-center gap-2.5">
              <div className="hidden lg:flex items-center gap-2.5">
                <label className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground/70" />
                  <input
                    type="text"
                    aria-label="Buscar"
                    placeholder="Buscar modulo o activo..."
                    className="eq-input h-9 w-52 rounded-full pl-9 pr-3 text-xs"
                  />
                </label>
              </div>

              <button
                type="button"
                aria-label="Notificaciones"
                className="hidden sm:inline-flex relative h-9 w-9 items-center justify-center rounded-full border border-border/55 bg-black/20 text-muted-foreground transition-colors hover:text-foreground hover:bg-white/6"
              >
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,180,196,0.9)]" />
              </button>

              <div className="relative hidden sm:block" ref={profileMenuRef}>
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isProfileMenuOpen}
                  aria-label="Abrir menu de perfil"
                  onClick={() => setIsProfileMenuOpen((value) => !value)}
                  className="inline-flex items-center gap-2.5 rounded-full border border-border/55 bg-black/20 px-2.5 py-1.5 text-left transition-colors hover:bg-white/6"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/15 text-xs font-semibold text-primary shadow-[0_0_12px_rgba(0,180,196,0.22)]">
                    {resolvedInitials}
                  </span>
                  <span className="hidden lg:block">
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

              {/* Mobile Menu Button */}
              <div className="sm:hidden flex items-center">
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
            </div>
          </div>

          <div
            className="h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-90"
            style={{
              boxShadow:
                '0 0 12px 1px rgba(0, 180, 196, 0.35), 0 0 24px 2px rgba(0, 180, 196, 0.16)',
            }}
            aria-hidden
          />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden rounded-sm border-x border-b border-border/20 bg-background/90 px-4 py-4 backdrop-blur-xl">
            <div className="flex flex-col gap-4">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                  EQ Dashboard
                </div>
                <h1 className="mt-0.5 truncate text-sm font-semibold text-foreground">
                  {title}
                </h1>
                <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
              </div>
              {links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-foreground/80 dark:text-white/80 hover:text-foreground dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserRound className="size-4" />
                Perfil ({userName})
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
