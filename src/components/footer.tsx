'use client'

import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 1200 1227"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"
      />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/company/equitty0', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://x.com/EQUITTY_', label: 'X (Twitter)', icon: TwitterIcon },
  { href: 'https://www.tiktok.com/@equitty_', label: 'TikTok', icon: TikTokIcon },
  { href: 'https://www.instagram.com/equitty_/', label: 'Instagram', icon: Instagram },
  { href: 'https://www.facebook.com/people/Equitty/61588660531154/', label: 'Facebook', icon: Facebook },
]

export function Footer() {
  return (
    <footer className="bg-background dark:bg-background border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left - Brand */}
          <div>
            <Image src="/logo-accent.png" alt="EQUITTY" width={200} height={200} style={{ height: "auto" }} />
          </div>

          {/* Center - Terms and Conditions */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-white/70 hover:text-accent transition-colors"
            >
              Terms & Conditions
            </a>
            <div className="h-4 w-px bg-white/20" />
            <a
              href="#"
              className="text-white/70 hover:text-accent transition-colors"
            >
              Privacy Policy
            </a>
          </div>

          {/* Right - Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-accent transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} EQUITTY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

