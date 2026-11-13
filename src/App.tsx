import { createPortal } from 'react-dom'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, Mail, Phone, Code, GraduationCap, Briefcase, Award, User } from 'lucide-react'

const NAME = 'Nurul Insyirah'
const BASE = import.meta.env.BASE_URL
// Images live in /public
const PROFILE_IMG = `${BASE}profile.jpg`

// Page 03 - Education (edit freely). GPA and focus are optional.
const EDUCATION = [
  {
    logo: `${BASE}umpsa-logo.png`,
    alt: 'UMPSA logo',
    title: 'Bachelor of Computer Science',
    sub: '(Computer System and Networking)',
    school: 'UMPSA',
    gpa: 'GPA: 3.28 / 4.00',
    focus: ['Networking', 'AI', 'Database', 'UI/UX Design', 'Web Development', 'Mobile Application'],
  },
  {
    logo: `${BASE}kmph-logo.png`,
    alt: 'Kolej Matrikulasi Pahang logo',
    title: 'Matriculation Programme',
    sub: '',
    school: 'Kolej Matrikulasi Pahang',
    gpa: 'CGPA: 3.79 / 4.00',
    focus: ['Computer Science', 'Chemistry', 'Physics'] as string[],
  },
  {
    logo: `${BASE}smkc-logo.jpg`,
    alt: 'SMK Chukai logo',
    title: 'Sijil Pelajaran Malaysia (SPM)',
    sub: '',
    school: 'SMK Chukai',
    gpa: 'Result: 8A 1B',
    focus: ['Computer Science', 'Chemistry', 'Physics'] as string[],
  },
]

// Page 04 - Career descriptions. Write your text between the quotes.
const CAREER = [
  { title: 'Internship', desc: '' },
  { title: 'Promoter', desc: '' },
  { title: 'Freelance', desc: '' },
]

// About Me paragraph (edit freely)
const ABOUT_TEXT = [
  `I'm a Ganu girl with a Computer Science degree, passionate about technology and constantly curious about what happens behind the scenes of the digital world.`,
  `My current interests revolve around database management, Python programming, SQL, data engineering, and cloud technologies. I enjoy learning through hands-on projects, experimenting with AI-assisted development (yes, a little vibe coding here and there), and exploring how frontend applications, backend systems, databases, and cloud platforms work together.`,
  `I believe the best way to learn is to build something, break something, fix it, and understand why it works. Always curious, always building, and definitely not done learning.`,
]

