"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

type SkillLevel = "Advanced" | "Intermediate";

type SkillItem = {
  name: string;
  level: SkillLevel;
  percent: number;
};

const navLinks = [
  { label: "Featured", href: "#featured" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const education = [
  {
    school: "Universiti Putra Malaysia",
    detail: "Bachelor of Software Engineering with Honours (Current CGPA: 3.94)",
    period: "Oct 2023 - Present",
  },
  {
    school: "Universiti Putra Malaysia",
    detail: "Foundation in Science (CGPA: 3.90)",
    period: "Aug 2021 - Apr 2022",
  },
  {
    school: "SMK Seri Ampang",
    detail: "SPM: 9A",
    period: "Jan 2017 - Jan 2021",
  },
  {
    school: "SJKC Pei Hwa",
    detail: "Primary education",
    period: "Jan 2010 - Jan 2016",
  },
];

const projects = [
  {
    title: "Digital Certificates Management App",
    desc: "Developed a secure certificate management app with role-based access and protected sharing flow.",
    tags: ["Flutter", "Firebase", "Security"],
  },
  {
    title: "Bus Tracking System (UPM)",
    desc: "Built real-time bus tracking using Google Maps and Firebase to improve student mobility.",
    tags: ["Maps", "Firebase", "Realtime"],
  },
  {
    title: "BiteBudget",
    desc: "Designed a budget-friendly food recommendation app focused on affordability for students.",
    tags: ["Recommendation", "Mobile App", "UX"],
  },
  {
    title: "MaizeHero",
    desc: "Built a predictive agriculture platform for maize planning and decision support.",
    tags: ["Python", "Machine Learning", "Agritech"],
  },
  {
    title: "Blockchain Learning Projects",
    desc: "Built smart contract foundations and practiced decentralized application concepts.",
    tags: ["Solidity", "Web3", "Smart Contracts"],
  },
];

const achievements = [
    "PayHack Hackathon 2025 - Semi-Finalist",
    "FSCIT Hackathon 2025 (4th Place)",
    "3rd Place, Entrepreneurship in Computing Hackathon",
    "Vice Chancelor Award Semester 4 and 5, Universiti Putra Malaysia",
    "Dean's List Semester 1, 2 and 3, Universiti Putra Malaysia",
    "Silver Medal, Physics Quiz Competition",
    "Anugerah Pelajar Cemerlang SPM 2020, SMK Seri Ampang",
    "Anugerah Pelajar Subjek Cemerlang SPM 2020 (Biologi, Sejarah, Tasawwur Islam), SMK Seri Ampang",
];

const featuredAchievements = [
  {
    title: "PNB Scholarship Recipient",
    subtitle: "Permodalan Nasional Berhad",
    img: "/images/pnb.jpg",
    year: "2022 - Present",
    impact: ["High Academic Standing", "Career Opportunities"],
  },
  {
    title: "Runner-up Winner",
    subtitle: "CIC Asia Hackathon",
    img: "/images/NW2_2710.jpg",
    year: "2025",
    impact: ["Top Innovation Team", "international recognition"],
  },
  {
    title: "FOSEAL Hackathon Champion",
    subtitle: "Champion Award",
    img: "/images/Foseal.jpg",
    year: "2025",
    impact: ["3rd Place Achievement", "First Hackathon First Win"],
  },
];

const experience = [
  {
    role: "Zara KLCC - Part-time",
    period: "Jan 2021 - Apr 2021",
    points: [
      "Demonstrated strong communication and customer service skills.",
      "Managed transactions accurately and efficiently.",
      "Worked effectively in a fast-paced team environment.",
    ],
  },
];

const featuredProjects = [
  {
    id: "chillcare",
    title: "ChillCare",
    subtitle: "AI Fertilizer Assistant",
    desc: "Developed an AI-powered farming app with monitoring and automated watering logic.",
    tags: ["AI", "IoT", "Automation"],
    image: "/images/Chilicare.png",
    fullDescription: "ChillCare is an intelligent agricultural platform designed to optimize chili farming through AI and IoT technology.",
    features: [
      {
        title: "AI Fertilizer Assistant",
        description: "Tailored nutrient recommendations based on crop variety, age, and soil type."
      },
      {
        title: "Smart Watering",
        description: "IoT-integrated irrigation that monitors soil moisture and temperature to automate watering cycles."
      },
      {
        title: "Microclimate Prediction",
        description: "Real-time monitoring of VPD (Vapor Pressure Deficit) and humidity to prevent plant stress and disease."
      },
      {
        title: "Chili Plot Finder",
        description: "Geospatial analysis to identify the most suitable land for chili farming based on environmental data."
      },
      {
        title: "Auto Pest Detector",
        description: "Live camera monitoring that uses computer vision to instantly identify pests like caterpillars and alert the farmer."
      }
    ],
    technologies: ["Python", "TensorFlow", "Firebase", "IoT", "Computer Vision", "Geospatial Analysis"]
  },
  {
    id: "rizzrent",
    title: "RizzRent",
    subtitle: "Student Rental & Roommate Matching",
    desc: "Created a student rental platform with landlord verification and a smart matching workflow.",
    tags: ["Marketplace", "Flutter", "Firebase"],
    image: "/images/RizzRent.png",
    fullDescription: "RizzRent is a student-focused rental and roommate matching platform designed to help university students find safe, affordable accommodation near campus.",
    features: [
      {
        title: "Student-Only Rental Listings",
        description: "Verified rooms and houses near university campuses."
      },
      {
        title: "Smart Roommate Matching",
        description: "Matches students based on habits, budget, schedule, and preferences."
      },
      {
        title: "Digital Rental Contract",
        description: "Secure online agreement and document handling."
      },
      {
        title: "Landlord & Property Verification",
        description: "Reduces scam risk and increases trust."
      },
      {
        title: "Premium Listing for Landlords",
        description: "Boost visibility to attract tenants faster."
      }
    ],
    technologies: ["Flutter", "Firebase", "Firestore", "Cloud Functions", "Matching Algorithm"]
  },
  {
    id: "myteman",
    title: "MyTeman",
    subtitle: "AI-Powered Service Assistant",
    desc: "Built an AI service mapping platform with voice-to-text and biometric authentication.",
    tags: ["AI", "Flutter", "Mobile"],
    image: "/images/Myteman.png",
    fullDescription: "MyTeman is an innovative mobile platform that leverages AI to provide intelligent service mapping and voice-based interactions.",
    features: [
      {
        title: "Voice-to-Text Onboarding",
        description: "AI intent detection for seamless user interactions."
      },
      {
        title: "AI-Powered Service Mapping",
        description: "Using Google Gemini API for intelligent service recommendations."
      },
      {
        title: "Biometric Authentication",
        description: "Secure login with mocked MyDigitalID integration."
      },
      {
        title: "Offline-First Architecture",
        description: "Automatic data sync with offline support."
      },
      {
        title: "Accessibility Support",
        description: "Text-to-speech, haptic feedback, and inclusive design."
      }
    ],
    technologies: ["Flutter", "Google Gemini API", "Firebase", "speech_to_text", "Biometric Auth", "SQLite"]
  }
];

const skillSections: { title: string; items: SkillItem[] }[] = [
  {
    title: "Programming Languages",
    items: [
      { name: "Python", level: "Advanced", percent: 88 },
      { name: "Java", level: "Advanced", percent: 84 },
      { name: "Dart", level: "Intermediate", percent: 73 },
      { name: "JavaScript", level: "Intermediate", percent: 72 },
      { name: "SQL", level: "Advanced", percent: 80 },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "Flutter", level: "Advanced", percent: 86 },
      { name: "React", level: "Intermediate", percent: 74 },
      { name: "Node.js", level: "Intermediate", percent: 70 },
      { name: "Laravel", level: "Intermediate", percent: 68 },
    ],
  },
  {
    title: "AI / Data Science",
    items: [
      { name: "TensorFlow", level: "Intermediate", percent: 71 },
      { name: "Machine Learning", level: "Advanced", percent: 82 },
      { name: "NLP", level: "Intermediate", percent: 69 },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "Git", level: "Advanced", percent: 83 },
      { name: "Firebase", level: "Advanced", percent: 85 },
      { name: "Android Studio", level: "Intermediate", percent: 74 },
      { name: "Figma", level: "Intermediate", percent: 70 },
    ],
  },
];

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SkillBars({ title, items, delay }: { title: string; items: SkillItem[]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-cyan-200">{title}</h3>
        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div key={`${title}-${item.name}`}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-100">{item.name}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    item.level === "Advanced"
                      ? "bg-emerald-300/20 text-emerald-200"
                      : "bg-blue-300/20 text-blue-200"
                  }`}
                >
                  {item.level}
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 shadow-[0_0_20px_rgba(103,232,249,0.45)] transition-[width] duration-1000"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

export default function Home() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const updateMouse = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <main className="relative overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"
          style={{ left: `calc(${mouse.x}% - 140px)`, top: `calc(${mouse.y}% - 140px)` }}
        />
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-orange-300/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="text-lg font-bold tracking-tight text-white">
            Hazriq Haykal
          </a>
          <div className="flex flex-wrap justify-end gap-2 text-sm text-slate-300">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full px-3 py-1 transition hover:bg-white/10 hover:text-cyan-200">
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section id="top" className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-24">
        <Reveal>
          <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs tracking-[0.16em] text-cyan-200">
            Software Engineering student at UPM | PNB Scholar | Hackathon Finalist | AI & Data Systems Builder
          </p>
        </Reveal>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[340px_1fr]">
          <Reveal delay={100} className="relative mx-auto w-full max-w-[340px] lg:mx-0">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-cyan-300/20 via-sky-300/10 to-blue-400/10 blur-xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-3 shadow-2xl">
              <img
                src="/images/Profile.jpg"
                alt="Hazriq Haykal profile"
                className="h-[360px] w-full rounded-[1.4rem] object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={180}>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight md:text-6xl">
              AI-Driven Software Engineer in Progress
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
              I design and build intelligent applications that combine machine learning, cloud infrastructure, and user-centered design to solve meaningful problems.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-200">UPM Software Engineering</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-200">PNB Scholar</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-200">Hackathon Finalist</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-200">AI & Data Systems Builder</span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-200">Cloud & AWS Learner</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="education" className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">Education</h2>
          <p className="mt-2 text-slate-300">My academic journey.</p>
        </Reveal>

        <div className="relative mt-10 pl-10 md:pl-14">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-gradient-to-b from-cyan-300/70 via-cyan-300/30 to-transparent md:left-5" />
          {education.map((item, index) => (
            <Reveal key={`${item.school}-${item.period}`} delay={index * 100} className="relative mb-6 last:mb-0">
              <span className="absolute -left-[2.15rem] top-3 h-3 w-3 rounded-full border-2 border-cyan-300 bg-slate-950 md:-left-[2.65rem]" />
              <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <h3 className="font-semibold text-white">{item.school}</h3>
                  <span className="inline-flex w-fit rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
                    {item.period}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="featured" className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <p className="mt-2 text-slate-300">Deep-dive projects with full technical breakdown.</p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 90}>
              <Link href={`/projects/${project.id}`}>
                <article className="group h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 cursor-pointer">
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-cyan-400/20 to-blue-400/10">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3 p-5">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <p className="text-xs text-cyan-300 font-medium uppercase tracking-widest">{project.subtitle}</p>
                    <p className="text-sm text-slate-300">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span key={`${project.id}-${tag}`} className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-xs text-cyan-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="mt-2 text-slate-300">Selected builds from my work and learning.</p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 70}>
              <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-300/0 to-blue-400/0 transition group-hover:from-cyan-400/10 group-hover:via-transparent group-hover:to-blue-400/10" />
                <h3 className="relative text-lg font-semibold text-white">{project.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-300">{project.desc}</p>
                <div className="relative mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={`${project.title}-${tag}`} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-cyan-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
          <p className="mt-2 text-slate-300">Work and team experience that shaped my skills.</p>
        </Reveal>

        <div className="mt-10 grid gap-5">
          {experience.map((job, index) => (
            <Reveal key={job.role} delay={index * 80}>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                  <span className="inline-flex w-fit rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
                    {job.period}
                  </span>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="achievements" className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">Featured Achievements</h2>
          <p className="mt-2 text-slate-300">Highlights with strongest impact in academics and competitions.</p>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredAchievements.map((item, index) => (
            <Reveal key={item.title} delay={index * 90}>
              <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-cyan-200">
                    {item.year}
                  </span>
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-300">{item.subtitle}</p>
                  <div className="inline-flex rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    {item.impact}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320}>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {achievements.map((item, index) => (
              <Reveal key={item} delay={index * 30}>
                <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-slate-200">{item}</li>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="skills" className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
          <p className="mt-2 text-slate-300">Technical depth by category with current proficiency levels.</p>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {skillSections.map((section, index) => (
            <SkillBars key={section.title} title={section.title} items={section.items} delay={index * 80} />
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
          <p className="mt-2 text-slate-300">Open for collaborations, internships, and software projects.</p>
        </Reveal>

        <Reveal delay={120} className="mt-7 flex flex-wrap gap-3">
          <a
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 transition hover:border-cyan-300/60"
            href="https://www.linkedin.com/in/hazriq-haykal-251a32294?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 transition hover:border-cyan-300/60"
            href="/resume.pdf"
            download
          >
            Download Resume
          </a>
          <a
            className="rounded-xl bg-cyan-300 px-4 py-2 font-semibold text-slate-900 transition hover:shadow-[0_0_30px_rgba(103,232,249,0.4)]"
            href="mailto:hazriqhaykal04@gmail.com"
          >
            Email Me
          </a>
          <a
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 transition hover:border-green-300/60"
            href="https://wa.me/+601161337871"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </Reveal>



        <footer className="mt-14 pb-4 text-sm text-slate-400">
          {new Date().getFullYear()} Hazriq Haykal Norrol Farhan. All rights reserved.
        </footer>
      </section>
    </main>
  );
}
