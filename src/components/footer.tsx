'use client'

import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

type TermsSection = {
  title: string
  body: string
}

const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/profile.php?id=61588660531154'
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/equitty_/'
const X_URL = process.env.NEXT_PUBLIC_X_URL || 'https://x.com/EQUITTY_'
const TIKTOK_URL = process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@equitty_'
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com/company/equitty0'

const TERMS_HEADER = ['Waitlist Terms & Conditions']

const TERMS_SECTIONS: TermsSection[] = [
  {
    title: '1. NATURE OF REGISTRATION AND NO OBLIGATION',
    body: 'Registration in the waitlist (the "Waitlist") for the EQUITTY project (the "Platform") creates only an expectation of rights for the user. Joining the Waitlist does not guarantee account opening, immediate access to services, or a binding contractual offer from the Platform. EQUITTY is an initiative in launch phase; therefore, access will be granted gradually, at the Platform\'s discretion, and subject to technical availability.',
  },
  {
    title: '2. CONSENT FOR COMMUNICATIONS',
    body: 'By registering, the user grants express, prior, and informed consent to receive electronic communications regarding waitlist status, launch timeline updates, and EQUITTY corporate news. The user may withdraw this consent at any time using the unsubscribe (opt-out) mechanism included in each email.',
  },
  {
    title: '3. PRIVACY AND DATA PROTECTION',
    body: "EQUITTY is committed to processing the user's personal data under strict confidentiality standards, in accordance with the principles of personal data protection regulations of the Republic of El Salvador. Collected data will be used exclusively to manage platform access and validate user identity. No data transfers to third parties will be made without prior consent, except when legally required by a competent authority.",
  },
  {
    title: '4. DISCLAIMER OF ADVICE AND RISKS',
    body: 'The information provided at this expectation stage is strictly informational and does not constitute financial, legal, tax advice, or an investment recommendation. The user acknowledges that investments carry inherent risks and understands that, before receiving any final product or service, the user must successfully complete legal verification, compliance (KYC/AML), and execution of definitive agreements.',
  },
  {
    title: '5. INTELLECTUAL PROPERTY',
    body: 'All intellectual property rights over content, trademarks, logos, and concepts presented at this stage are the exclusive property of EQUITTY. Joining the Waitlist does not grant any license of use or rights over such assets.',
  },
  {
    title: '6. MODIFICATION AND TERMINATION',
    body: 'EQUITTY reserves the right to modify, suspend, or terminate the Waitlist phase at any time and without prior notice, for technical, commercial, or legal reasons, without generating any right to compensation in favor of registered users.',
  },
  {
    title: '7. JURISDICTION AND DISPUTE RESOLUTION',
    body: 'Any dispute arising from interpretation or compliance with these Terms shall be resolved through Equity Arbitration, in accordance with the Rules of the Mediation and Arbitration Center of the Chamber of Commerce and Industry of El Salvador.',
  },
]

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 1200 1227" aria-hidden>
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

const socials = [
  { href: LINKEDIN_URL, label: 'LinkedIn', icon: Linkedin },
  { href: X_URL, label: 'X (Twitter)', icon: TwitterIcon },
  { href: TIKTOK_URL, label: 'TikTok', icon: TikTokIcon },
  { href: INSTAGRAM_URL, label: 'Instagram', icon: Instagram },
  { href: FACEBOOK_URL, label: 'Facebook', icon: Facebook },
]

export function Footer() {
  const [isTermsOpen, setIsTermsOpen] = useState(false)

  return (
    <footer className="bg-background dark:bg-background border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <Image src="/logo-accent.png" alt="EQUITTY" width={200} height={200} />
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-4">
              <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                <DialogTrigger asChild>
                  <button type="button" className="text-white/70 transition hover:text-accent cursor-pointer">
                    Terms & Conditions
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-[min(96vw,1600px)] w-[min(96vw,1600px)] sm:max-w-[min(74vw,1200px)] sm:w-[min(74vw,1200px)] bg-[#03040b]/90 border border-white/10 shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white">Equitty waitlist terms & conditions</DialogTitle>
                    <DialogDescription className="text-white/70">
                      Review the official waitlist agreement in full directly from the document we ship to new investors.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 max-h-[70vh] overflow-y-auto rounded-2xl border border-white/10 bg-black/80 p-6 text-sm leading-relaxed text-white/80">
                    <div className="space-y-1 text-[13px] uppercase tracking-[0.3em] text-white/60">
                      {TERMS_HEADER.map((line, index) => (
                        <p key={`${line}-${index}`}>{line}</p>
                      ))}
                    </div>
                    <div className="mt-4 space-y-6">
                      {TERMS_SECTIONS.map((section) => (
                        <article
                          key={section.title}
                          className="space-y-2 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"
                        >
                          <p className="text-xs uppercase tracking-[0.4em] text-accent">{section.title}</p>
                          <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">{section.body}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-white/70">Privacy</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-colors hover:text-accent"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-white/50">
          <p>Joining the waitlist is not an offer to sell or a solicitation to buy investments. Investing involves risk, including loss of principal.</p>
        </div>
      </div>
    </footer>
  )
}