/* ---------- helpers ---------- */
function useTyping(text: string, speed = 90, delay = 0) {
  const [n, setN] = useState(0)
  useEffect(() => {
    setN(0)
    let i = 0
    let iv: number
    const t = window.setTimeout(() => {
      iv = window.setInterval(() => {
        i++
        setN(i)
        if (i >= text.length) clearInterval(iv)
      }, speed)
    }, delay)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [text, speed, delay])
  return text.slice(0, n)
}

function Title({ no, children }: { no: string; children: ReactNode }) {
  return (
    <div className="rise mb-8 flex items-center gap-4">
      <span className="font-mono text-gold text-sm tracking-widest">{no}</span>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-gold">{children}</h2>
      <span className="h-px flex-1 bg-gold/40" />
    </div>
  )
}

function Chip({ children, i, solid = false }: { children: ReactNode; i: number; solid?: boolean }) {
  const look = solid
    ? 'border-gold bg-gold text-black hover:brightness-110'
    : 'border-gold/60 bg-wine-soft/60 text-gold hover:bg-gold hover:text-black'
  return (
    <span
      className={`rise rounded-md border px-4 py-2 text-sm font-medium transition hover:-translate-y-1 ${look}`}
      style={{ animationDelay: `${i * 60}ms` }}
    >
      {children}
    </span>
  )
}

function Label({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold/80">{children}</p>
}

function Photo({ src, alt, fallback, className }: { src: string; alt: string; fallback: ReactNode; className?: string }) {
  const [ok, setOk] = useState(true)
  return ok ? (
    <img src={src} alt={alt} onError={() => setOk(false)} className={`object-cover ${className}`} />
  ) : (
    <div className={`flex items-center justify-center bg-wine-deep text-gold/70 ${className}`}>{fallback}</div>
  )
}

/* ---------- pages ---------- */
function Cover({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center text-center">
      <p className="rise font-mono text-gold tracking-[0.5em] text-sm" style={{ animationDelay: '100ms' }}>2026</p>
      <h1 className="rise font-display text-6xl md:text-8xl font-black text-gold mt-4" style={{ animationDelay: '300ms' }}>Portfolio</h1>
      <div className="rise my-8 h-px w-48 bg-gold" style={{ animationDelay: '600ms' }} />
      <p className="rise font-display text-2xl md:text-4xl text-[#fbefd0]" style={{ animationDelay: '800ms' }}>{NAME}</p>
      <button
        onClick={onStart}
        className="rise group mt-14 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 font-semibold text-black shadow-[0_0_0_0_rgba(245,197,24,.6)] transition hover:scale-105 hover:shadow-[0_0_0_10px_rgba(245,197,24,.15)]"
        style={{ animationDelay: '1100ms' }}
      >
        Click to learn more
        <ArrowRight className="transition group-hover:translate-x-1" size={18} />
      </button>
    </div>
  )
}

function About() {
  const hello = useTyping('Hello!', 120, 300)
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setRevealed(true), 3300)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="h-full overflow-y-auto [scrollbar-width:thin]">
    <div className="grid min-h-full items-center gap-4 py-2 md:grid-cols-[1.3fr_1fr]">
      <div>
        <Title no="02">About Me</Title>
        <h3 className="font-display text-6xl md:text-7xl font-bold text-[#fbefd0] min-h-[1.2em]">
          {hello}
          {hello.length < 6 && <span className="caret" />}
        </h3>
        <div className="relative mt-8 min-h-48 overflow-hidden rounded-lg border-2 border-gold p-6 md:p-8">
          {revealed ? (
            <div className="rise space-y-3 font-sans text-sm leading-relaxed text-gold md:text-base">
              {ABOUT_TEXT.map((para) => <p key={para}>{para}</p>)}
            </div>
          ) : (
            <>
              <div className="flex min-h-32 items-center justify-center">
                <div className="relative">
                  <span className="click-target block rounded-full border border-gold bg-gold/10 px-6 py-2 font-mono text-sm text-gold">Who am I?</span>
                  <svg className="fake-cursor pointer-events-none absolute left-1/2 top-1/2 drop-shadow-lg" width="26" height="26" viewBox="0 0 24 24" aria-hidden>
                    <path d="M4 2 L4 19 L8.5 15 L11.5 22 L14.5 20.7 L11.6 13.8 L17.5 13.8 Z" fill="#f5c518" stroke="#000" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="sway flex flex-col items-center">
          {/* Lanyard: two fabric straps meeting at a metal clip */}
          <svg width="256" height="170" viewBox="0 0 256 170" className="relative z-10 drop-shadow-[0_6px_6px_rgba(0,0,0,.35)]" aria-hidden>
            <defs>
              <linearGradient id="strap" x1="0" x2="1">
                <stop offset="0" stopColor="#d9a90f" />
                <stop offset=".5" stopColor="#f5c518" />
                <stop offset="1" stopColor="#d9a90f" />
              </linearGradient>
              <linearGradient id="metal" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#f4f4f4" />
                <stop offset=".5" stopColor="#9a9a9a" />
                <stop offset="1" stopColor="#e6e6e6" />
              </linearGradient>
            </defs>
            {/* left & right straps */}
            <polygon points="30,0 62,0 142,118 118,118" fill="url(#strap)" />
            <polygon points="194,0 226,0 138,118 114,118" fill="url(#strap)" />
            {/* stitching */}
            <line x1="38" y1="0" x2="122" y2="116" stroke="#7a5a00" strokeWidth="1.2" strokeDasharray="4 4" opacity=".7" />
            <line x1="218" y1="0" x2="134" y2="116" stroke="#7a5a00" strokeWidth="1.2" strokeDasharray="4 4" opacity=".7" />
            {/* strap lettering */}
            <text x="0" y="0" fontSize="9" fontWeight="700" letterSpacing="2" fill="#3a0813" transform="translate(52,18) rotate(54)">PORTFOLIO 2026</text>
            <text x="0" y="0" fontSize="9" fontWeight="700" letterSpacing="2" fill="#3a0813" transform="translate(204,18) rotate(126)" textAnchor="start">PORTFOLIO 2026</text>
            {/* black crimp joining the straps */}
            <rect x="110" y="110" width="36" height="14" rx="3" fill="#111" />
            <rect x="110" y="110" width="36" height="3" rx="1.5" fill="#444" />
            {/* swivel + lobster clasp */}
            <rect x="123" y="123" width="10" height="12" rx="3" fill="url(#metal)" stroke="#666" strokeWidth=".6" />
            <path d="M128 133 C112 138 112 160 128 164 C144 160 144 138 128 133 Z" fill="none" stroke="url(#metal)" strokeWidth="5" />
            <path d="M128 133 C112 138 112 160 128 164 C144 160 144 138 128 133 Z" fill="none" stroke="#555" strokeWidth=".8" />
            <rect x="124" y="159" width="8" height="8" rx="2" fill="url(#metal)" stroke="#666" strokeWidth=".6" />
          </svg>
          <div className="relative -mt-2 w-64 rounded-xl border-2 border-gold bg-wine p-4 pt-8 shadow-2xl">
            <span className="absolute left-1/2 top-2.5 h-2.5 w-14 -translate-x-1/2 rounded-full bg-wine-deep shadow-[inset_0_2px_3px_rgba(0,0,0,.8)] ring-1 ring-gold/60" />
            <Photo
              src={PROFILE_IMG}
              alt={NAME}
              className="aspect-[4/5] w-full rounded-md"
              fallback={<div className="text-center text-sm"><User className="mx-auto mb-2" size={48} />Add public/profile.jpg</div>}
            />
            <p className="mt-3 text-center font-display text-lg font-bold text-gold">{NAME}</p>
            <p className="text-center text-[10px] uppercase tracking-[0.3em] text-[#fbefd0]/70">Computer Science</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

function Education() {
  return (
    <div className="h-full overflow-y-auto [scrollbar-width:none]">
    <div className="flex min-h-full flex-col justify-center py-2">
      <Title no="03">Education Background</Title>
      <div className="space-y-10">
        {EDUCATION.map((e, n) => (
      <div key={e.school} className="rise flex flex-col gap-8 md:flex-row" style={{ animationDelay: `${200 + n * 250}ms` }}>
        <div className="h-36 w-36 shrink-0 overflow-hidden rounded-xl border-2 border-gold bg-white">
          <Photo src={e.logo} alt={e.alt} className="h-full w-full !object-contain p-3" fallback={<GraduationCap size={48} />} />
        </div>
        <div className="space-y-5">
          <div>
            <h3 className="font-display text-3xl font-bold text-[#fbefd0]">{e.title}</h3>
            {e.sub && <p className="text-lg text-[#fbefd0]/80">{e.sub}</p>}
            <p className="mt-1 font-semibold text-gold">{e.school}</p>
          </div>
          {e.gpa && <div className="inline-block rounded-md border-2 border-gold px-5 py-2 font-mono text-xl text-gold">{e.gpa}</div>}
          {e.focus.length > 0 && (
            <div className="rounded-lg border border-gold/60 p-5">
              <Label>Focus</Label>
              <div className="flex flex-wrap gap-2">
                {e.focus.map((f, i) => <Chip key={f} i={i}>{f}</Chip>)}
              </div>
            </div>
          )}
        </div>
      </div>
        ))}
      </div>
    </div>
    </div>
  )
}

function Career() {
  return (
    <div className="h-full overflow-y-auto py-2 [scrollbar-width:none]">
    <div className="flex min-h-full flex-col justify-center">
      <Title no="04">Career</Title>
      <div className="relative ml-4 pl-10">
        <div className="grow absolute left-0 top-0 h-full w-0.5 bg-gold" />
        {CAREER.map(({ title, desc }, i) => (
          <div key={title} className="rise relative mb-8 last:mb-0" style={{ animationDelay: `${400 + i * 350}ms` }}>
            <span className="absolute -left-[46px] top-2 h-4 w-4 rounded-full border-2 border-gold bg-wine" />
            <div className="flex items-center gap-4">
              <Briefcase className="text-gold" size={28} />
              <h3 className="font-display text-4xl font-bold text-[#fbefd0]">{title}</h3>
            </div>
            <div className="mt-3 min-h-20 rounded-lg border border-gold/40 bg-wine/60 p-4 text-[#fbefd0]/90">
              {desc ? <p className="leading-relaxed">{desc}</p> : <p className="text-sm italic text-[#fbefd0]/40">Write your description here...</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

function Skills() {
  const tools = ['Excel', 'Power BI', 'Python', 'SQL', 'HTML', 'CSS', 'JavaScript', 'C', 'Canva', 'CapCut', 'SAP', 'Figma']
  const tech = [
    'Microsoft Excel', 'SQL (MySQL | PostgreSQL)', 'Python (Pandas)', 'Power BI', 'HTML, CSS, JavaScript, PHP (Web Development)',
    'Canva (Poster)', 'CapCut (Video Editing)', 'SAP (Business)', 'Figma (UI/UX Design)',
  ]
  return (
    <div className="h-full overflow-y-auto py-2 [scrollbar-width:none]">
      <Title no="05">Skills</Title>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-8">
          <div><Label>Tools</Label><div className="flex flex-wrap gap-2">{tools.map((t, i) => <Chip key={t} i={i} solid>{t}</Chip>)}</div></div>
          <div><Label>Soft Skills</Label><div className="flex flex-wrap gap-2">{['Problem Solving', 'Time Management'].map((t, i) => <Chip key={t} i={i + 12} solid>{t}</Chip>)}</div></div>
          <div><Label>Language</Label><p>Malay (Native)</p><p>English (MUET Band 4)</p></div>
        </div>
        <div className="space-y-8">
          <div>
            <Label>Technical Skills</Label>
            <ul className="space-y-2">
              {tech.map((t, i) => (
                <li key={t} className="rise flex gap-3 text-[#fbefd0]" style={{ animationDelay: `${i * 70}ms` }}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div><Label>Driving Licence</Label><p>B2, DA</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const PROJECTS = [
  { t: 'EcoHero Mobile App Prototype' },
  { t: 'UMPSA Koop Printing Management System' },
  { t: 'Noir Photobooth Website', d: 'HTML, JavaScript, Google App Script, Google Drive, Google Sheet, GitHub' },
  { t: 'Retail Sales Automation', d: 'PostgreSQL, Python, Power BI, Excel' },
  { t: 'Keepsakes Website' },
]

// Proof images: add files to public/projects/ named p<project>-<n>.jpg (e.g. p1-1.jpg, p1-2.jpg ...)
// Increase PROOF_COUNT or edit DESCRIPTIONS below when you are ready.
const PROOF_COUNT = 3
const DESCRIPTIONS: Record<number, string> = {}

function Projects({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="flex h-full flex-col justify-center">
      <Title no="06">Projects</Title>
      <div className="space-y-3">
        {PROJECTS.map((p, i) => (
          <div
            key={p.t}
            role="button"
            tabIndex={0}
            onClick={() => onOpen(i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(i) } }}
            className="rise group flex cursor-pointer items-start gap-5 rounded-lg border border-gold/30 bg-wine/60 px-5 py-4 transition hover:border-gold hover:bg-wine-soft"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <span className="font-display text-3xl font-bold text-gold">{i + 1}</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#fbefd0]">{p.t}</h3>
              {p.d && <p className="text-sm text-[#fbefd0]/70">{p.d}</p>}
            </div>
            <ArrowRight className="self-center text-gold opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" size={20} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectDetail({ index, onBack }: { index: number; onBack: () => void }) {
  const p = PROJECTS[index]
  return (
    <div className="flex h-full flex-col">
      <div className="rise mb-6 flex items-center gap-5">
        <button onClick={onBack} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-black ring-2 ring-black transition hover:scale-105">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="min-w-0">
          <p className="font-mono text-xs tracking-widest text-gold">PROJECT {String(index + 1).padStart(2, '0')}</p>
          <h2 className="truncate font-display text-3xl font-bold text-gold md:text-4xl">{p.t}</h2>
        </div>
      </div>
      <div className="grid min-h-0 flex-1 gap-8 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4 overflow-y-auto pr-2 [scrollbar-width:thin]">
          {Array.from({ length: PROOF_COUNT }, (_, k) => (
            <div key={k} className="rise overflow-hidden rounded-lg border border-gold/40 bg-wine-deep" style={{ animationDelay: `${200 + k * 150}ms` }}>
              <Photo
                src={`${BASE}projects/p${index + 1}-${k + 1}.jpg`}
                alt={`${p.t} proof ${k + 1}`}
                className="aspect-video w-full"
                fallback={<span className="text-sm">Add public/projects/p{index + 1}-{k + 1}.jpg</span>}
              />
            </div>
          ))}
        </div>
        <div className="rise overflow-y-auto rounded-lg border border-gold/40 bg-wine/60 p-6" style={{ animationDelay: '300ms' }}>
          <Label>Description</Label>
          {p.d && <p className="mb-4 text-sm text-gold">{p.d}</p>}
          <p className="leading-relaxed text-[#fbefd0]/90">{DESCRIPTIONS[index] ?? 'Description coming soon.'}</p>
        </div>
      </div>
    </div>
  )
}

// List every image of a certificate inside imgs: [...] (files are in public/certificates/).
// Leave imgs: [] if there is no image; that name stays as plain text.
const CERTS = [
  { name: 'Second Lieutenant in Army TD', imgs: ['tauliah.jpg'] as string[] },
  { name: 'Cisco Certified Network Associate (CCNA) Certification', imgs: ['', '', ''] },
  { name: 'Yayasan Peneraju Pahang – CompTIA Data+ Certification', imgs: ['comptia.jpg', 'kcom_comptia.jpg'] },
  { name: 'Mobile Application Development Using Flutter Competency Training Certification', imgs: ['flutter.jpg'] },
  { name: 'Certification of Participation in BCS3423 Integrated Business Processing Using SAP', imgs: ['sap.jpg'] },
  { name: 'Certificates of Course Completion (Office Management, Human Resource Management, and Secretarial Management)', imgs: ['admin.jpg', 'hr.jpg', 'secretary.jpg'] },
]

function Achievements() {
  const [open, setOpen] = useState<number | null>(null)
  const [slide, setSlide] = useState(0)
  const [touchX, setTouchX] = useState<number | null>(null)
  const cert = open !== null ? CERTS[open] : null
  const total = cert ? cert.imgs.length : 0

  const move = useCallback((d: number) => {
    if (total > 1) setSlide((s) => (s + d + total) % total)
  }, [total])

  const openCert = (i: number) => { setSlide(0); setOpen(i) }

  useEffect(() => {
    if (open === null) return
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, move])

  const arrow = 'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-black ring-2 ring-black transition hover:scale-110'

  return (
    <div className="flex h-full flex-col justify-center">
      <Title no="07">Achievements and Certifications</Title>
      <div className="relative ml-3 pl-8">
        <div className="grow absolute left-0 top-0 h-full w-0.5 bg-gold" />
        {CERTS.map((c, i) => (
          <div key={c.name} className="rise relative mb-4 flex items-start gap-3" style={{ animationDelay: `${300 + i * 250}ms` }}>
            <span className="absolute -left-[38px] top-1.5 h-3 w-3 rounded-full bg-gold" />
            <Award className="mt-0.5 shrink-0 text-gold" size={20} />
            {c.imgs.length > 0 ? (
              <button onClick={() => openCert(i)} className="cursor-pointer text-left text-lg text-[#fbefd0] underline decoration-gold/50 underline-offset-4 transition hover:text-gold">
                {c.name}
              </button>
            ) : (
              <p className="text-lg text-[#fbefd0]">{c.name}</p>
            )}
          </div>
        ))}
      </div>

      {cert && createPortal(
        <div onClick={() => setOpen(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX === null) return
              const dx = e.changedTouches[0].clientX - touchX
              if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1)
              setTouchX(null)
            }}
            className="relative w-full max-w-4xl rounded-lg border-2 border-gold bg-wine-deep p-3"
          >
            <button onClick={() => setOpen(null)} aria-label="Close" className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-black ring-2 ring-black">✕</button>
            <p className="mb-3 pr-12 text-sm font-semibold text-gold">{cert.name}</p>

            <div className="overflow-hidden rounded">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${slide * 100}%)` }}>
                {cert.imgs.map((src) => (
                  <img key={src} src={`${BASE}certificates/${src}`} alt={cert.name} className="h-[68vh] w-full shrink-0 object-contain" />
                ))}
              </div>
            </div>

            {total > 1 && (
              <>
                <button onClick={() => move(-1)} aria-label="Previous" className={`${arrow} left-5`}><ArrowLeft size={20} /></button>
                <button onClick={() => move(1)} aria-label="Next" className={`${arrow} right-5`}><ArrowRight size={20} /></button>
                <div className="mt-3 flex items-center justify-center gap-3">
                  <span className="font-mono text-xs text-gold">{slide + 1} / {total}</span>
                  <div className="flex gap-2">
                    {cert.imgs.map((src, k) => (
                      <button key={src} aria-label={`Image ${k + 1}`} onClick={() => setSlide(k)} className={`h-2 rounded-full transition-all ${k === slide ? 'w-6 bg-gold' : 'w-2 bg-gold/40'}`} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}
// Replace these with your real details
const CONTACT = {
  email: 'nurulinsyirah0112@gmail.com',
  phone: '+60 11-188 54968',
  github: 'github.com/nhblavde',
}

function Contact() {
  const rows = [
    { icon: Mail, k: 'Email', v: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { icon: Phone, k: 'Phone Num', v: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    { icon: Code, k: 'GitHub', v: CONTACT.github, href: `https://${CONTACT.github}` },
  ]
  return (
    <div className="flex h-full flex-col justify-center">
      <Title no="08">Contact</Title>
      <h3 className="rise font-display text-5xl md:text-6xl font-bold text-[#fbefd0]">Let's work together!</h3>
      <div className="mt-10 space-y-4">
        {rows.map(({ icon: I, k, v, href }, i) => (
          <a key={k} href={href} target="_blank" rel="noreferrer" className="rise group flex items-center gap-5 rounded-lg border border-gold/40 px-6 py-4 transition hover:bg-gold hover:text-black" style={{ animationDelay: `${300 + i * 150}ms` }}>
            <I className="text-gold group-hover:text-black" />
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gold/80 group-hover:text-black/70">{k}</p>
              <p className="text-lg font-medium">{v}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

/* ---------- shell ---------- */
export default function App() {
  const [page, setPage] = useState(0)
  const [project, setProject] = useState<number | null>(null)
  const pages = [
    <Cover key="c" onStart={() => setPage(1)} />,
    <About key="a" />, <Education key="e" />, <Career key="k" />, <Skills key="s" />,
    <Projects key="p" onOpen={setProject} />, <Achievements key="ac" />, <Contact key="ct" />,
  ]
  const last = pages.length - 1
  const go = useCallback((d: number) => setPage((p) => Math.min(last, Math.max(0, p + d))), [last])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (page === 0 || project !== null) return
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [go, page, project])

  const navBtn = 'absolute top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-black shadow-lg ring-2 ring-black transition hover:scale-110 disabled:pointer-events-none disabled:opacity-0 md:h-16 md:w-16'

  return (
    <main className="relative h-full w-full overflow-hidden bg-gradient-to-br from-wine via-wine to-wine-deep">
      <div className="drift pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="drift pointer-events-none absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-wine-soft/60 blur-3xl" style={{ animationDelay: '-6s' }} />
      <div className="pointer-events-none absolute inset-4 rounded-2xl border border-gold/30" />

      {page > 0 && project === null && (
        <>
          <button aria-label="Back" className={`${navBtn} left-3 md:left-8`} onClick={() => go(-1)}><ArrowLeft /></button>
          <button aria-label="Next" className={`${navBtn} right-3 md:right-8`} onClick={() => go(1)} disabled={page === last}><ArrowRight /></button>
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {pages.slice(1).map((_, i) => (
              <button key={i} aria-label={`Page ${i + 2}`} onClick={() => setPage(i + 1)} className={`h-2 rounded-full transition-all ${page === i + 1 ? 'w-8 bg-gold' : 'w-2 bg-gold/40'}`} />
            ))}
          </div>
        </>
      )}

      <div key={`${page}-${project}`} className={`relative z-10 mx-auto h-full max-w-5xl py-14 ${project === null ? 'px-24 md:px-32' : 'px-8 md:px-12'}`}>
        {project !== null ? <ProjectDetail index={project} onBack={() => setProject(null)} /> : pages[page]}
      </div>
    </main>
  )
}
